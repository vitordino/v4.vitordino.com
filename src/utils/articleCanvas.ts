import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import EtymosCanvas from '@components/EtymosCanvas.astro'

export const CANVAS_MAP = {
	etymos: EtymosCanvas,
} as const

export const isValidCanvasId = (canvas?: string): canvas is keyof typeof CANVAS_MAP => !!canvas && canvas in CANVAS_MAP

export const getCanvas = (canvas?: string): AstroComponentFactory | undefined =>
	(isValidCanvasId(canvas) && CANVAS_MAP[canvas]) || undefined
