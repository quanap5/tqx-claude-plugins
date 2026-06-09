# tqx-tools — Claude Code plugin marketplace

A marketplace of TwinQX design tooling for [Claude Code](https://code.claude.com).

## Plugins

| Plugin | What it does |
|--------|--------------|
| `tqx-preview-html` | Build single-file, self-contained **TwinQX** HTML pages in the *Terracotta Atlas* visual system (warm Hỏa-Thổ palette, Geist + IBM Plex Mono, X-accented wordmark, dark product face for dashboards). |
| `tqx-ccusage` | Report Claude Code **token usage and cost per model** by daily / weekly / monthly / session / billing-block mode via the `ccusage` CLI. Auto-installs `ccusage` if missing (or falls back to `npx`), then summarizes the output. |
| `tqx-diagram-excalidraw` | Create **Excalidraw diagrams that argue visually**, styled in the **TwinQX** Terracotta Atlas brand (warm Hỏa-Thổ palette, no green/blue). Includes a Playwright render pipeline so the agent can see and fix its own output. Adapted from [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) (MIT). [See example →](plugins/tqx-diagram-excalidraw/examples/) |

## Install (for other people)

In Claude Code, add this marketplace once, then install the plugin:

```text
/plugin marketplace add quanap5/tqx-claude-plugins
/plugin install tqx-preview-html@tqx-tools
/plugin install tqx-ccusage@tqx-tools
/plugin install tqx-diagram-excalidraw@tqx-tools
```

Or from the terminal (non-interactive):

```bash
claude plugin marketplace add quanap5/tqx-claude-plugins
claude plugin install tqx-preview-html@tqx-tools
```

After install, the skill triggers automatically when you ask for a TwinQX page —
e.g. *"make a TwinQX landing page"*, *"TwinQX HTML preview"*, *"dashboard TwinQX"*.

## Update / remove

```text
/plugin marketplace update tqx-tools     # pull new versions
/plugin uninstall tqx-preview-html@tqx-tools
/plugin marketplace remove tqx-tools
```

> Versions are pinned by the `version` field in each `plugin.json` / marketplace entry.
> **Bump `version` on every release**, otherwise existing users keep the cached copy.

## Repo layout

```
tqx-claude-plugins/
├── .claude-plugin/
│   └── marketplace.json              # the catalog (lists all plugins)
└── plugins/
    ├── tqx-preview-html/
    │   ├── .claude-plugin/
    │   │   └── plugin.json           # this plugin's manifest
    │   └── skills/
    │       └── tqx-preview-html/
    │           ├── SKILL.md          # skill entry point (frontmatter = trigger)
    │           ├── assets/
    │           │   ├── tokens.css
    │           │   └── template.html
    │           └── references/
    │               └── components.md
    └── tqx-ccusage/
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
            └── tqx-ccusage/
                └── SKILL.md          # token/cost reporting via ccusage CLI
```

## Validate before pushing

```bash
claude plugin validate .
```

## License

MIT
