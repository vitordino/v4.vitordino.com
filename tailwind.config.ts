import type { Config } from 'tailwindcss'
import { colors } from './tailwind-radix-colors'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: { extend: { colors } },
	plugins: [],
} satisfies Config
