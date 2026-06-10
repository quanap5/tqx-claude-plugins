#!/usr/bin/env node
// Vendor (or re-sync) a third-party Claude Code plugin into plugins/<name>/ at a PINNED commit SHA.
// Enforces the red-team guardrails: license allowlist, preserved LICENSE, VENDOR.md provenance,
// and a diff/approve gate on re-sync. Does NOT auto-pass security review — it prints the checklist.
//
// Usage:
//   node scripts/vendor-sync.mjs --source <git-url> --ref <commit-sha> --name <plugin-name> \
//        [--subpath <path-in-repo>] [--approve <sha>] [--notes "..."]
//
// First vendor:  provide --source --ref --name (and --subpath if the plugin is a subdir).
// Re-sync:       re-run with a new --ref AND --approve <that-ref> after reviewing the upstream diff.
import { execSync } from 'node:child_process';
import { mkdtempSync, cpSync, existsSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(fileURLToPath(import.meta.url), '..', '..');
const ALLOWLIST = ['MIT', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'Apache-2.0'];

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : process.argv[i + 1];
}
function die(msg) { console.error(`✗ ${msg}`); process.exit(1); }

const source = arg('--source'), ref = arg('--ref'), name = arg('--name');
const subpath = arg('--subpath') || '.';
const approve = arg('--approve');
const notes = arg('--notes') || '';
if (!source || !ref || !name) die('required: --source <url> --ref <sha> --name <plugin-name>');
if (!/^[0-9a-f]{7,40}$/i.test(ref)) die('--ref must be a pinned commit SHA, not a branch/tag');

const dest = join(REPO, 'plugins', name);
const isResync = existsSync(dest);
if (isResync && approve !== ref) {
  die(`'${name}' already vendored. Re-sync requires reviewing the upstream diff, then re-run with --approve ${ref}`);
}

function detectLicense(dir) {
  const f = readdirSync(dir).find((x) => /^licen[cs]e/i.test(x));
  if (!f) return { type: 'UNKNOWN', file: null };
  const t = readFileSync(join(dir, f), 'utf8');
  if (/Apache License,?\s+Version 2\.0/i.test(t)) return { type: 'Apache-2.0', file: f };
  if (/Permission is hereby granted, free of charge/i.test(t) && /MIT/i.test(t.slice(0, 200))) return { type: 'MIT', file: f };
  if (/Permission is hereby granted, free of charge/i.test(t) && /ISC/i.test(t.slice(0, 200))) return { type: 'ISC', file: f };
  if (/Permission is hereby granted, free of charge/i.test(t)) return { type: 'MIT', file: f }; // MIT-style
  if (/Redistribution and use in source and binary/i.test(t)) return { type: 'BSD-3-Clause', file: f };
  return { type: 'UNKNOWN', file: f };
}

const tmp = mkdtempSync(join(tmpdir(), 'tqx-vendor-'));
try {
  console.log(`• cloning ${source} @ ${ref} …`);
  execSync(`git init -q "${tmp}"`, { stdio: 'inherit' });
  execSync(`git -C "${tmp}" remote add origin "${source}"`, { stdio: 'inherit' });
  execSync(`git -C "${tmp}" fetch -q --depth 1 origin "${ref}"`, { stdio: 'inherit' });
  execSync(`git -C "${tmp}" checkout -q FETCH_HEAD`, { stdio: 'inherit' });

  const srcDir = join(tmp, subpath);
  if (!existsSync(srcDir)) die(`--subpath '${subpath}' not found in source`);

  const lic = detectLicense(tmp);
  if (!ALLOWLIST.includes(lic.type)) {
    die(`license '${lic.type}' is NOT on the allowlist (${ALLOWLIST.join(', ')}). Refusing to vendor.`);
  }

  // Copy plugin content + the upstream LICENSE
  if (isResync) rmSync(dest, { recursive: true, force: true });
  cpSync(srcDir, dest, { recursive: true });
  if (lic.file) cpSync(join(tmp, lic.file), join(dest, 'LICENSE'));

  const stamp = new Date().toISOString().slice(0, 10);
  writeFileSync(join(dest, 'VENDOR.md'), `# Vendored component

source: ${source}
commit: ${ref}
date: ${stamp}
license: ${lic.type}
synced_by: scripts/vendor-sync.mjs
notes: ${notes}

> Redistributed under the original license (preserved as LICENSE in this directory).
> Security-reviewed before commit per CONTRIBUTING.md (no undisclosed code execution / network /
> secret access / prompt-injection). Re-sync only via \`vendor-sync.mjs --approve <sha>\`.
`);

  console.log(`✓ vendored '${name}' (${lic.type}) at ${ref}`);
  console.log('\nNEXT — mandatory before commit:');
  console.log('  1. SECURITY REVIEW the vendored files: hooks/bash/curl/eval, MCP configs, secret/network');
  console.log('     access, prompt-injection. Disclose anything that executes code.');
  console.log('  2. Add the plugin to .claude-plugin/marketplace.json with metadata.vendored=true + source.');
  console.log('  3. Run: claude plugin validate . && node scripts/check-vendored.mjs');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
