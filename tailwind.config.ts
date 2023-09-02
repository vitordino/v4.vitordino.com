import type { Config } from 'tailwindcss'
import windyRadixPlugin from 'windy-radix-palette'
import { slate, slateDark } from '@radix-ui/colors'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [windyRadixPlugin({ colors: { slate, slateDark } })],
	// darkMode: 'class',
	darkMode: ['class', '[data-theme="dark"]'],
} satisfies Config
