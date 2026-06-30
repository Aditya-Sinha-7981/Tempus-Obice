import type { Location } from '../../types/content';

interface Props {
	locations: Location[];
	onLocationSelect: (location: Location) => void;
}

export default function WorldMap({ locations, onLocationSelect }: Props) {
	return (
		<div className="map-container">
			<div className="map-placeholder">
				<p>World Map Placeholder</p>
				<p>Leaflet will be mounted here</p>
			</div>
			<div className="map-locations">
				{locations.map((location) => (
					<button
						key={location.id}
						type="button"
						onClick={() => onLocationSelect(location)}
						className="map-location-button"
					>
						{location.name}
					</button>
				))}
			</div>
		</div>
	);
}