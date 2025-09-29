// map_demo/js/lib/map-helpers.js
window.mapHelpers = window.mapHelpers || {};

window.mapHelpers.addGeoJsonLine = async function addGeoJsonLine(map, {
  id,
  url,
  paint = { 'line-color': '#00FFFF', 'line-width': 4 },
  beforeId = undefined,
  fitToData = true,
  padding = 60
} = {}) {
  try {
    const res = await fetch(url || (window.CONFIG?.GEOJSON_URL || './assets/geo/converted_map.geojson'));
    if (!res.ok) throw new Error(`HTTP ${res.status} while fetching ${url}`);
    const data = await res.json();

    if (!data || (data.type !== 'FeatureCollection' && data.type !== 'Feature')) {
      throw new Error('Not a valid GeoJSON (Feature/FeatureCollection)');
    }

    if (!map.getSource(id)) {
      map.addSource(id, { type: 'geojson', data, lineMetrics: true });
    } else {
      map.getSource(id).setData(data);
    }

    const layerId = `${id}-line`;
    if (!map.getLayer(layerId)) {
      map.addLayer({ id: layerId, type: 'line', source: id, paint }, beforeId);
    }

    if (fitToData && typeof turf?.bbox === 'function') {
      const bbox = turf.bbox(data);
      map.fitBounds(bbox, { padding, duration: 0 });
    }
  } catch (err) {
    console.error('[addGeoJsonLine] failed:', err);
    // alert można wyłączyć, żeby nie wyskakiwało okno przy 404 itp.
  }
};
