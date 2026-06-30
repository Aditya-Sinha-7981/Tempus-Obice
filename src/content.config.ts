import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locations = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/locations' }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
		coordinates: z.tuple([z.number(), z.number()]),
		markerIcon: z.string().optional(),
		storyIds: z.array(z.string()),
	}),
});

const stories = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
	schema: z.object({
		title: z.string(),
		locationId: z.string(),
		summary: z.string().optional(),
		order: z.number().optional().default(0),
	}),
});

export const collections = {
	locations,
	stories,
};