// Build-only: scan every plugin for Skills / Commands / Agents and emit curated Starlight pages
// + a catalog manifest. Source of truth = the component files under plugins/**. Output is git-ignored.
// Vendored plugins (those with a VENDOR.md) are flagged with source + license for attribution.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const pluginsDir = join(repo, 'plugins');
const docsDir = join(here, '..', 'src', 'content', 'docs');
const REPO_URL = 'https://github.com/quanap5/tqx-claude-plugins';
const TYPES = [
  { type: 'skill', plural: 'skills' },
  { type: 'command', plural: 'commands' },
  { type: 'agent', plural: 'agents' },
];

/** Tolerant frontmatter reader: handles `name:`, inline `description:`, and folded `description: >-`. */
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const lines = m[1].split('\n');
  const out = {};
  const unquote = (s) => s.trim().replace(/^["']|["']$/g, '');
  for (let i = 0; i < lines.length; i++) {
    const name = lines[i].match(/^name:\s*(.+)$/);
    if (name) out.name = unquote(name[1]);
    const desc = lines[i].match(/^description:\s*(.*)$/);
    if (desc) {
      if (/^>-?$/.test(desc[1].trim()) || desc[1].trim() === '') {
        const buf = [];
        for (let j = i + 1; j < lines.length && /^\s+\S/.test(lines[j]); j++) buf.push(lines[j].trim());
        out.description = buf.join(' ').trim();
      } else out.description = unquote(desc[1]);
    }
  }
  return out;
}

/** Read VENDOR.md provenance (source URL + license) if the plugin is vendored. */
function readVendor(pluginPath) {
  const vp = join(pluginPath, 'VENDOR.md');
  if (!existsSync(vp)) return null;
  const t = readFileSync(vp, 'utf8');
  const src = (t.match(/source:\s*(\S+)/i) || [])[1] || '';
  const lic = (t.match(/license:\s*(\S+)/i) || [])[1] || '';
  return { source: src, license: lic };
}

const firstSentence = (s) => { const i = s.indexOf('. '); return (i === -1 ? s : s.slice(0, i + 1)).trim(); };

// Fresh generated dirs
for (const { plural } of TYPES) {
  const d = join(docsDir, plural);
  if (existsSync(d)) rmSync(d, { recursive: true, force: true });
  mkdirSync(d, { recursive: true });
}

const catalog = [];
for (const plugin of readdirSync(pluginsDir)) {
  const pPath = join(pluginsDir, plugin);
  if (!existsSync(join(pPath, '.claude-plugin', 'plugin.json'))) continue;
  const vendor = readVendor(pPath);

  for (const { type, plural } of TYPES) {
    const typeDir = join(pPath, plural);
    if (!existsSync(typeDir)) continue;
    const entries = [];
    if (type === 'skill') {
      for (const d of readdirSync(typeDir))
        if (existsSync(join(typeDir, d, 'SKILL.md'))) entries.push({ file: join(typeDir, d, 'SKILL.md'), base: d });
    } else {
      for (const f of readdirSync(typeDir))
        if (f.endsWith('.md')) entries.push({ file: join(typeDir, f), base: f.replace(/\.md$/, '') });
    }
    for (const { file, base } of entries) {
      const fm = parseFrontmatter(readFileSync(file, 'utf8'));
      const name = fm.name || base;
      const fqid = `${plugin}:${name}`;
      const short = firstSentence(fm.description || `${type} in the ${plugin} plugin.`);
      const slug = plugin === 'tqx' ? name : `${plugin}-${name}`;
      catalog.push({ type, plural, name, slug, fqid, plugin, vendored: !!vendor, source: vendor?.source || '', license: vendor?.license || '', short });

      const vendNote = vendor
        ? `\n:::note[Vendored]\nFrom [${vendor.source}](${vendor.source}) · license: ${vendor.license}. Redistributed under the original license.\n:::\n`
        : '';
      writeFileSync(join(docsDir, plural, `${slug}.mdx`), `---
title: "${fqid}"
description: ${JSON.stringify(short)}
---
${vendNote}
${fm.description || short}

## Use it

${type === 'command' ? `Run it as a slash command:` : type === 'agent' ? `Invoke it as a subagent:` : `Auto-triggers on intent, or call it directly:`}

\`\`\`text
${type === 'command' ? '/' : ''}${fqid}
\`\`\`

[View the source on GitHub →](${REPO_URL}/tree/main/plugins/${plugin}/${plural}/${type === 'skill' ? base + '/SKILL.md' : base + '.md'})
`);
    }
  }
}

writeFileSync(join(here, '..', 'src', 'data-catalog.json'), JSON.stringify(catalog, null, 2));
const by = (t) => catalog.filter((c) => c.type === t).length;
console.log(`catalog: ${by('skill')} skill(s), ${by('command')} command(s), ${by('agent')} agent(s) across ${new Set(catalog.map((c) => c.plugin)).size} plugin(s)`);
