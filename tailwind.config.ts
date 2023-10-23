import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import windyRadixPlugin from 'windy-radix-palette'
import { slate, slateDark, tomato, tomatoDark } from '@radix-ui/colors'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [windyRadixPlugin({ colors: { slate, slateDark, tomato, tomatoDark } })],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		...defaultTheme,
		extend: {
			fontFamily: {
				serif: ['Redaction', ...defaultTheme.fontFamily.serif],
				serif35: ['Redaction35', ...defaultTheme.fontFamily.serif],
			},
			gridTemplateColumns: { '16': 'repeat(16, minmax(0, 1fr))' },
			gridColumn: {
				...defaultTheme.gridColumn,
				'span-13': 'span 13 / span 13',
				'span-14': 'span 14 / span 14',
				'span-15': 'span 15 / span 15',
				'span-16': 'span 16 / span 16',
			},
			animation: {
				breathe: 'breathe 2.5s cubic-bezier(0, 0, 0.2, 1)  infinite',
			},
			keyframes: {
				breathe: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.25)' },
				},
			},
		},
	},
	safelist: [
		{ pattern: /(flex|block|hidden)/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
		{ pattern: /span-(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15)/, variants: ['sm', 'md', 'lg', 'xl', '2xl'] },
	],
} satisfies Config
