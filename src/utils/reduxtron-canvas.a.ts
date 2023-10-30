import type { CanvasDraw } from '@utils/canvas'
import { setup } from '@utils/canvas'

const COLOR = '#66666625'
const SPACE = 16
const MIN_SIZE = 1.5
const MAX_SIZE = 3
const PADDING = 1

const range = (n = 0) => [...Array(n)].map((_, i) => i)
const getDistance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x1 - x2, y1 - y2)

type Line = (ctx: CanvasRenderingContext2D) => (x1: number, y1: number, x2: number, y2: number) => void
const line: Line = ctx => (x1, y1, x2, y2) => {
	ctx.lineWidth = 1.5
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

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
		// circle({ ctx, size: 64, x: mouseX, y: mouseY, stroke: '#66666625', strokeWidth: 1 })
		ctx.strokeStyle = '#66666625'
		const renderLine = line(ctx)
		const offsetX = (width % SPACE) / 2
		const offsetY = (height % SPACE) / 2
		const c = range(Math.floor(width / SPACE) - PADDING)
		const l = range(Math.floor(height / SPACE) - PADDING)

		c.forEach(i =>
			l.forEach(j => {
				const x = (i + PADDING) * SPACE + offsetX
				const y = (j + PADDING) * SPACE + offsetY
				const distance = getDistance(x, y, mouseX, mouseY)
				if (distance < 64) {
					if (!i || j === l.length - 1) return
					return renderLine(x, y, x + SPACE, y + SPACE)
				}
				circle({ ctx, x, y, size: 1, fill: '#66666625' })
				// if (i === c.length - 1 || j === l.length - 1) return
				// renderLine(x, y, x + SPACE, y + SPACE)
			}),
		)
	}

document.querySelectorAll<HTMLDivElement>('[data-reduxtron-canvas]').forEach(setup(draw))
