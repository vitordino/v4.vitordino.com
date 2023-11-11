import type { CSSProperties, ReactNode } from 'react'
import fs from 'fs/promises'
import satori from 'satori'
import sharp from 'sharp'
import type { APIRoute } from 'astro'

const titleStyle: CSSProperties = {}

const div = (children: ReactNode | ReactNode[], style: CSSProperties): ReactNode => ({
	type: 'div',
	key: '',
	props: {
		children,
		style,
	},
})

export const get: APIRoute = async x => {
	console.log(x)
	const redaction = await fs.readFile('./public/fonts/redaction/Redaction35-Regular.otf')

	const svg = await satori(div('Hello world', titleStyle), {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Roboto',
				data: redaction,
			},
		],
	})

	const png = await sharp(Buffer.from(svg)).png().toBuffer()

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
		},
	})
}
