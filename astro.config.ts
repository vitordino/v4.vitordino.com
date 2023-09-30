import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import vercelStatic from '@astrojs/vercel/static'

export default defineConfig({
	integrations: [tailwind(), mdx()],
	markdown: { shikiConfig: { theme: 'one-dark-pro' } },

	adapter: vercelStatic({ devImageService: 'sharp', imageService: true }),
})
