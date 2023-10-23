type DrawParams = {
	width: number
	height: number
	left: number
	top: number
	mouseX: number
	mouseY: number
}

export type CanvasDraw = (ctx: CanvasRenderingContext2D) => (params: DrawParams) => void
export type CanvasSetup = (draw: CanvasDraw) => (div: HTMLDivElement) => void
export const setup: CanvasSetup = draw => div => {
	const canvas = document.createElement('canvas')
	div.appendChild(canvas)
	const ctx = canvas.getContext('2d')
	if (!ctx) return

	const rect = div.getBoundingClientRect()
	// proxyfied for updating
	const params = {
		width: rect.width,
		height: rect.height,
		left: rect.left,
		top: rect.top,
		mouseX: rect.width / 2,
		mouseY: rect.height / 2,
	}

	const handler: ProxyHandler<typeof params> = {
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

	const updateRectProxy = ({
		width,
		height,
		left,
		top,
	}: {
		width: number
		height: number
		left: number
		top: number
	}) => {
		proxy.width = width
		proxy.height = height
		proxy.left = left
		proxy.top = top
	}

	const scroll = () => {
		const { width, height, left, top } = div.getBoundingClientRect()
		updateRectProxy({ width, height, left, top })
	}

	window.addEventListener('scroll', scroll)

	const resize = () => {
		const { width, height, left, top } = div.getBoundingClientRect()
		setRetina({ width, height, ratio: window.devicePixelRatio })
		updateRectProxy({ width, height, left, top })
	}

	window.addEventListener('resize', resize)

	const mouseMove = (e: MouseEvent) => {
		proxy.mouseX = e.clientX - proxy.left
		proxy.mouseY = e.clientY - proxy.top
	}
	window.addEventListener('mousemove', mouseMove)
	resize()
	draw(ctx)(proxy)
}
