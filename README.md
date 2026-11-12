# History Atlas

An interactive atlas for exploring historical places and events.

[Open the live atlas](https://tkhistory.github.io/history-atlas/).

## First version

- Browse 12 source-linked historical places and events on an interactive map.
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

Historical entries live in `assets/data/events.js`. Each entry has a short summary, date, category, coordinates, and a reference link. Battlefield pins are marked approximate because historical battle sites can cover broad or disputed areas. Summaries use neutral language and distinguish traditional dates from established dates where relevant.

## Map and attribution

The map uses [Leaflet](https://leafletjs.com/) and standard tiles from [OpenStreetMap](https://www.openstreetmap.org/). Keep the visible OpenStreetMap attribution on the map. The public tile service is intended for normal interactive viewing and has [usage requirements](https://operations.osmfoundation.org/policies/tiles/).

## Next steps

- Add region and civilization filters.
- Add a year slider and compare events across periods.
- Expand to cities, routes, rulers, and campaign maps with source links.
- Improve accessibility and mobile layouts.
