#!/usr/bin/env node
// CI guard: every vendored plugin must carry a valid, allowlisted LICENSE + VENDOR.md with a pinned
// commit SHA, and the marketplace metadata.source must match VENDOR.md. Presence is NOT enough — the
// license TYPE is validated. Exits non-zero on any violation. No vendored plugins → passes (no-op).
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(fileURLToPath(import.meta.url), '..', '..');
const ALLOWLIST = ['MIT', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'Apache-2.0'];
const pluginsDir = join(REPO, 'plugins');
const errors = [];

let marketplace = { plugins: [] };
try { marketplace = JSON.parse(readFileSync(join(REPO, '.claude-plugin', 'marketplace.json'), 'utf8')); } catch {}
const mpByName = Object.fromEntries((marketplace.plugins || []).map((p) => [p.name, p]));

let vendoredCount = 0;
for (const name of readdirSync(pluginsDir)) {
  const dir = join(pluginsDir, name);
  const vendorMd = join(dir, 'VENDOR.md');
  if (!existsSync(vendorMd)) continue; // first-party
  vendoredCount++;

  const v = readFileSync(vendorMd, 'utf8');
  const field = (k) => (v.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1]?.trim();
  const commit = field('commit');
  const source = field('source');
  const license = field('license');

  if (!existsSync(join(dir, 'LICENSE'))) errors.push(`${name}: missing LICENSE file`);
  if (!license || !ALLOWLIST.includes(license)) errors.push(`${name}: license '${license}' not on allowlist (${ALLOWLIST.join(', ')})`);
  if (!commit || !/^[0-9a-f]{7,40}$/i.test(commit)) errors.push(`${name}: VENDOR.md needs a pinned commit SHA (got '${commit}')`);

  const mp = mpByName[name];
  if (!mp) errors.push(`${name}: not listed in marketplace.json`);
  else {
    if (!(mp.metadata && mp.metadata.vendored === true)) errors.push(`${name}: marketplace entry missing metadata.vendored=true`);
    const mpSource = mp.metadata && mp.metadata.source;
    if (mpSource && source && mpSource !== source) errors.push(`${name}: marketplace source '${mpSource}' != VENDOR.md source '${source}'`);
  }
}

if (errors.length) {
  console.error('✗ vendored-plugin guard failed:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ vendored-plugin guard passed (${vendoredCount} vendored plugin(s))`);
