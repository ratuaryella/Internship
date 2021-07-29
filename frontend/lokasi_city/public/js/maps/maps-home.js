$(document).ready(async function () {
  
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


$('#btn-search-poi').on('click', function() {
  let idKec = $('#select-kecamatan').val();
  console.log("🚀 ~ file: maps-home.js ~ line 100 ~ $ ~ idKec", idKec)
  let idDesa = $('#select-desa').val();
  console.log("🚀 ~ file: maps-home.js ~ line 102 ~ $ ~ idDesa", idDesa)
});