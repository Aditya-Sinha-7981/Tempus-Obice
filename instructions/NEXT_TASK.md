# Current Task

# Phase 5 - Dynamic Location Marker System

## Goal

Render every location from the Astro Content Collection as an interactive marker on the Leaflet map.

This is the first feature that connects the project's data layer with the interactive map.

Markers should be completely data-driven.

Adding a new JSON file should automatically create a new marker.

No application code should need modification.

---

# Requirements

## Dynamic Marker Rendering

Load every location from the Astro Content Collection.

Render one marker for every location.

Marker positions must use:

Location.coordinates

No hardcoded coordinates.

No manually added markers.

---

## Marker Icons

Support marker icons.

Each location already contains:

markerIcon

Create a reusable icon management system.

If a requested icon does not exist:

Use a default marker.

Do not duplicate icon creation logic.

The system should easily support future icons.

---

## Marker Interaction

Clicking a marker should:

- Update selectedLocation.
- Notify App.jsx.
- Update the Sidebar.

Do not navigate.

Do not reload the page.

Do not open Leaflet popups.

---

## Selected Marker

Support two visual states.

Default

Selected

The selected marker should remain highlighted until another marker is selected.

Selecting a new marker should automatically deselect the previous one.

---

## Auto Camera Focus

When a marker is selected:

Smoothly animate the map to center that location.

Use Leaflet's animation APIs.

Avoid abrupt jumps.

Do not over-zoom.

Keep the current zoom level whenever reasonable.

---

## Marker Layer

Markers should exist inside their own Leaflet layer.

Future features should be able to add:

- filters
- clustering
- animations
- highlighting

without changing map initialization.

---

## Sidebar Integration

Use the existing sidebar.

Display:

- Location name
- Description
- Story count

The sidebar should update immediately after marker selection.

No loading state is required.

---

## Developer Mode Compatibility

Developer Tools must continue working.

Coordinate mode should not interfere with marker interaction.

The temporary developer marker should continue functioning.

---

## Constraints

Do NOT implement:

Story navigation

Story cards

Search

Filtering

Marker clustering

Hover animations

Custom context menus

Editing markers

Backend functionality

---

# Acceptance Criteria

✓ npm run dev succeeds

✓ npm run build succeeds

✓ Every JSON location creates one marker

✓ Marker positions are correct

✓ Clicking a marker updates the sidebar

✓ Selected marker is visually distinct

✓ Camera smoothly centers selected marker

✓ Developer Mode still works

✓ No duplicate markers

✓ No console errors

✓ No memory leaks

---

# Deliverables

Expected modified files include:

components/Map/WorldMap.jsx

components/Map/MapMarker.jsx

components/App.jsx

components/Sidebar/Sidebar.jsx

styles/map.css

Utility modules for marker/icon management if appropriate.

---

# Completion Instructions

When finished:

1. Explain every modified file.

2. Explain how markers are generated.

3. Explain how React communicates with Leaflet.

4. Explain how the marker layer is organized.

5. Verify every acceptance criterion.

6. Update PROJECT_STATE.md.

7. Update project_context.md.

8. Replace NEXT_TASK.md only after successful completion.