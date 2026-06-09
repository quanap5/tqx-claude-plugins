---
phase: 1
title: Consolidate structure
status: completed
effort: ''
---

# Phase 1: Consolidate structure

## Overview
Create the single `plugins/tqx/` plugin and move the three skills into it under de-prefixed
names. Use `git mv` to preserve history. No content edits yet (that's Phase 2).

## Requirements
- Functional: one plugin dir `plugins/tqx` containing 3 skills (`ccusage`, `preview-html`,
  `diagram-excalidraw`) with all their assets/references/examples intact.
- Non-functional: git history preserved (`git mv`, not delete+add); no orphaned files.

## Architecture
Plugin name = namespace. Skill dir name + SKILL.md `name:` = the part after `tqx:`. So skill
dirs are renamed to drop the redundant `tqx-` prefix.

## Related Code Files
- Create: `plugins/tqx/.claude-plugin/plugin.json` (Phase 2 fills content; created here as a move target)
- Move (git mv):
  - `plugins/tqx-ccusage/skills/tqx-ccusage/` → `plugins/tqx/skills/ccusage/`
  - `plugins/tqx-preview-html/skills/tqx-preview-html/` → `plugins/tqx/skills/preview-html/`
  - `plugins/tqx-diagram-excalidraw/skills/tqx-diagram-excalidraw/` → `plugins/tqx/skills/diagram-excalidraw/`
- Delete (after moves): empty `plugins/tqx-ccusage/`, `plugins/tqx-preview-html/`,
  `plugins/tqx-diagram-excalidraw/` dirs and their old `.claude-plugin/plugin.json` files.

## Implementation Steps
1. `mkdir -p plugins/tqx/.claude-plugin plugins/tqx/skills`.
2. `git mv plugins/tqx-ccusage/skills/tqx-ccusage plugins/tqx/skills/ccusage`.
3. `git mv plugins/tqx-preview-html/skills/tqx-preview-html plugins/tqx/skills/preview-html`.
4. `git mv plugins/tqx-diagram-excalidraw/skills/tqx-diagram-excalidraw plugins/tqx/skills/diagram-excalidraw`.
5. Pick ONE old `plugin.json` as the base for the new one: `git mv plugins/tqx-ccusage/.claude-plugin/plugin.json plugins/tqx/.claude-plugin/plugin.json` (content rewritten in Phase 2).
6. `git rm` the two remaining old `.claude-plugin/plugin.json` files; remove now-empty old plugin dirs.
7. Confirm `references/.gitignore`, `assets/`, and `examples/` moved with their skills.

## Success Criteria
- [ ] `plugins/tqx/skills/{ccusage,preview-html,diagram-excalidraw}/SKILL.md` all exist.
- [ ] No `plugins/tqx-*` directories remain.
- [ ] `git status` shows renames (R), not mass delete+add.
- [ ] `diagram-excalidraw/references/` (render pipeline) and `examples/` are present.

## Risk Assessment
- **Risk:** losing the `references/.venv` working render env. **Mitigation:** `.venv` is gitignored
  and disposable; re-`uv sync` in Phase 3.
- **Risk:** case/路径 issues on WSL during moves. **Mitigation:** verify with `git ls-files` after.
