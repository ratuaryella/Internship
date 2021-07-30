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

    // var marker = L.marker([3.22227, 4.35247]).addTo(mapCity);

    $.ajax({
        type: "GET",
        url: '/api-v1/intern/get-full-kegiatan',
        //headers: {
        //Authorization: 'Bearer ' + localStorage.getItem('token') },
        dataType: 'JSON',
        success: function(data) {
            console.log(data, "ini data kegiatan")
            let dataCoba = data.data.results;

            $.each(dataCoba, (i, value) => {
                console.log(value, "ini value")
                var marker = L.marker([value.latitude, value.longitude]).addTo(mapCity);
                if(value.gambar == undefined){
                  marker.bindPopup(
                    '<img src=https://cima-afrique.org/cima/images/not-available.png alt= ' + value.nama_kegiatan + ' width="300" height="180"></img>'
                    + '<br><br>'
                    + '<h6>' + value.nama_kegiatan + '</h6>'
                    + '<span><i class="fas fa-calendar-alt"></i>'+ "  " + value.tanggal_kegiatan +'</span>',
                {
                    maxWidth : 300
                });
                }else{
                  marker.bindPopup(
                    '<img src=' + value.gambar + ' alt= ' + value.nama_kegiatan + ' width="300" height="150"></img>'
                    + '<br><br>'
                    + '<h6>' + value.nama_kegiatan + '</h6>'
                    + '<span><i class="fas fa-calendar-alt"></i>'+ "  " + value.tanggal_kegiatan +'</span>',
                {
                    maxWidth : 300
                });
                }
                
          });   
        },
            error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
            }
    })
    
  });
  