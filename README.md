# tqx-tools — Claude Code plugin marketplace

<p align="center">
  <img src="assets/tqx-banner.png" alt="TQX-Toolkit — TwinQX tooling for Claude Code" width="860">
</p>

<p align="center">
  <a href="https://github.com/quanap5/tqx-claude-plugins/actions/workflows/validate-plugins.yml"><img src="https://img.shields.io/github/actions/workflow/status/quanap5/tqx-claude-plugins/validate-plugins.yml?style=flat-square&label=validate&labelColor=2A1A12&color=A14B2B" alt="Validate plugins"></a>
  <a href="https://code.claude.com"><img src="https://img.shields.io/badge/Claude_Code-plugin-A14B2B?style=flat-square&labelColor=2A1A12&logo=anthropic&logoColor=F4ECD8" alt="Claude Code plugin"></a>
  <a href="https://tqx-claude-plugins.pages.dev/"><img src="https://img.shields.io/badge/docs-tqx-D4A03E?style=flat-square&labelColor=2A1A12" alt="Docs"></a>
  <a href="#skills-in-the-tqx-plugin"><img src="https://img.shields.io/badge/skills-3-D4A03E?style=flat-square&labelColor=2A1A12" alt="3 skills"></a>
  <a href="https://github.com/quanap5/tqx-claude-plugins/releases"><img src="https://img.shields.io/github/v/tag/quanap5/tqx-claude-plugins?style=flat-square&label=version&labelColor=2A1A12&color=C97B4A" alt="Latest version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-5C3B22?style=flat-square&labelColor=2A1A12" alt="License: MIT"></a>
</p>

<p align="center">
  <img src="assets/tqx-demo.gif" alt="tqx in the terminal — ccusage, diagram-excalidraw, preview-html" width="760">
</p>

A marketplace of TwinQX tooling for [Claude Code](https://code.claude.com). Everything ships as a
single plugin, **`tqx`**, whose skills are namespaced `tqx:`.

> **Requirements:** [Claude Code](https://code.claude.com) (CLI, desktop, or IDE extension). No other dependencies — `tqx:ccusage` auto-installs the `ccusage` CLI on first run, and `tqx:diagram-excalidraw` bundles its own render pipeline.

## Skills (in the `tqx` plugin)

| Skill | What it does |
|-------|--------------|
| `tqx:preview-html` | Build single-file, self-contained **TwinQX** HTML pages in the *Terracotta Atlas* visual system (warm Hỏa-Thổ palette, Geist + IBM Plex Mono, X-accented wordmark, dark product face for dashboards). |
| `tqx:ccusage` | Report Claude Code **token usage and cost per model** by daily / weekly / monthly / session / billing-block mode via the `ccusage` CLI. Auto-installs `ccusage` if missing (or falls back to `npx`), then summarizes the output. |
| `tqx:diagram-excalidraw` | Create **Excalidraw diagrams that argue visually**, styled in the **TwinQX** Terracotta Atlas brand (warm Hỏa-Thổ palette, no green/blue). Includes a Playwright render pipeline so the agent can see and fix its own output. Adapted from [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) (MIT). [See example →](plugins/tqx/skills/diagram-excalidraw/examples/) |

The `tqx` plugin also ships **commands** (`/tqx:marketplace-check`) and **agents** (`tqx:brand-auditor`).
The full, always-current catalog of skills / commands / agents — including any vendored third-party
components — lives on the **[docs site](https://tqx-claude-plugins.pages.dev/)** (generated from
source). See [`CONTRIBUTING.md`](CONTRIBUTING.md) to add a component or vendor a third-party source.

## Install

In Claude Code, add this marketplace once, then install the `tqx` plugin:

```text
/plugin marketplace add quanap5/tqx-claude-plugins
/plugin install tqx@tqx-tools
```

Or from the terminal (non-interactive):

```bash
claude plugin marketplace add quanap5/tqx-claude-plugins
claude plugin install tqx@tqx-tools
```

After install, each skill triggers automatically on intent — e.g. *"make a TwinQX landing page"*,
*"what's my Claude Code cost this month"*, *"vẽ sơ đồ kiến trúc excalidraw"* — or call one directly
as `tqx:preview-html`, `tqx:ccusage`, `tqx:diagram-excalidraw`.

> **Migrating from the old layout (v1.0.0):** this plugin replaces the former three separate
> plugins. If you installed `tqx-preview-html@tqx-tools` / `tqx-ccusage@tqx-tools` /
> `tqx-diagram-excalidraw@tqx-tools`, uninstall them and install `tqx@tqx-tools` instead.

## Update / remove

```text
/plugin marketplace update tqx-tools     # pull new versions
/plugin uninstall tqx@tqx-tools
/plugin marketplace remove tqx-tools
```

> Versions are pinned by the `version` field in `plugin.json` / the marketplace entry.
> **Bump `version` on every release**, otherwise existing users keep the cached copy.

## Repo layout

```
tqx-claude-plugins/
├── .claude-plugin/
│   └── marketplace.json              # the catalog (lists the tqx plugin)
└── plugins/
    └── tqx/
        ├── .claude-plugin/
        │   └── plugin.json           # the plugin manifest (name: "tqx")
        └── skills/
            ├── ccusage/
            │   └── SKILL.md          # tqx:ccusage — token/cost reporting
            ├── preview-html/
            │   ├── SKILL.md          # tqx:preview-html — branded HTML builder
            │   ├── assets/ (tokens.css, template.html)
            │   └── references/components.md
            └── diagram-excalidraw/
                ├── SKILL.md          # tqx:diagram-excalidraw — Excalidraw diagrams
                ├── references/       # render pipeline + color-palette
                └── examples/         # digital-twin-architecture
```

## Validate before pushing

```bash
claude plugin validate .
```

## License

Released under the [MIT License](LICENSE) © quanap5.

The `tqx:diagram-excalidraw` render pipeline is adapted from
[coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) (MIT).
