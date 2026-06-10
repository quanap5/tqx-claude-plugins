---
description: Validate the tqx marketplace and inventory every plugin + component (skills/commands/agents), flagging vendored-license gaps
argument-hint: "[plugin name to scope — optional, default: all]"
allowed-tools: Bash(claude plugin validate:*), Bash(ls:*), Bash(find:*), Bash(cat:*)
---

Validate this Claude Code plugin marketplace and report its component inventory.

1. Run `claude plugin validate .` for the marketplace, then `claude plugin validate ./plugins/<name>`
   for each plugin directory. Report pass/fail for each.
2. List every component grouped by **plugin** and **type**: `skills/<name>/SKILL.md`,
   `commands/*.md`, `agents/*.md`.
3. For any **vendored** plugin (one containing a `VENDOR.md`), confirm it has a `LICENSE` whose type is
   on the allowlist (MIT, BSD-2/3, ISC, Apache-2.0). Flag any that is missing or off-allowlist.

Scope to: $ARGUMENTS (default: every plugin under `plugins/`).

Output a concise table (plugin · type · component · validation) plus any flags. Do not modify files.
