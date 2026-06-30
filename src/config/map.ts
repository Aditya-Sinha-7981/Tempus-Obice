export const MAP_WIDTH = 4096;
export const MAP_HEIGHT = 4096;
export const MAP_BOUNDS: [[number, number], [number, number]] = [
	[0, 0],
	[MAP_HEIGHT, MAP_WIDTH],
];
export const MIN_ZOOM = -2;
export const MAX_ZOOM = 2;
export const DEFAULT_ZOOM = -1;
export const DEFAULT_CENTER: [number, number] = [MAP_HEIGHT / 2, MAP_WIDTH / 2];