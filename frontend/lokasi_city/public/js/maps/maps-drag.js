$(document).ready(function () {
    var position;
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
  
    function onMapClick(e) {
      mapCity.off('click', onMapClick);
      marker = new L.marker(e.latlng, {draggable:'true'});
      marker.on('dragend', function(event){
        var marker = event.target;
        var position = marker.getLatLng();
        marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
        mapCity.panTo(new L.LatLng(position.lat, position.lng));
        marker.bindPopup('LatLng: ' + marker.getLatLng()).openPopup();
      });
      mapCity.addLayer(marker);
  
    };
    
    mapCity.on('click', onMapClick)
    
  });
  