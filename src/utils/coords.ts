import { MAP_WIDTH, MAP_HEIGHT, MAP_BOUNDS, DEFAULT_CENTER, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM } from '../config/map';

export interface LeafletCoords {
	lat: number;
	lng: number;
}

export interface ImageCoords {
	x: number;
	y: number;
}

export function isValidImageCoords(coords: unknown): coords is ImageCoords {
	if (!coords) return false;

	if (Array.isArray(coords) && coords.length === 2) {
		const x = coords[0];
		const y = coords[1];
		if (typeof x === 'number' && typeof y === 'number' &&
			!isNaN(x) && !isNaN(y) &&
			x >= 0 && x <= MAP_WIDTH &&
			y >= 0 && y <= MAP_HEIGHT) {
			return true;
		}
	}

	return false;
}

export function normalizeCoords(coords: unknown): ImageCoords | null {
	if (!isValidImageCoords(coords)) return null;

	if (Array.isArray(coords)) {
		return { x: coords[0], y: coords[1] };
	}

	return coords as ImageCoords;
}

export function imageToLeaflet(coords: ImageCoords): LeafletCoords {
	return {
		lat: coords.y,
		lng: coords.x,
	};
}

export function leafletToImage(coords: LeafletCoords): ImageCoords {
	return {
		x: coords.lng,
		y: coords.lat,
	};
}

export function imageToLatLng(coords: ImageCoords): [number, number] {
	return [coords.y, coords.x];
}

export function latLngToImage(lat: number, lng: number): ImageCoords | null {
	if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
		return null;
	}
	return { x: lng, y: lat };
}

export function getMapConfig() {
	return {
		bounds: MAP_BOUNDS,
		center: DEFAULT_CENTER as [number, number],
		zoom: DEFAULT_ZOOM,
		width: MAP_WIDTH,
		height: MAP_HEIGHT,
	};
}

export { MAP_WIDTH, MAP_HEIGHT, MAP_BOUNDS, DEFAULT_CENTER, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM };