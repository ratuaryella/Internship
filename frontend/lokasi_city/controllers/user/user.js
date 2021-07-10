const fetchUser = require('../../fetch/user/user')

const index = (req, res) => {
  res.render('./pages/admin/datauser');
}

const getAllUsers = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.getAllUsers(req)
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

const createUser = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.createUser(req)
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
  getAllUsers,
  createUser
}