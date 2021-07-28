$(document).ready(function () {
  
  let mapCity = new L.map('map-city', {
    zoomControl:false,
    attributionControl: false
  });
  mapCity.setView([3.6169589,98.6663069], 13);
  
  let streetTileLayerMapbox = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  L.tileLayer(streetTileLayerMapbox, {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(mapCity);
});
