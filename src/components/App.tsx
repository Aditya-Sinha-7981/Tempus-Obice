import { useState } from 'react';
import WorldMap from './Map/WorldMap';
import Sidebar from './Sidebar/Sidebar';
import '../styles/map.css';
import '../styles/sidebar.css';
import type { Location } from '../types/content';

interface Props {
	locations: Location[];
}

export default function App({ locations }: Props) {
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

	function handleLocationSelect(location: Location) {
		setSelectedLocation(location);
	}

	return (
		<div className="app">
			<WorldMap
				locations={locations}
				onLocationSelect={handleLocationSelect}
			/>
			<Sidebar
				location={selectedLocation}
			/>
		</div>
	);
}