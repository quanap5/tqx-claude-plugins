# Contributing to tqx-tools

This is a **hybrid multi-plugin marketplace** for Claude Code. First-party tooling lives in the
`tqx` plugin (namespace `tqx:`); third-party components are **vendored** as their own plugins.

## Taxonomy (where things go)

- **First-party** skill / command / agent that belongs to the core toolkit → add it to `plugins/tqx/`.
- **A separable first-party domain**, or **any third-party** component → a **new plugin** under
  `plugins/<name>/` with its own namespace. Third-party is *always* its own plugin (never folded into
  `tqx`) so namespace and authorship stay honest.

See `plugins/tqx/COMPONENTS.md` for the per-type conventions.

## Add a first-party component

| Type | Path | Result |
|------|------|--------|
| Skill | `plugins/tqx/skills/<name>/SKILL.md` (+ `assets/`, `references/`) | auto-trigger + `tqx:<name>` |
| Command | `plugins/tqx/commands/<name>.md` | `/tqx:<name>` |
| Agent | `plugins/tqx/agents/<name>.md` | `tqx:<name>` |

Frontmatter: skills/agents need `name` + `description`; commands need `description` (+ optional
`argument-hint`, `allowed-tools`). Names must be **distinct across types** within a plugin. Then run
`claude plugin validate .`. The docs site regenerates the catalog from these files automatically.

## Vendor a third-party component

Third-party code is **copied in** (vendored), at a pinned commit, under the original license.

```bash
node scripts/vendor-sync.mjs \
  --source https://github.com/<owner>/<repo> \
  --ref <commit-sha> \
  --name <plugin-name> \
  [--subpath <path-in-repo>] [--notes "..."]
```

The script **refuses** any license not on the allowlist (**MIT, BSD-2/3-Clause, ISC, Apache-2.0**),
copies the upstream `LICENSE`, and writes `VENDOR.md` (source + pinned SHA + license + date).

### Mandatory before committing a vendored plugin

1. **Security review** the vendored files — disclose anything that executes code: `hooks/` running
   shell, embedded `bash`/`curl`/`wget`/`eval`/base64, MCP server configs, filesystem/secret/network
   access, or prompt-injection ("ignore previous", forced tool calls). No undisclosed execution.
2. Add the plugin to `.claude-plugin/marketplace.json` with `metadata.vendored: true` and
   `metadata.source: <repo-url>`.
3. Add its attribution to `NOTICE`.
4. Run `claude plugin validate .` and `node scripts/check-vendored.mjs` — both must pass.

### Re-syncing a vendored plugin

Re-run `vendor-sync.mjs` with a **new** `--ref` **and** `--approve <that-ref>` — but only after
reviewing the upstream diff. Sync never silently overwrites. Pinned SHAs only, never branches/tags.

## Removal / opt-out

If you are an author and want your component removed, open an issue — vendored components are removed
on request. We only vendor sources whose license clearly permits redistribution.

## Anti-goal

This stays a **static, git-based** marketplace + static docs site. We do **not** build a dynamic
aggregator platform (DB / API / accounts / submissions) — that already exists upstream
([claude-code-templates](https://github.com/davila7/claude-code-templates)).
