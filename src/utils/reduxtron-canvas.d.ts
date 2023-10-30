import type { CanvasDraw } from '@utils/canvas'
import { setup } from '@utils/canvas'

const COLOR = '#66666625'
const SPACE = 16
const MIN_SIZE = 1.5
const MAX_SIZE = 3
const PADDING = 1

const range = (n = 0) => [...Array(n)].map((_, i) => i)
const getDistance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x1 - x2, y1 - y2)

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

const draw: CanvasDraw =
	ctx =>
	({ width, height, mouseX, mouseY }) => {
		if (!ctx) return
		ctx.clearRect(0, 0, width, height)
		const offsetX = (width % SPACE) / 2
		const offsetY = (height % SPACE) / 2
		const c = range(Math.floor(width / SPACE) - PADDING)
		const l = range(Math.floor(height / SPACE) - PADDING)
		return c
			.flatMap(i =>
				l.flatMap(j => ({
					x: (i + PADDING) * SPACE + offsetX,
					y: (j + PADDING) * SPACE + offsetY,
				})),
			)
			.forEach(({ x, y }) => {
				const distance = getDistance(x, y, mouseX, mouseY)
				const size = Math.max(MAX_SIZE - 0.0125 * distance + 3 * Math.abs(Math.sin(0.125 * distance)), MIN_SIZE)
				return circle({
					ctx,
					size,
					fill: COLOR,
					x,
					y,
				})
			})
	}

document.querySelectorAll<HTMLDivElement>('[data-reduxtron-canvas]').forEach(setup(draw))
