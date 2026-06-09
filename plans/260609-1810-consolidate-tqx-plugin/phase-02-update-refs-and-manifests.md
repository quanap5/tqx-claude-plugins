---
phase: 2
title: Update refs and manifests
status: completed
effort: ''
---

# Phase 2: Update refs and manifests

## Overview
Rewrite the manifests, skill frontmatter names, and all references to reflect the single `tqx`
plugin and de-prefixed skill names. This is where `tqx:ccusage` etc. actually become real.

## Requirements
- Functional: `plugin.json` name `tqx`; each `SKILL.md` `name:` de-prefixed; marketplace lists one
  plugin `tqx`; CI validates the new path; README + examples links correct.
- Non-functional: no stale references to old plugin/skill names anywhere (`grep` clean).

## Related Code Files
- Modify `plugins/tqx/.claude-plugin/plugin.json`: `name: "tqx"`, `version: "1.0.0"`, description
  covering all 3 skills, merged keywords.
- Modify `plugins/tqx/skills/ccusage/SKILL.md`: frontmatter `name: ccusage`.
- Modify `plugins/tqx/skills/preview-html/SKILL.md`: frontmatter `name: preview-html`.
- Modify `plugins/tqx/skills/diagram-excalidraw/SKILL.md`: frontmatter `name: diagram-excalidraw`;
  fix any in-body example paths that say `tqx-diagram-excalidraw` (render path examples are already
  generic — verify).
- Modify `.claude-plugin/marketplace.json`: replace 3 plugin entries with ONE `{ name: "tqx",
  source: "./plugins/tqx", version: "1.0.0", ... }`.
- Modify `references/render_excalidraw.py` docstring / `pyproject.toml` name if they mention the
  old skill name (cosmetic).
- Modify `README.md`: plugins table (now describe the one `tqx` plugin + its 3 skills), install
  commands (`/plugin install tqx@tqx-tools`), repo-layout tree, example link path.
- Modify `.github/workflows/validate-plugins.yml`: the `plugins/*/` loop still works
  (now matches only `plugins/tqx/`); confirm — no change likely needed.

## Implementation Steps
1. Write the consolidated `plugin.json` (name `tqx`, version 1.0.0, description enumerating the 3
   skills, union of keywords).
2. Edit each `SKILL.md` frontmatter `name:` → `ccusage` / `preview-html` / `diagram-excalidraw`.
   Keep descriptions/triggers intact (they don't depend on the name).
3. Rewrite `marketplace.json` `plugins[]` to a single `tqx` entry.
4. `grep -rn "tqx-ccusage\|tqx-preview-html\|tqx-diagram-excalidraw" plugins/ README.md .github/`
   and fix every legitimate stale ref (skip the `tqx-diagram-excalidraw-render` pyproject name unless
   you want to rename it; cosmetic).
5. Update README tree + install lines + example link to `plugins/tqx/skills/diagram-excalidraw/examples/`.
6. Confirm CI `plugins/*/` glob still resolves (it will, to `plugins/tqx/`).

## Success Criteria
- [ ] `plugin.json` name is `tqx`; marketplace has exactly one plugin entry (`tqx`).
- [ ] The 3 `SKILL.md` `name:` values are `ccusage`, `preview-html`, `diagram-excalidraw`.
- [ ] `grep` finds no stale `tqx-<skill>` references in docs/manifests (pyproject name optional).
- [ ] README install shows `/plugin install tqx@tqx-tools`.

## Risk Assessment
- **Risk:** skill `name:` mismatch with dir name → skill won't resolve. **Mitigation:** dir name
  and frontmatter `name:` must match (`skills/ccusage/` ↔ `name: ccusage`).
- **Risk:** missed stale ref. **Mitigation:** the Phase-3 grep gate + `claude plugin validate`.
