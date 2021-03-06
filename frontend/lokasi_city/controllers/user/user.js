const fetchUser = require('../../fetch/user/user')

const index = (req, res) => {
    let param = {
        active: 'home',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/admin/datauser', param);
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

const getAllRoles = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.getAllRoles(req)
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
        if(responseJson.status == 201){
        } else {
            return false; 
        }
    }).catch(error =>{
        console.log(error);
    })
}

const deleteUser = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.deleteUser(req)
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

const getUserById = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.getUserById(req)
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

const getUserByIdLogin = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.getUserByIdLogin(req)
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

const editUser = (req, res) => {
    const statusCode = [200, 201, 400, 401, 403, 404, 500];
    return fetchUser.editUser(req)
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
  getAllRoles,
  createUser,
  deleteUser,
  getUserById,
  getUserByIdLogin,
  editUser
}