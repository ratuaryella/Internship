const fetchTatanan = require('../../fetch/tatanan/tatanan')

const index = (req, res) => {
    let param = {
        active: 'tatanan',
        role: req.cookies.role,
        username: req.cookies.username
    }
  res.render('./pages/admin/tatanan', param);
}

const getAllTatanan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getAllTatanan(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getFullTatanan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getFullTatanan(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getTatananNama = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getTatananNama(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getNamaJenis = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getNamaJenis(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getNamaJenisKategori = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getNamaJenisKategori(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getNamaJenisKategoriIndikator = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getNamaJenisKategoriIndikator(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const createTatanan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.createTatanan(req)
    .then(responseJson => {
        if(responseJson.status == 201){
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const deleteTatanan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.deleteTatanan(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const getTatananById = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.getTatananById(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const editTatanan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.editTatanan(req)
    .then(responseJson => {
        if(statusCode.includes(responseJson.status)){
            res.json(responseJson);
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

module.exports = {
  index,
  getAllTatanan,
  createTatanan,
  deleteTatanan,
  getTatananById,
  editTatanan,
  getFullTatanan,
  getTatananNama,
  getNamaJenis,
  getNamaJenisKategori,
  getNamaJenisKategoriIndikator
}