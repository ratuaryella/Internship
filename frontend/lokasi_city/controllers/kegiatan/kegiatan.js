const fetchKegiatan = require('../../fetch/tatanan/tatanan')
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

const createKegiatan = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchTatanan.createKegiatan(req)
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
    createKegiatan
}