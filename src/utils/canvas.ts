type RectParams = {
	width: number
	height: number
	left: number
	top: number
}

type MouseParams = {
	mouseX: number
	mouseY: number
}

type DrawParams = RectParams & MouseParams

type Listener = 'resize' | 'scroll' | 'mousemove'
const DEFAULT_LISTENERS: Listener[] = ['resize', 'scroll', 'mousemove']

export type CanvasDraw = (ctx: CanvasRenderingContext2D) => (params: DrawParams) => void
export type CanvasSetup = (draw: CanvasDraw, listeners?: Listener[]) => (div: HTMLDivElement) => void
export const setup: CanvasSetup =
	(draw, listeners = DEFAULT_LISTENERS) =>
	div => {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		div.appendChild(canvas)

		const rect = div.getBoundingClientRect()
		// proxyfied for updating
		const params: DrawParams = {
			width: rect.width,
			height: rect.height,
			left: rect.left,
			top: rect.top,
			mouseX: rect.width / 2,
			mouseY: rect.height / 2,
		}

		const handler: ProxyHandler<DrawParams> = {
			set: (obj, prop: keyof typeof obj, value) => {
				if (!ctx) return obj[prop] === value
				obj[prop] = value
				requestAnimationFrame(() => draw(ctx)({ ...obj, [prop]: value }))
				return true
			},
		}

		const proxy = new Proxy(params, handler)

		const setRetina = ({ width, height, ratio }: { width: number; height: number; ratio: number }) => {
			canvas.width = width * ratio
			canvas.height = height * ratio
			canvas.style.width = Math.floor(width) + 'px'
			canvas.style.height = Math.floor(height) + 'px'
			ctx?.scale(ratio, ratio)
		}

		const updateRectProxy = ({ width, height, left, top }: RectParams) => {
			proxy.width = width
			proxy.height = height
			proxy.left = left
			proxy.top = top
		}

		const scroll = () => updateRectProxy(div.getBoundingClientRect())
		listeners.includes('scroll') && window.addEventListener('scroll', scroll)

		const resize = () => {
			const { width, height, left, top } = div.getBoundingClientRect()
			setRetina({ width, height, ratio: window.devicePixelRatio })
			updateRectProxy({ width, height, left, top })
		}

		listeners.includes('resize') && window.addEventListener('resize', resize)

		const mouseMove = (e: MouseEvent) => {
			proxy.mouseX = e.clientX - proxy.left
			proxy.mouseY = e.clientY - proxy.top
		}
		listeners.includes('mousemove') && window.addEventListener('mousemove', mouseMove)
		resize()
		draw(ctx)(proxy)
	}
