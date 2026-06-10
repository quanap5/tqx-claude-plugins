// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Cloudflare Pages serves at the domain root.
export default defineConfig({
  site: 'https://tqx-claude-plugins.pages.dev',
  base: '/',
  integrations: [
    starlight({
      title: 'tqx',
      description: 'TwinQX tooling for Claude Code — three skills under the tqx: namespace.',
      customCss: ['./src/styles/tqx.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/quanap5/tqx-claude-plugins' },
      ],
      sidebar: [
        { label: 'Overview', link: '/' },
        { label: 'Install', link: '/install/' },
        { label: 'Skills', items: [{ autogenerate: { directory: 'skills' } }] },
        { label: 'Commands', items: [{ autogenerate: { directory: 'commands' } }] },
        { label: 'Agents', items: [{ autogenerate: { directory: 'agents' } }] },
      ],
    }),
  ],
});
