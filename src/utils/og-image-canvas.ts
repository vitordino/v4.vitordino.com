import { draw as home } from 'src/utils/home-canvas'
import { draw as etymos } from 'src/utils/etymos-canvas'
import { draw as reduxtron } from 'src/utils/reduxtron-canvas'
import type { CanvasDraw } from 'src/utils/canvas'
const CANVAS_MAP: Record<string, CanvasDraw> = { home, etymos, reduxtron }

export const drawByCanvasId = (canvasId: string) => {
	const draw = CANVAS_MAP[canvasId] || home
	const canvas = document.querySelector('canvas')
	const ctx = canvas?.getContext('2d')
	if (!ctx) return

	draw(ctx)({ width: 1200, height: 630, left: 0, top: 0, mouseX: 16, mouseY: 16 })

	ctx.fillStyle = 'green'
	ctx.fillRect(0, 0, 1200, 230)
}
