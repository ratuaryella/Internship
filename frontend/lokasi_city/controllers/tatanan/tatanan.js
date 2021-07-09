const fetchTatanan = require('../../fetch/tatanan/tatanan')
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

module.exports = {
    getAllTatanan
}