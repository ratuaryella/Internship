let mapCity;
$(document).ready(async function () {
  
  mapCity = new L.map('map-city', {
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

let dropdownKecamatan = $('#select-kecamatan');
dropdownKecamatan.html('<option></option>');

let dropdownDesa = $('#select-desa');
dropdownDesa.html('<option></option>');

dropdownDesa.select2({
  placeholder: 'Pilih Desa',
});

dropdownKecamatan.select2({
  placeholder: 'Pilih Kecamatan',
	ajax: {
    url: '/get-kecamatan?kodeprov=12&kodekabkot=75&page=1',
    dataType: 'json',
    type: 'GET',
    delay : 250,
    data: function (params) {
      return {        
        page: params.page
      };
    },
    processResults(data, params) {
      params.page = params.page || 1;
      
      return {
        results: $.map(data.results, function (item) {
          return {
            text: item.namakec,
            id: item.kodekec,
          }
        }),
        // results: data.results,
        // pagination: {
        //   more: params.page < parseInt(data.total)
        // }
      }
    },
  },
});

dropdownKecamatan.on('change', function() {
  let valueKecSelected = $('#select-kecamatan').val();
  dropdownDesa.select2({
    placeholder: 'Pilih Desa',
    ajax: {
      url: `/get-desa?kodeprov=12&kodekabkot=75&kodekec=${valueKecSelected}&page=1`,
      dataType: 'json',
      type: 'GET',
      delay : 250,
      data: function (params) {
        return {        
          page: params.page
        };
      },
      processResults(data, params) {
        params.page = params.page || 1;
        
        return {
          results: $.map(data.results, function (item) {
            return {
              text: item.namadesa,
              id: item.kodedesa,
            }
          }),
          // results: data.results,
          // pagination: {
          //   more: params.page < parseInt(data.total)
          // }
        }
      },
    },
  });
});

let empty  = [undefined, null, ""];

$('#btn-search-poi').on('click', function() {
  let idKec = $('#select-kecamatan').val();
  let idDesa = $('#select-desa').val();
  let namePoi = $('#poi-name').val();
  
  if(empty.includes(idKec) || empty.includes(idDesa) || empty.includes(namePoi)) {
    if (empty.includes(idKec)) {
      swal({
        title: "Opps...",
        text: "Mohon select kecamatan",
        icon: "warning",
        buttons: false,
        timer: 1000
      });
    } else if (empty.includes(idDesa)) {
      swal({
        title: "Opps...",
        text: "Mohon select desa",
        icon: "warning",
        buttons: false,
        timer: 1000
      });
    } else if (empty.includes(namePoi)) {
      swal({
        title: "Opps...",
        text: "Mohon isi nama POI",
        icon: "warning",
        buttons: false,
        timer: 1000
      });
    }     
  } 

  if(!empty.includes(idKec) && !empty.includes(idDesa) && !empty.includes(namePoi)) {
    let kodepodes = `1275${idKec}${idDesa}`;
    let objDataPoi = Object.assign({
      podes: parseInt(kodepodes),
      orderby: "category",
      idcategory: [],
      idsubcategory: [],
      limit: 1000,
      name:namePoi,
      use_page: 20,
      page: 1
    });
    removeLayerById('dataLayerPoiRegion');
    getPoiRegion(objDataPoi);
  }

});

function removeLayerById(id) {
  mapCity.eachLayer(function (layer) {
    if (layer.id == id) {
    mapCity.removeLayer(layer);
    }
  });
}

let customIcon = L.icon({
  iconUrl: '/images/icons/green.png',
  iconSize: [40, 50],
});

let getPoiRegion = (objBody) => {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    url: '/get-poi-region',
    data: JSON.stringify(objBody),
    success: function (data) {
      if (data.message == "no POI") {
        swal({
          title: "Opps...",
          text: `Opps - ${data.message}`,
          icon: "warning",
          buttons: false,
          timer: 1000
        });
      } else if (data.message == "over POI limit") {
        swal({
          title: "Opps...",
          text: `Opps - ${data.message}`,
          icon: "warning",
          buttons: false,
          timer: 1000
        });
      } else {
        var dataLayer = L.geoJson(data, {
          pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: customIcon });
            return marker;
          },
          onEachFeature: function(feature, featureLayer, latlng) {
            featureLayer.bindPopup('' +
            '<div>'+
            '<div><h3 style="font-size: 15px; font-weight: bold;">Deskripsi POI</h3></div>' +
            '<table class="table table-responsive table-striped">' +
            '<tr><td>Alamat Merchant<td>:</td><th>' + feature.properties.alamat_merchant + '</th></tr>' +
            '<tr><td>Category<td>:</td><th>' + feature.properties.category + '</th></tr>' +
            '<tr><td>Nama Brand<td>:</td><th>' + feature.properties.nama_brand + '</th></tr>' +
            '<tr><td>Nama Merchant<td>:</td><th>' + feature.properties.nama_merchant + '</th></tr>' +
            '<tr><td>Nama Kecamatan<td>:</td><th>' + feature.properties.nama_kecamatan + '</th></tr>' +
            '<tr><td>Nama Desa<td>:</td><th>' + feature.properties.nama_desa + '</th></tr>' +
            '</table>'+
            '</div>');
          }
        });
        dataLayer.id = 'dataLayerPoiRegion';
        dataLayer.addTo(mapCity);
        mapCity.fitBounds(dataLayer.getBounds());
      }      
    }
  });
}