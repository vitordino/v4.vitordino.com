import { test } from '@playwright/test'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

test('create og image for home', async ({ page }) => {
	await page.goto('http://localhost:4321/og-image')
	await page.waitForLoadState('domcontentloaded')
	await page.screenshot({ path: './public/og-image/index.png' })
})

const writingFolderPath = join(import.meta.url, '..', '..', 'src', 'content', 'writing').replace('file:/', '/')

const getArticles = async () => {
	const contents = await readdir(writingFolderPath, { withFileTypes: true })
	return contents.filter(x => x.isDirectory()).map(({ name }) => name.split('-').slice(1).join('-'))
}

test('create og image for articles', async ({ page }) => {
	const articles = await getArticles()
	for await (const slug of articles) {
		console.log(`creating og image for /writing/${slug}`)
		await page.goto(`http://localhost:4321/og-image/writing/${slug}`)
		await page.waitForLoadState('domcontentloaded')
		await page.screenshot({ path: `./public/og-image/writing/${slug}.png` })
	}
})

// const main = async () => {
// 	const articles = await getArticles()
// 	console.log(articles)
// }
// main()
