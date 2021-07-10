const fetch = require('node-fetch');
const config = require('.././../config');

// GET ALL ADMINITRASI
const getAllKecamatan = (req) => {
  let queryParams = new URLSearchParams(req.query).toString();
  return fetch(`${config.API_URL_BVT}:4002/api/pu/maps/v1.0/get-kecamatan?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Beaerer ${req.query.user_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'UTF-8'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  });
}

const getAllDesa = (req) => {
  let queryParams = new URLSearchParams(req.query).toString();
  return fetch(`${config.API_URL_BVT}:4002/api/pu/maps/v1.0/get-desa?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Beaerer ${req.query.user_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'UTF-8'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  });
}

// GET GEOMETRI ADMINISTRASI
const getKecamatanGeometri = (req) => {
  let queryParams = new URLSearchParams(req.query).toString();
  return fetch(`${config.API_URL_BVT}:4002/api/pu/maps/v1.0/geom/get-kecamatan?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Beaerer ${req.query.user_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'UTF-8'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  });
}

const getDesaGeometri = (req) => {
  let queryParams = new URLSearchParams(req.query).toString();
  return fetch(`${config.API_URL_BVT}:4002/api/pu/maps/v1.0/geom/get-desa?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Beaerer ${req.query.user_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Charset': 'UTF-8'
    }
  }).then(response => {
    return response.json();
  }).then(responseJson => {
    return responseJson;
  });
}

module.exports = {
  getAllKecamatan,
  getAllDesa,
  getKecamatanGeometri,
  getDesaGeometri
}