/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY29jb250dXMiLCJhIjoiY2swYjZiamdqMG91ejNjcGlmcHVldzNicSJ9.iia35em7Mli7f1WQaM_pzg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cocontus/ck0b6lhsm33s51dmvm4y7vscd',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 4
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create the marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add popup
    new mapboxgl.Popup({
      offset: 30,
      duration: 3750
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}:${loc.description}</p>`)
      .addTo(map);

    // extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    },
    duration: 5000
  });
};
