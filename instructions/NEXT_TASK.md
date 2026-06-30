# Current Task

## Phase 4 - Leaflet Foundation

### Goal

Replace the placeholder map with a fully functional Leaflet implementation using an image overlay.

The map should support navigation (zooming and panning) but should not yet render interactive markers.

This phase establishes the permanent map engine that future phases will build upon.

---

# Requirements

## Leaflet Integration

Implement Leaflet directly.

Do NOT use react-leaflet.

Use the official Leaflet API.

Leaflet should be initialized inside React.

The map instance must only be created once.

Destroy the map instance correctly when the component unmounts.

---

## CRS

Configure Leaflet to use:

CRS.Simple

This project uses image coordinates.

It is NOT a geographic map.

Do not use latitude/longitude.

Do not use OpenStreetMap.

Do not use Mapbox.

---

## Image Overlay

Display a large fantasy map image.

The image should come from the project's assets.

Requirements:

- preserve aspect ratio
- responsive
- fills available map space
- image overlay only

The image dimensions should be configurable instead of hardcoded throughout the codebase.

---

## Navigation

Support:

Mouse wheel zoom

Trackpad zoom

Drag to pan

Double click zoom

Touch gestures

The map should feel smooth.

---

## Zoom Limits

Provide sensible defaults.

Prevent zooming infinitely far in or out.

The entire map should be viewable.

---

## Resize Handling

The map must correctly resize when:

- browser size changes
- sidebar width changes in future phases

Do not allow rendering glitches.

---

## Styling

Replace the placeholder styles.

The map should fill its container.

Leaflet controls should match the dark fantasy theme where reasonably possible using CSS.

---

## Architecture

Create reusable helper functions if needed.

Avoid mixing Leaflet initialization logic with future marker logic.

The map engine should be easy to extend.

---

# Constraints

Do NOT implement:

Markers

Sidebar integration

Story links

FlyTo

Popup windows

Search

Animations

Location selection

Anything related to application state

This phase is only about building the map engine.

---

# Acceptance Criteria

✓ npm run dev

✓ npm run build

✓ World image displays

✓ Mouse wheel zoom works

✓ Drag works

✓ Double-click zoom works

✓ Touch gestures work

✓ Window resizing works

✓ No console errors

✓ No memory leaks

✓ Leaflet instance destroyed correctly

---

# Deliverables

Expected modifications include:

components/Map/WorldMap.jsx

styles/map.css

Any helper modules required for Leaflet initialization

---

# Completion Instructions

When finished:

1. Explain every file modified.

2. Explain how CRS.Simple works in this project.

3. Explain how image coordinates relate to future marker placement.

4. Verify all acceptance criteria.

5. Update AI_CONTEXT.md.

6. Replace NEXT_TASK.md after successful completion only.