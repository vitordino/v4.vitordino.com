import type { CanvasDraw } from 'src/utils/canvas'
import { setup } from 'src/utils/canvas'
const range = (n = 0) => [...Array(n)].map((_, i) => i)

type CircleProps = {
	ctx: CanvasRenderingContext2D
	x: number
	y: number
	size: number
	fill?: string
	stroke?: string
	strokeWidth?: number
}

const circle = ({ ctx, x, y, size, fill, stroke, strokeWidth }: CircleProps) => {
	ctx.beginPath()
	ctx.arc(x, y, size, 0, 2 * Math.PI)
	if (fill) {
		ctx.fillStyle = fill
		ctx.fill()
	}
	if (stroke && strokeWidth) {
		ctx.strokeStyle = stroke
		ctx.lineWidth = strokeWidth
		ctx.stroke()
	}
}

type GridProps = {
	ctx: CanvasRenderingContext2D
	size: number
	width: number
	height: number
	color: string
	space: number
	padding: number
}
const grid = ({ ctx, size, width, height, color, space, padding }: GridProps) => {
	const offsetX = (width % space) / 2
	const offsetY = (height % space) / 2
	const c = range(Math.floor(width / space) - padding)
	const l = range(Math.floor(height / space) - padding)
	return c
		.flatMap(i =>
			l.map(j => ({
				x: (i + padding) * space + offsetX,
				y: (j + padding) * space + offsetY,
			})),
		)
		.forEach(({ x, y }) => circle({ ctx, size, fill: color, x, y }))
}

type RipplesProps = {
	ctx: CanvasRenderingContext2D
	size: number
	width: number
	height: number
	count: number
	mouseX: number
	mouseY: number
}
const ripples = ({ ctx, size, width, height, mouseX, mouseY, count }: RipplesProps) =>
	range(count).forEach(n => {
		circle({
			ctx,
			size: size * (n + 1),
			x: mouseX + size * n - n * size * (mouseX / (width / 2)),
			y: mouseY + size * n - n * size * (mouseY / (height / 2)),
			stroke: '#66666625',
			strokeWidth: 1,
		})
	})

const draw: CanvasDraw =
	ctx =>
	({ width, height, mouseX, mouseY }) => {
		if (!ctx) return
		ctx.clearRect(0, 0, width, height)
		grid({ ctx, width, height, color: '#66666625', space: 16, size: 1, padding: 1 })
		ripples({ ctx, width, height, mouseX, mouseY, size: 16, count: 32 })
	}

document.querySelectorAll<HTMLDivElement>('[data-etymos-canvas]').forEach(setup(draw))
