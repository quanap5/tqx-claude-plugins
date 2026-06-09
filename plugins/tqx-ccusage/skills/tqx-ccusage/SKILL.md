---
name: tqx-ccusage
description: >-
  Report Claude Code token usage and cost using the ccusage CLI. Use this skill WHENEVER
  someone asks about their token usage, API/usage cost, how much they've spent, cost per
  model, or a usage breakdown by day/week/month/session — including phrasings like "how
  many tokens did I use", "what's my Claude Code cost", "ccusage report", "token usage this
  month", "cost per model", "daily/weekly/monthly usage", "usage by session", "billing
  blocks", "how much have I spent on Claude", "kiểm tra token/chi phí". The skill checks
  whether the ccusage CLI is installed, installs it if missing (or falls back to npx),
  runs the requested mode, and summarizes token counts and cost grouped by model.
---

# ccusage — Token & Cost Reporter

Report **token usage and cost per model**, grouped by **mode** (daily / weekly / monthly /
session / billing-block), via the [`ccusage`](https://github.com/ryoppippi/ccusage) CLI.
ccusage reads local Claude Code usage logs (no network needed for usage; pricing is fetched
unless `--offline`) and computes token counts + estimated USD cost.

## Workflow

1. **Ensure ccusage is available** (see *Install* below). Never assume — check first.
2. **Pick the mode** from the user's request (default: `daily`). Map intent → command in the
   *Modes* table.
3. **Run with `--json`** so the output is parseable. Add `--since` / `--until` for date
   ranges, `--offline` if pricing fetch fails or you want cached pricing.
4. **Summarize** the JSON for the user: a short per-mode table plus a **per-model breakdown**
   (the `modelBreakdowns[]` array). Always state totals and the date range covered.

## Install (do this first if missing)

```bash
# 1. Already installed? Use it directly.
command -v ccusage && ccusage --version

# 2. Not installed → install globally (persistent):
npm install -g ccusage      # or: pnpm add -g ccusage / bun add -g ccusage

# 3. Zero-install fallback (no global install, always latest):
npx ccusage@latest <mode> [flags]      # or: bunx ccusage@latest ...
```

Prefer the existing binary; if `command -v ccusage` is empty and a global install fails
(e.g. no permissions), fall back to `npx ccusage@latest`. Substitute that prefix everywhere
`ccusage` appears below.

## Modes

| User wants… | Command |
|-------------|---------|
| Today / recent days (default) | `ccusage daily --json` |
| This week / weekly | `ccusage weekly --json` |
| This month / monthly | `ccusage monthly --json` |
| Per conversation/session | `ccusage session --json` |
| 5-hour billing blocks (rate-limit windows) | `ccusage blocks --json` |
| **Claude Code only** (exclude other agents) | prefix with `claude`: `ccusage claude daily --json` |

> By default ccusage aggregates **all detected agent CLIs** (Claude Code, Codex, Gemini, etc.).
> Use the `claude` sub-scope (`ccusage claude <mode>`) when the user specifically means Claude Code.

### Common flags
- `-j, --json` — machine-readable output (**always use this** so you can summarize).
- `-s, --since YYYY-MM-DD` / `-u, --until YYYY-MM-DD` — date range filter.
- `-z, --timezone <IANA>` — e.g. `Asia/Ho_Chi_Minh` for correct day grouping.
- `-O, --offline` — use cached pricing (use if the pricing fetch errors or you're offline).
- `--compact` — narrow table layout (only relevant for the non-JSON human view).

## JSON shape (what to read)

Each mode returns an array under its name (`daily`, `monthly`, …). Each entry has period
totals plus a **`modelBreakdowns[]`** array — this is the per-model data the user usually wants:

```jsonc
{
  "daily": [
    {
      "date": "2026-05-08",
      "inputTokens": 880,
      "outputTokens": 116673,
      "cacheCreationTokens": 1074458,
      "cacheReadTokens": 48668627,
      "totalTokens": 13393895,
      "totalCost": 28.96,
      "modelsUsed": ["claude-opus-4-7", "claude-sonnet-4-6"],
      "modelBreakdowns": [
        { "modelName": "claude-opus-4-7",   "cost": 26.94, "inputTokens": 383, "outputTokens": 116673, "cacheCreationTokens": 750130, "cacheReadTokens": 38658251 },
        { "modelName": "claude-sonnet-4-6", "cost":  2.02, "inputTokens": 121, "outputTokens":   1234, "cacheCreationTokens": 156474, "cacheReadTokens":  3491006 }
      ]
    }
  ]
}
```

## Summarizing for the user

After running, produce a concise summary — don't dump raw JSON. Include:

1. **Range & mode** — e.g. "Daily usage, 2026-05-07 → 2026-06-09".
2. **Per-model totals** — aggregate `modelBreakdowns[].cost` and tokens across all periods,
   so the user sees cost/tokens **per model** (the core ask). Sort by cost descending.
3. **Grand totals** — total cost (USD) and total tokens; note these are estimates from public
   pricing, not an invoice.
4. **(Optional) per-period table** — if the user asked for a trend (e.g. cost per day/month).

Example shape (fill with real numbers):

```
Claude Code usage — monthly, May 2026 (Asia/Ho_Chi_Minh)

Per model:
  claude-opus-4-7    $312.40   1.42B tokens
  claude-sonnet-4-6   $48.10   0.51B tokens
  ──────────────────────────────────────────
  Total              $360.50   1.93B tokens   (estimated)
```

Round cost to 2 decimals; abbreviate large token counts (K/M/B). Token totals include cache
read/creation tokens — mention that if the number looks surprisingly large.

## Notes & gotchas
- ccusage needs Claude Code's local usage logs to exist; a brand-new machine may report empty.
  If output is empty, say so rather than inventing numbers.
- Costs are **estimates** based on public model pricing; subscription (Max/Pro) usage still
  shows a computed cost — clarify it's "equivalent API cost", not money billed, if asked.
- If a pricing lookup fails (network), retry with `--offline`.
- Don't pass `--breakdown`/`--instances`; per-model data is already in `modelBreakdowns[]`.
