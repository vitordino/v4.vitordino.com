import { z, defineCollection } from 'astro:content'

const writing = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.date(),
		description: z.string(),
		ogImage: z.string(),
		twitterImage: z.string(),
		tags: z.array(z.string()),
		hero: z.optional(z.object({ canvas: z.string() })),
	}),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { writing }
