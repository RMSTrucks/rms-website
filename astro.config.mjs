import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://rmstruckers.com',
  integrations: [
    sitemap({
      filter: (page) =>
        // Exclude test/design option pages from sitemap
        !page.includes('/option-') &&
        !page.includes('/option-v2')
    }),
    robotsTxt({
      sitemap: 'https://rmstruckers.com/sitemap-index.xml'
    })
  ],
});
