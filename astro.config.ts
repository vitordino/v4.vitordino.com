import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
	integrations: [tailwind(), mdx()],
	markdown: { shikiConfig: { theme: 'one-dark-pro' } },
	output: 'hybrid',
	adapter: vercel({ devImageService: 'sharp', imageService: true, webAnalytics: { enabled: true } }),
})
