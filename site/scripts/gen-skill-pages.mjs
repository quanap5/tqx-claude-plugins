// Generate curated Starlight pages from each plugin SKILL.md (build-only; output git-ignored).
// Source of truth = plugins/tqx/skills/<name>/SKILL.md frontmatter. We emit a curated,
// end-user-facing page (description + how-to-use + source link) — NOT the agent-facing body.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const skillsDir = join(repo, 'plugins', 'tqx', 'skills');
const outDir = join(here, '..', 'src', 'content', 'docs', 'skills');
const REPO_URL = 'https://github.com/quanap5/tqx-claude-plugins';

/** Minimal parser for the simple `name:` + folded `description: >-` frontmatter we author. */
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const lines = m[1].split('\n');
  const out = {};
  for (let i = 0; i < lines.length; i++) {
    const nameM = lines[i].match(/^name:\s*(.+)$/);
    if (nameM) out.name = nameM[1].trim();
    if (/^description:\s*>-?\s*$/.test(lines[i])) {
      const buf = [];
      for (let j = i + 1; j < lines.length && /^\s+/.test(lines[j]); j++) buf.push(lines[j].trim());
      out.description = buf.join(' ').trim();
    }
  }
  return out;
}

function firstSentence(s) {
  const i = s.indexOf('. ');
  return (i === -1 ? s : s.slice(0, i + 1)).trim();
}

mkdirSync(outDir, { recursive: true });
const names = readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, 'SKILL.md')));
const catalog = [];

for (const name of names) {
  const fm = parseFrontmatter(readFileSync(join(skillsDir, name, 'SKILL.md'), 'utf8'));
  if (!fm.name) continue;
  const short = firstSentence(fm.description || '');
  catalog.push({ name: fm.name, short });

  const page = `---
title: "tqx:${fm.name}"
description: ${JSON.stringify(short)}
---

${fm.description}

## Use it

Each skill auto-triggers when you describe the task, or you can call it directly:

\`\`\`text
tqx:${fm.name}
\`\`\`

[View the skill source on GitHub →](${REPO_URL}/tree/main/plugins/tqx/skills/${fm.name})
`;
  writeFileSync(join(outDir, `${fm.name}.mdx`), page);
}

writeFileSync(join(here, '..', 'src', 'data-catalog.json'), JSON.stringify(catalog, null, 2));
console.log(`generated ${catalog.length} skill page(s): ${catalog.map((c) => c.name).join(', ')}`);
