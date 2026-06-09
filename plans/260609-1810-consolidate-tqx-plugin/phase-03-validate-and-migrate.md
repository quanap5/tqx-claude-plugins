---
phase: 3
title: Validate and migrate
status: in-progress
effort: ''
---

# Phase 3: Validate and migrate

## Overview
Prove the consolidated plugin is valid and the skills resolve as `tqx:*`, then document the
breaking migration (reinstall + personal-command removal).

## Requirements
- Functional: `claude plugin validate .` and `./plugins/tqx` pass; render smoke test works from the
  new path; the 3 skills appear as `tqx:ccusage`, `tqx:preview-html`, `tqx:diagram-excalidraw`.
- Non-functional: clear migration note for existing users; no build artifacts committed.

## Implementation Steps
1. `claude plugin validate .` and `claude plugin validate ./plugins/tqx` → both ✔.
2. Re-`uv sync` in `plugins/tqx/skills/diagram-excalidraw/references/` and render the example to
   confirm the path-agnostic pipeline still works.
3. Commit (`git mv` history preserved); push.
4. Local re-install test: `/plugin marketplace update tqx-tools`, then
   `/plugin uninstall tqx-{preview-html,ccusage,diagram-excalidraw}@tqx-tools` (old, now gone) and
   `/plugin install tqx@tqx-tools`; confirm skills list shows `tqx:ccusage` etc.
5. **Out-of-repo (user action, flagged):** remove `~/.claude/commands/tqx/ccusage.md` so the personal
   command stops shadowing/duplicating the plugin's `tqx:ccusage`.
6. Add a **one-line** README note ("v1.0.0 consolidates the former three plugins into `tqx`;
   uninstall the old `tqx-*@tqx-tools` if present"). Consumer is local/just-me → no deprecation
   section, no compat shims (validated).

## Success Criteria
- [ ] `claude plugin validate` passes for marketplace + `tqx` plugin.
- [ ] Render smoke test produces a PNG from the new references path.
- [ ] Skills resolve as `tqx:ccusage` / `tqx:preview-html` / `tqx:diagram-excalidraw`.
- [ ] README documents the reinstall migration; personal-command removal noted.

## Risk Assessment
- **Risk:** orphaned old installs keep stale `tqx-*:` skills active until uninstalled. **Mitigation:**
  local/just-me → uninstall on your own machine; one-line README note. Low blast radius (validated).
- **Decision (validated):** new plugin `tqx` starts at **1.0.0** (fresh identity, not a bump of the
  old plugins); marketplace name unchanged (`tqx-tools`).
- **Risk:** personal `tqx:ccusage` collision persists if user skips step 5. **Mitigation:** flagged
  as explicit out-of-repo action; non-blocking for the repo.
