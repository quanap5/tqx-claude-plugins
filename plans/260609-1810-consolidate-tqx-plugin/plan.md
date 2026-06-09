---
title: 'Consolidate marketplace into single tqx plugin (tqx: namespace)'
description: ''
status: completed
priority: P2
branch: main
tags: []
blockedBy: []
blocks: []
created: '2026-06-09T09:34:43.952Z'
createdBy: 'ck:plan'
source: skill
---

# Consolidate marketplace into single tqx plugin (tqx: namespace)

## Overview

Merge the three separate plugins (`tqx-preview-html`, `tqx-ccusage`, `tqx-diagram-excalidraw`)
into **one plugin named `tqx`** so its skills are namespaced `tqx:preview-html`, `tqx:ccusage`,
`tqx:diagram-excalidraw`. The namespace prefix is the **plugin name** (verified: our skill loads
as `tqx-diagram-excalidraw:tqx-diagram-excalidraw`; marketplace name `tqx-tools` is irrelevant to
namespace). Skills only — no command wrappers. Marketplace stays `tqx-tools` with a single plugin
entry.

**Decided (user):** single `tqx` plugin · skills only · the existing personal command
`~/.claude/commands/tqx/ccusage.md` will be removed by the user (out-of-repo) since the plugin
will provide `tqx:ccusage`.

**Verified facts**
- Namespace = plugin name (`pluginName:skillName`), not marketplace name.
- `tqx:ccusage` today = personal command `~/.claude/commands/tqx/ccusage.md`, NOT a plugin.
- `ck` v4.3.1 present; no plugin currently named `tqx`; render pipeline already path-agnostic
  (refers to "this skill's references/").

**Breaking change (low blast radius):** the old plugin names disappear from the marketplace, so the
old installs orphan. **Consumer = local/just-me** (validated) → migration is a one-line README note +
uninstalling the old three on your own machine. No deprecation shims or compat layer. New plugin
`tqx` starts at **1.0.0** (fresh identity); marketplace stays **`tqx-tools`** → install
`tqx@tqx-tools`.

## Goal / Non-goals

- **Goal:** one plugin `tqx`, three skills, clean `tqx:*` namespace, CI + docs updated, validates green.
- **Non-goal:** adding slash-command wrappers; touching files outside this repo (the personal
  `~/.claude/commands/tqx/ccusage.md` is only flagged, not edited here); changing skill behavior.

## Target structure

```
plugins/tqx/
├── .claude-plugin/plugin.json          # name: "tqx", version 1.0.0
└── skills/
    ├── ccusage/SKILL.md                 # name: ccusage           → tqx:ccusage
    ├── preview-html/SKILL.md            # name: preview-html      → tqx:preview-html
    │   ├── assets/ (tokens.css, template.html)
    │   └── references/components.md
    └── diagram-excalidraw/              # name: diagram-excalidraw → tqx:diagram-excalidraw
        ├── SKILL.md
        ├── references/ (render pipeline, palette, .gitignore)
        └── examples/ (digital-twin-architecture.*)
```

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Consolidate structure](./phase-01-consolidate-structure.md) | Completed |
| 2 | [Update refs and manifests](./phase-02-update-refs-and-manifests.md) | Completed |
| 3 | [Validate and migrate](./phase-03-validate-and-migrate.md) | Completed |

## Dependencies

<!-- Cross-plan dependencies -->
