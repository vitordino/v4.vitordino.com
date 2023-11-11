import type { CanvasDraw } from 'src/utils/canvas'

type Point = [x: number, y: number]
type Grid = Point[]

const SIZE = 16
const LENGTH = 12

type Line = (ctx: CanvasRenderingContext2D) => (x1: number, y1: number, x2: number, y2: number) => void
const line: Line = ctx => (x1, y1, x2, y2) => {
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.stroke()
}

export const draw: CanvasDraw = ctx => params => {
	const { width, height, mouseX, mouseY } = params
	if (!ctx) return
	ctx.fillStyle = 'transparent'
	ctx.strokeStyle = '#66666625'
	ctx.clearRect(0, 0, width, height)

	const grid: Grid = []
	const countX = Math.floor(width / SIZE)
	const countY = Math.floor(height / SIZE)
	const offsetX = (width % SIZE) / 2
	const offsetY = (height % SIZE) / 2
	for (let j = 1; j < countY; j++) {
		for (let i = 1; i < countX; i++) {
			grid.push([i * SIZE + offsetX, j * SIZE + offsetY])
		}
	}

	grid.forEach(([x, y]) => {
		if (x === undefined || y === undefined) return
		const [dx, dy] = [x - mouseX, y - mouseY]
		const h = Math.atan2(-dx - dy, dy - dx)
		line(ctx)(x, y, x + LENGTH * Math.cos(h), y + LENGTH * Math.sin(h))
	})
}
