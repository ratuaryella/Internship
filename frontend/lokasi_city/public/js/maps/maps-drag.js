$(document).ready(function () {
    var position;
    let mapCity = new L.map('map-city', {
      zoomControl:false,
      attributionControl: false
    });
    mapCity.setView([3.6169589,98.6663069], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapCity);
    
    // let streetTileLayerMapbox = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    // L.tileLayer(streetTileLayerMapbox, {
    //     maxZoom: 18,
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    // }).addTo(mapCity);

    var geocodeService = L.esri.Geocoding.geocodeService({
    apikey:  "AAPKab65d9071426499190536a77d4ede351Emt4P1pzL4fqPpgw8RhDpldh4zD4d_FAP_MAH0otAqoRxhoU7UX5ATwGUGhBElUh"
  });

  mapCity.on('click', function (e) {
    geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
      if (error) {
        return;
      }

      L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
    });
  });
  
    // function onMapClick(e) {
    //   mapCity.off('click', onMapClick);
    //   marker = new L.marker(e.latlng, {draggable:'true'});
    //   marker.on('dragend', function(event){
    //     var marker = event.target;
    //     var position = marker.getLatLng();
    //     marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    //     mapCity.panTo(new L.LatLng(position.lat, position.lng));
    //     marker.bindPopup('LatLng: ' + marker.getLatLng()).openPopup();
    //   });
    //   marker.on('dragend', function (e) {
    //   document.getElementById('latitude').value = marker.getLatLng().lat;
    //   document.getElementById('longitude').value = marker.getLatLng().lng;
    //   });
    //   mapCity.addLayer(marker);
  
    // };
    
    // mapCity.on('click', onMapClick)
    
  });
  