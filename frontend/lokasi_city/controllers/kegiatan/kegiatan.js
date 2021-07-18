const fetchKegiatan = require('../../fetch/kegiatan/kegiatan')
const getAllKegiatan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchKegiatan.getAllKegiatan(req)
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

const getKegiatanById = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchKegiatan.getKegiatanById(req)
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
    getAllKegiatan,
    getKegiatanById
}