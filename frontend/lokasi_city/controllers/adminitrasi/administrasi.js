const fetchAdministrasi = require('../../fetch/administrasi/administrasi');

// GET ALL ADMINISTRASI
const getAllKecamatan = async (req, res) => {
  return await fetchAdministrasi.getAllKecamatan(req)
  .then(responseJson => {
    res.json(responseJson);
  }).catch(error => {
    console.log(error);
  });
}

const getAllDesa = async (req, res) => {
  return await fetchAdministrasi.getAllDesa(req)
  .then(responseJson => {
    res.json(responseJson);
  }).catch(error => {
    console.log(error);
  });
}

// GET GEOMETRI ADMINISTRASI
const getKecamatanGeometri = async (req, res) => {
  return await fetchAdministrasi.getKecamatanGeometri(req)
  .then(responseJson => {
    res.json(responseJson);
  }).catch(error => {
    console.log(error);
  });
}

const getDesaGeometri = async (req, res) => {
  return await fetchAdministrasi.getDesaGeometri(req)
  .then(responseJson => {
    res.json(responseJson);
  }).catch(error => {
    console.log(error);
  });
}

module.exports = {
  getAllKecamatan,
  getAllDesa,
  getKecamatanGeometri,
  getDesaGeometri
}