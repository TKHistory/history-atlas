# History Atlas

An interactive atlas for exploring historical places and events.

## First version

- Browse a small set of historical places and events on an interactive map.
- Search by name, location, civilization, or description.
- Filter by event type and broad historical period.
- Select a card to focus the map on that location.

## Run it

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Keep an internet connection on so Leaflet and the map tiles can load.

There is no build step or package installation. GitHub Pages can publish the same static files from the `main` branch.

## Project structure

```text
index.html
assets/
  css/styles.css
  js/app.js
  data/events.js
```

Historical entries live in `assets/data/events.js`. Each entry has a short summary, date, category, coordinates, and a reference link.

## Map and attribution

The map uses [Leaflet](https://leafletjs.com/) and standard tiles from [OpenStreetMap](https://www.openstreetmap.org/). Keep the visible OpenStreetMap attribution on the map. The public tile service is intended for normal interactive viewing and has [usage requirements](https://operations.osmfoundation.org/policies/tiles/).

## Next steps

- Expand and review the historical dataset.
- Add a timeline control and richer period filters.
- Improve accessibility and mobile layouts.
- Publish the project with GitHub Pages.
