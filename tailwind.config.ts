import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import windyRadixPlugin from 'windy-radix-palette'
import { slate, slateDark, tomato, tomatoDark } from '@radix-ui/colors'

export const x = defaultTheme.screens

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [windyRadixPlugin({ colors: { slate, slateDark, tomato, tomatoDark } })],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: { ...defaultTheme, gridTemplateColumns: { '16': 'repeat(16, minmax(0, 1fr))' } },
} satisfies Config
