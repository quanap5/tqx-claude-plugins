// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Project pages: https://quanap5.github.io/tqx-claude-plugins
export default defineConfig({
  site: 'https://quanap5.github.io',
  base: '/tqx-claude-plugins',
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
      ],
    }),
  ],
});
