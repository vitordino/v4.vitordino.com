import { z, defineCollection } from 'astro:content'

const experience = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		dateRange: z.string(),
		to: z.string(),
		description: z.string(),
		type: z.literal('hidden').optional(),
	}),
})

const education = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		dateRange: z.string(),
		to: z.string(),
		description: z.string(),
		type: z.literal('hidden').optional(),
	}),
})

const writing = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.date(),
		description: z.string(),
		tags: z.array(z.string()),
		hero: z.optional(z.object({ canvas: z.string(), mouse: z.optional(z.tuple([z.number(), z.number()])) })),
		salt: z.optional(z.boolean()),
		type: z.literal('hidden').optional(),
	}),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { writing, experience, education }
