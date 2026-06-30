import { getCollection } from 'astro:content';
import type { Location, Story } from '../types/content';

export async function getAllLocations(): Promise<Location[]> {
	const entries = await getCollection('locations');
	return entries.map((entry) => ({
		...entry.data,
		id: entry.id,
	}));
}

export async function getAllStories(): Promise<Story[]> {
	const entries = await getCollection('stories');
	return entries
		.map((entry) => ({
			...entry.data,
			id: entry.id,
		}))
		.sort((a, b) => a.order - b.order);
}

export async function getLocationById(id: string): Promise<Location | undefined> {
	const locations = await getAllLocations();
	return locations.find((loc) => loc.id === id);
}

export async function getStoriesByLocationId(locationId: string): Promise<Story[]> {
	const stories = await getAllStories();
	return stories.filter((story) => story.locationId === locationId);
}