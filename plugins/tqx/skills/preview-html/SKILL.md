---
name: preview-html
description: >-
  Build self-contained, single-file HTML pages (CSS inlined, no build step) in the TwinQX
  Terracotta Atlas visual style — a warm, premium design system. Use whenever someone wants
  a web page, HTML preview, landing page, product showcase, style or brand preview, pitch
  page, whitepaper page, knowledge-graph page, or dashboard mockup delivered as one
  ready-to-open HTML file. The output is always a single .html the user can open directly
  in a browser.
---

# TwinQX · Terracotta Atlas — HTML Preview Builder

Generate **single-file, self-contained HTML pages** (CSS inlined, no build step) for the
**TwinQX** brand in the *Terracotta Atlas* system (Phương án B of the brand color
exploration). The output is a `.html` the user can open directly in a browser.

TwinQX sits at SCADA × Ontology × AI. The brand feeling is **chính xác · đáng tin · thông
minh · không ồn ào** (precise, trustworthy, intelligent, quiet) — *trust-tech, not
consumer-tech*. Terracotta Atlas reads like a knowledge atlas in fired ceramic: warm, premium,
print-grade. It deliberately avoids the cool indigo-cyan that every SCADA/AI competitor uses.

## Workflow

1. **Read the design system.** Open `assets/tokens.css` — it is the single source of truth
   for every color, font, and primitive. Never invent hex values; use the tokens.
2. **Pick a starting point.** For a full page, copy `assets/template.html` and adapt. For
   individual blocks, pull snippets from `references/components.md`.
3. **Inline the tokens.** Paste the entire contents of `assets/tokens.css` into the page's
   first `<style>` block (replacing the `/* === PASTE tokens.css HERE === */` marker).
   Everything must be in one file — no external CSS.
4. **Build the content** the user asked for, honoring the rules below.
5. **Save** to `/mnt/user-data/outputs/<name>.html` and present it with `present_files`.
   If useful, render a screenshot to sanity-check layout before presenting (see Verifying).

## The palette — use tokens, never raw hex in markup logic

| Role | Token | Hex | Notes |
|------|-------|-----|-------|
| Background | `--bg` / `--tqx-cream` | `#F4ECD8` | dominant ~60% |
| Surface | `--surface` / `--tqx-paper` | `#F8F2E4` | cards, panels |
| Text | `--text` / `--tqx-ink` | `#2A1A12` | warm ink, not pure black |
| **Brand** | `--brand` / `--tqx-terracotta` | `#A14B2B` | signature, ~10% |
| **Accent** | `--accent` / `--tqx-ochre` | `#D4A03E` | signature pair w/ terracotta |
| Signal (AI) | `--signal` / `--tqx-sienna` | `#C97B4A` | pulse, highlights |
| Deep | `--tqx-chocolate` | `#5C3B22` | structure, subsystem nodes |
| Muted | `--muted` / `--tqx-warm-gray` | `#A89880` | captions |

**Signature pair = terracotta `#A14B2B` + ochre `#D4A03E`.** Lean on it for brand moments.

### Dark product face (for dashboards / app UI)
Wrap any control-room / SCADA dashboard section in `data-tqx-mode="dark"`. It switches the
semantic tokens to the *Furnace Reactor* face (Hướng A): ember `#15110E` background, warm
graphite surface, amber `#E89B3A` as the AI signal, bronze `#8B6B3D` accent, cream text.
Use light/cream for everything marketing; use the dark face only for live operational UI.

## Typography
- **Display + body:** Geist (loaded from Google Fonts), falling back to Inter / system sans.
- **Labels / data / mono:** IBM Plex Mono — for eyebrows, hex codes, sensor readouts,
  uppercase tracked labels (`.tqx-label`). This mono-label texture is core to the look.
- Headings are tight (`letter-spacing:-0.02em`), large, lowercase-friendly. Keep them
  confident and quiet — no decorative or rounded display faces.

## The wordmark
`TwinQX` with **only the X accented** — never color "Twin" or "Q". Use:
```html
<span class="tqx-logo">Twin<span class="x">QX</span></span>
```
On cream/light → X is ochre. On the dark face → X becomes amber automatically. On a solid
terracotta block, set the wrapper `color:var(--on-brand)` (cream) so Twin/Q stay readable.

## Hard rules (phong thủy + brand discipline)

These come straight from the brand guide — follow them, don't soften them:

- **TRÁNH xanh lá / mint / moss green** (Mộc khắc Thổ). Do not use green anywhere — not for
  "success", not for charts, not for status. Healthy/OK states use deep neutral
  (`--tqx-ok`, chocolate) or muted ink. This is non-negotiable for this brand.
- **Warm temperature only.** Every color is warm (red/orange/brown/cream). Never mix in cool
  blue, teal, or cyan — that's the competitor space TwinQX is differentiating from.
- **No pastel SaaS / no purple-pink AI gradient / no neon.** "Một nhà máy không tin một
  thương hiệu trông như app dating." Keep it sober and industrial.
- **60-30-10 ratio.** ~60% cream, ~30% ink/chocolate structure, ~10% terracotta+ochre
  accent. Don't flood the page with terracotta.
- **Status colors stay warm:** OK → deep neutral; WATCH/warning → ochre `#D4A03E`; ALERT/
  critical → terracotta `#A14B2B`. Use `.tqx-pill--ok/--watch/--alert`.
- **Contrast (WCAG AA+).** Ink on cream and cream on terracotta both pass. Avoid ochre text
  on cream for body copy (low contrast) — ochre is for fills/accents, not paragraphs.

## Page types this skill supports
Landing page · product showcase (X-SCADA / digital-twin) · brand & style preview (palette +
type specimen) · pitch / sales-deck page · whitepaper / long-form doc · ontology /
knowledge-graph page · SCADA dashboard mock. Default to a marketing/light page unless the
request is specifically a control-room/app UI (then use the dark face).

## Verifying layout (optional but recommended)
To catch obvious layout breaks before presenting, rasterize the page:
```bash
pip install playwright --break-system-packages -q && playwright install chromium -q
python3 - <<'PY'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("file:///mnt/user-data/outputs/PAGE.html"); pg.screenshot(path="/tmp/preview.png", full_page=True); b.close()
PY
```
Then `view /tmp/preview.png` and fix spacing/overflow issues. Google Fonts won't load in the
sandbox (offline), so fonts will fall back to system sans there — that's expected; they load
correctly in the user's browser.

## Reference files
- `assets/tokens.css` — the design system (colors, type, primitives). Inline this.
- `assets/template.html` — full single-file starter page to copy and adapt.
- `references/components.md` — copy-paste snippets (hero, stat card, dashboard, node legend,
  swatches, status pills, footer) + the layout grid reference.

For higher-craft layout/typography decisions beyond these tokens, the `frontend-design`
skill complements this one — but the TwinQX color, type, and wordmark rules here always win.
