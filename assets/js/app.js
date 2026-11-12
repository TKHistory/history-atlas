(() => {
  const events = window.HISTORY_EVENTS || [];
  const colors = { place: "#cf5968", battle: "#d07858" };
  const map = L.map("map", { zoomControl: false, scrollWheelZoom: true }).setView([28, 29], 2.15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);

  const list = document.getElementById("event-list");
  const count = document.getElementById("result-count");
  const mapCount = document.getElementById("map-caption-count");
  const search = document.getElementById("search-input");
  const typeFilter = document.getElementById("type-filter");
  const periodFilter = document.getElementById("period-filter");
  const markers = new Map();
  let selectedId = null;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  events.forEach((event) => {
    const marker = L.circleMarker(event.coordinates, {
      radius: event.type === "battle" ? 7 : 6,
      color: "#f4edda",
      weight: 1.5,
      fillColor: colors[event.type] || colors.place,
      fillOpacity: .95,
      className: "atlas-marker"
    });
    marker.bindPopup(
      '<div class="popup-title">' + escapeHtml(event.title) + '</div>' +
      '<div class="popup-meta">' + escapeHtml(event.date) + ' · ' + escapeHtml(event.location) + '</div>' +
      '<p>' + escapeHtml(event.summary) + '</p>' +
      '<a href="' + escapeHtml(event.sourceUrl) + '" target="_blank" rel="noreferrer">Source: ' + escapeHtml(event.sourceLabel) + ' ↗</a>'
    );
    marker.on("click", () => selectCard(event.id));
    markers.set(event.id, marker);
  });

  function matchesFilters(event) {
    const query = search.value.trim().toLowerCase();
    const text = [event.title, event.location, event.civilization, event.summary].join(" ").toLowerCase();
    return (!query || text.includes(query)) &&
      (typeFilter.value === "all" || event.type === typeFilter.value) &&
      (periodFilter.value === "all" || event.period === periodFilter.value);
  }

  function render() {
    const visible = events.filter(matchesFilters);
    list.replaceChildren();
    visible.forEach((event, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "event-card";
      card.dataset.type = event.type;
      card.dataset.id = event.id;
      card.style.setProperty("--card-index", index);
      card.setAttribute("aria-current", String(event.id === selectedId));
      card.setAttribute("aria-label", event.title + ", " + event.date + ", " + event.location);
      card.innerHTML =
        '<span class="card-index">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<span><span class="card-title">' + escapeHtml(event.title) + '</span>' +
        '<span class="card-place">' + escapeHtml(event.location) + ' · ' + escapeHtml(event.civilization) + '</span>' +
        '<span class="card-summary">' + escapeHtml(event.summary) + '</span></span>' +
        '<span class="card-date">' + escapeHtml(event.date) + '</span>';
      card.addEventListener("click", () => focusEvent(event, true));
      list.append(card);
      const marker = markers.get(event.id);
      if (!map.hasLayer(marker)) marker.addTo(map);
    });

    events.filter((event) => !visible.includes(event)).forEach((event) => {
      const marker = markers.get(event.id);
      if (map.hasLayer(marker)) map.removeLayer(marker);
    });
    count.textContent = visible.length + (visible.length === 1 ? " entry" : " entries");
    mapCount.textContent = String(visible.length).padStart(2, "0");
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No stories match those filters. Try another search.";
      list.append(empty);
    }
  }

  function selectCard(id) {
    selectedId = id;
    list.querySelectorAll(".event-card").forEach((card) => {
      card.setAttribute("aria-current", String(card.dataset.id === id));
    });
    markers.forEach((marker) => marker.getElement()?.classList.remove("is-selected"));
    markers.get(id)?.getElement()?.classList.add("is-selected");
  }

  function focusEvent(event, openPopup) {
    selectCard(event.id);
    map.setView(event.coordinates, Math.max(map.getZoom(), 5), { animate: true });
    if (openPopup) markers.get(event.id).openPopup();
  }

  [search, typeFilter, periodFilter].forEach((control) => control.addEventListener("input", render));
  [typeFilter, periodFilter].forEach((control) => control.addEventListener("change", render));
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && document.activeElement === search) {
      search.value = "";
      search.blur();
      render();
    }
  });

  render();
  window.addEventListener("load", () => map.invalidateSize());
})();
