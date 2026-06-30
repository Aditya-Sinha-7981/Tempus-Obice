import { useEffect, useRef, useState, useCallback } from 'react';
import type L from 'leaflet';
import worldMapImage from '../../assets/maps/world.webp';
import {
	MAP_BOUNDS,
	MIN_ZOOM,
	MAX_ZOOM,
	DEFAULT_ZOOM,
	DEFAULT_CENTER,
	imageToLatLng,
	latLngToImage,
	normalizeCoords,
} from '../../utils/coords';
import type { Location } from '../../types/content';

interface Props {
	locations: Location[];
	onLocationSelect: (location: Location) => void;
}

const MARKER_SIZE = 16;
const ACCENT_COLOR = '#c9a84c';

function createMarkerIcon(leaflet: typeof L, isSelected: boolean): L.DivIcon {
	const size = isSelected ? MARKER_SIZE + 4 : MARKER_SIZE;
	const color = isSelected ? ACCENT_COLOR : 'rgba(13, 15, 18, 0.9)';
	const borderColor = isSelected ? '#e8e6e1' : ACCENT_COLOR;
	const glowSize = isSelected ? 12 : 4;
	const glowColor = isSelected ? ACCENT_COLOR : 'transparent';

	return leaflet.divIcon({
		className: `location-marker ${isSelected ? 'selected' : ''}`,
		html: `<div class="location-marker-inner" style="
			width: ${size}px;
			height: ${size}px;
			background-color: ${color};
			border: 2px solid ${borderColor};
			border-radius: 50%;
			box-shadow: 0 0 ${glowSize}px ${glowColor};
		"></div>`,
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
		popupAnchor: [0, -(size / 2)],
	});
}

export default function WorldMap({ locations, onLocationSelect }: Props) {
	const mapRef = useRef<L.Map | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const markersLayerRef = useRef<L.LayerGroup | null>(null);
	const markersRef = useRef<Map<string, L.Marker>>(new Map());
	const devMarkerRef = useRef<L.Marker | null>(null);
	const selectedIdRef = useRef<string | null>(null);
	const leafletRef = useRef<typeof L | null>(null);

	const [devMode, setDevMode] = useState(false);
	const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
	const [notification, setNotification] = useState<string | null>(null);

	const showNotification = useCallback((message: string) => {
		setNotification(message);
		setTimeout(() => setNotification(null), 2000);
	}, []);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
			const target = e.target as HTMLElement;
			if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
				return;
			}
			setDevMode((prev) => !prev);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const handleMarkerClick = useCallback((location: Location) => {
		if (devMode) return;

		const previousId = selectedIdRef.current;
		selectedIdRef.current = location.id;

		if (previousId) {
			const prevMarker = markersRef.current.get(previousId);
			if (prevMarker && leafletRef.current) {
				prevMarker.setIcon(createMarkerIcon(leafletRef.current, false));
			}
		}

		const marker = markersRef.current.get(location.id);
		if (marker && leafletRef.current) {
			marker.setIcon(createMarkerIcon(leafletRef.current, true));
			const latlng = marker.getLatLng();
			mapRef.current?.flyTo(latlng, mapRef.current.getZoom(), { duration: 0.5 });
		}

		onLocationSelect(location);
	}, [devMode, onLocationSelect]);

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}

		let map: L.Map | null = null;

		async function initMap() {
			const leaflet = await import('leaflet');
			leafletRef.current = leaflet;

			map = leaflet.map(containerRef.current!, {
				crs: leaflet.CRS.Simple,
				minZoom: MIN_ZOOM,
				maxZoom: MAX_ZOOM,
				zoomControl: true,
				attributionControl: false,
			});

			const bounds = leaflet.latLngBounds(MAP_BOUNDS as [number, number, number, number]);
			leaflet.imageOverlay(worldMapImage.src, bounds).addTo(map);

			map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
			mapRef.current = map;

			const markersLayer = leaflet.layerGroup().addTo(map);
			markersLayerRef.current = markersLayer;

			for (const location of locations) {
				const imageCoords = normalizeCoords(location.coordinates);
				if (!imageCoords) {
					console.warn(`Invalid coordinates for location ${location.id}:`, location.coordinates);
					continue;
				}

				const latlng: L.LatLngExpression = imageToLatLng(imageCoords);

				const marker = leaflet.marker(latlng, {
					icon: createMarkerIcon(leaflet, false),
				}).addTo(markersLayer);

				marker.on('click', () => handleMarkerClick(location));

				markersRef.current.set(location.id, marker);
			}

			map.on('mousemove', (e) => {
				if (e.containerPoint) {
					const latlng = map!.containerPointToLatLng(e.containerPoint);
					if (latlng) {
						const imageCoords = latLngToImage(latlng.lat, latlng.lng);
						if (imageCoords) {
							setCoords({
								x: Math.round(imageCoords.x),
								y: Math.round(imageCoords.y),
							});
						}
					}
				}
			});

			map.on('click', (e) => {
				if (!devMode) return;

				if (e.containerPoint) {
					const latlng = map!.containerPointToLatLng(e.containerPoint);
					if (!latlng) return;

					const imageCoords = latLngToImage(latlng.lat, latlng.lng);
					if (!imageCoords) return;

					const x = Math.round(imageCoords.x);
					const y = Math.round(imageCoords.y);

					const coordString = `[${x}, ${y}]`;
					navigator.clipboard.writeText(coordString).then(() => {
						showNotification(`Copied: ${coordString}`);
					});

					if (devMarkerRef.current) {
						devMarkerRef.current.remove();
					}

					const devIcon = leaflet.divIcon({
						className: 'dev-marker',
						html: '<div class="dev-marker-inner"></div>',
						iconSize: [16, 16],
						iconAnchor: [8, 8],
					});

					devMarkerRef.current = leaflet.marker([latlng.lat, latlng.lng], { icon: devIcon }).addTo(map!);
				}
			});
		}

		initMap();

		const handleResize = () => {
			if (mapRef.current) {
				mapRef.current.invalidateSize();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			markersRef.current.forEach((marker) => marker.remove());
			markersRef.current.clear();
			if (devMarkerRef.current) {
				devMarkerRef.current.remove();
				devMarkerRef.current = null;
			}
			if (markersLayerRef.current) {
				markersLayerRef.current.remove();
				markersLayerRef.current = null;
			}
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
			leafletRef.current = null;
		};
	}, [devMode, handleMarkerClick, locations, showNotification]);

	return (
		<div className="map-container">
			<div
				ref={containerRef}
				className={`map-leaflet-container ${devMode ? 'dev-mode' : ''}`}
			/>
			<button
				type="button"
				className={`dev-toggle ${devMode ? 'active' : ''}`}
				onClick={() => setDevMode((prev) => !prev)}
			>
				{devMode ? 'Exit Dev Mode' : 'Dev Tools'}
			</button>
			{devMode && coords && (
				<div className="dev-coords">
					<span>X: {coords.x}</span>
					<span>Y: {coords.y}</span>
				</div>
			)}
			{notification && (
				<div className="dev-notification">
					{notification}
				</div>
			)}
		</div>
	);
}