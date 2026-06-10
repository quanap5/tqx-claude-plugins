# tqx plugin — component conventions

The `tqx` plugin is the **first-party core toolkit**. Its components are namespaced `tqx:`.

## What lives where (Hybrid taxonomy)

| Goes in `tqx` (this plugin) | Goes in a **new plugin** under `plugins/<name>/` |
|-----------------------------|--------------------------------------------------|
| First-party skills, commands, agents that belong to the core toolkit | A genuinely separable first-party domain/product |
| Anything that should read as "by tqx" | **Any third-party / vendored** component (keeps its own namespace + authorship) |

Rule of thumb: **third-party is ALWAYS its own plugin** (never folded into `tqx`), so namespace and
attribution stay honest.

## Component types

- **Skills** — `skills/<name>/SKILL.md` (+ optional `assets/`, `references/`). Auto-trigger + `tqx:<name>`.
- **Commands** — `commands/<name>.md`. Slash command `/tqx:<name>`; frontmatter `description` (+ optional
  `argument-hint`, `allowed-tools`).
- **Agents** — `agents/<name>.md`. Subagent `tqx:<name>`; frontmatter `name`, `description`, `tools`.

## Naming rules

- Names must be **distinct across types within `tqx`** (don't name a command the same as a skill —
  `tqx:ccusage` would be ambiguous).
- kebab-case, descriptive.
- Discovery is automatic — no `plugin.json` edit needed when adding a component.

See the repo `CONTRIBUTING.md` for the full add-a-component and vendoring runbooks.
