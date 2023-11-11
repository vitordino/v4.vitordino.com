import type { CanvasDraw } from 'src/utils/canvas'

const COLOR = '#66666625'
const SPACE = 16
const PADDING = 1
const RADIUS = 7

const range = (n = 0) => [...Array(n)].map((_, i) => i)
const getDistance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x1 - x2, y1 - y2)

type Line = (ctx: CanvasRenderingContext2D) => (x1: number, y1: number, x2: number, y2: number) => void
const line: Line = ctx => (x1, y1, x2, y2) => {
	ctx.lineWidth = 1
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

export const draw: CanvasDraw =
	ctx =>
	({ width, height, mouseX, mouseY }) => {
		if (!ctx) return
		const offsetX = (width % SPACE) / 2
		const columnCount = Math.floor(width / SPACE) - PADDING
		const lineCount = Math.floor(height / SPACE)
		const mouseSliceH = Math.floor((mouseX - offsetX + SPACE / 2) / SPACE) - PADDING
		const mouseSliceV = Math.floor((mouseY + SPACE / 2) / SPACE) - PADDING

		// don’t update render when mouse is out of bounds
		if (mouseSliceH > columnCount + RADIUS || mouseSliceV > lineCount + RADIUS) return
		ctx.clearRect(0, 0, width, height)

		ctx.strokeStyle = COLOR
		ctx.lineWidth = 2
		// ctx.setLineDash([8.25, 2])

		const c = range(columnCount)
		const l = range(lineCount)
		const renderLine = line(ctx)

		c.forEach(i => {
			const x = (i + PADDING) * SPACE
			const leftLimit = i < PADDING
			const rightLimit = i === c.length - PADDING
			l.forEach(j => {
				const y = (j + PADDING) * SPACE
				const topLimit = j < PADDING
				const bottomLimit = j === l.length - PADDING
				const cellDistance = getDistance(i, j, mouseSliceH, mouseSliceV)

				if ('DEBUG' in window && !cellDistance) {
					ctx.fillStyle = '#ff00ff'
					ctx.fillRect(x - SPACE / 2, y - SPACE / 2, SPACE, SPACE)
				}

				if (cellDistance < RADIUS && ((i - 1) * (j - 1)) % 4) {
					if ('DEBUG' in window) {
						ctx.fillStyle = '#00ff0025'
						ctx.fillRect(x - SPACE / 2, y - SPACE / 2, SPACE, SPACE)
					}
					if (!topLimit && !leftLimit) renderLine(x, y, x - SPACE / 2, y - SPACE / 2)
					if (!bottomLimit && !rightLimit) renderLine(x, y, x + SPACE / 2, y + SPACE / 2)
					return
				}

				if (!bottomLimit && !leftLimit) renderLine(x, y, x - SPACE / 2, y + SPACE / 2)
				if (!topLimit && !rightLimit) renderLine(x, y, x + SPACE / 2, y - SPACE / 2)
			})
		})
	}
