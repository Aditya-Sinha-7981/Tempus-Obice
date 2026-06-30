export interface Location {
	id: string;
	name: string;
	description: string;
	coordinates: [number, number];
	markerIcon?: string;
	storyIds: string[];
}

export interface Story {
	id: string;
	title: string;
	locationId: string;
	summary?: string;
	order: number;
}