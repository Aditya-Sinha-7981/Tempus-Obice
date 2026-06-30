import type { Location } from '../../types/content';

interface Props {
	location: Location | null;
}

export default function Sidebar({ location }: Props) {
	if (!location) {
		return (
			<aside className="sidebar">
				<div className="sidebar-empty">
					<p>Select a location on the map</p>
				</div>
			</aside>
		);
	}

	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<h2>{location.name}</h2>
			</div>
			<div className="sidebar-content">
				<p className="sidebar-description">{location.description}</p>
				<p className="sidebar-stories">
					{location.storyIds.length} story{location.storyIds.length !== 1 ? 'ies' : ''}
				</p>
			</div>
		</aside>
	);
}