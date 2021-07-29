const UserServices = require('../services/users');
const TokenServices = require('../services/token');
const getCurrentDate = require('../helper/current-date');
const config = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const currentDate = getCurrentDate();
const globalVariable = require('../helper/globalVarible');


// Authentication
// Do Login
const doLogin = (req, res, next) => {
    const username = req.body.username;
    UserServices.checkUsername(username)
    .then(data => {
        let user = data[0];
        if (data.length < 1) {
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        
        if (user.status == false) {
            return res.status(401).json({
                message: 'Your account has been disabled. Please contact admin to reactive again!'
            });            
        }

        bcrypt.compare(req.body.password, user.password, async function (err, result) {
            
            if (result) {
                const payloadToken = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mobile_number: user.mobile_number,
                    status: user.status,
                    kode_wilayah: user.kode_wilayah,
                    created_at: user.created_at,
                    created_by: user.created_by,
                    role: user.role
                };

                const token = jwt.sign(payloadToken, config.JWT_KEY, { expiresIn: config.JWT_TOKENLIFE });

                const insertToken = {
                    id_user: user.id,
                    token: token,
                    status_is_valid: 1,
                    created_at: currentDate.dateAsiaJakarta
                }

                await TokenServices.createUpdate(user.id, insertToken);

                const response = {
                    message: 'Auth Successfully',
                    username: user.username,
                    id: user.id,
                    role: user.role,
                    token: token,
                    request: {
                        type: 'POST',
                        url: '/login'
                    }
                }

                return res.status(200).json(response);
                
            }

            res.status(401).json({
                message: 'Auth Failed'
            });
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

// Check Token
const checkToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    TokenServices.checkToken(token)
    .then(data => {
        if (data.length > 0) {
            res.status(200).json({
                data: data,
                request: {
                    type: 'GET',
                    url: '/check-token'
                }
            });
        } else {
            res.status(401).json({
                message: 'Unauthorized!'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    })
}

// Do Logout
const doLogout = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    TokenServices.changeStatus(token)
    .then(data => {
        if (data > 0) {
            res.status(200).json({
                message: 'Logout Successfully!',
                request: {
                    type: 'POST',
                    url: '/logout',
                }
            });
        } else {
            return res.status(401).json({
                message: 'Invalid Token!'
            });
        }
    }).catch(err => {
        return res.status(500).json({
            error: err,
        });
    });
}

// Create User
const createUser = async (req, res, next) => {
    try {
        const currentDate = getCurrentDate();

        if (req.userData.role.id == globalVariable.ROLE_ADMIN) {

            const dataInsert = {
                id_role: req.body.id_role,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.password_confirmation,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobile_number: req.body.mobile_number,
                status: req.body.status,
                kode_wilayah: req.body.kode_wilayah,
                created_at: currentDate.dateAsiaJakarta,
                created_by: req.userData.id
            }
    
            let userHasRegistered = await UserServices.checkUserRegistered(req);
    
            if (userHasRegistered.length > 0) {
                if(
                    userHasRegistered[0].username == dataInsert.username &&
                    userHasRegistered[0].email == dataInsert.email
                ) {
                    return res.status(400).json({
                        status: 'Bad Request',
                        message: `Email : ${userHasRegistered[0].email} and Username : ${userHasRegistered[0].username} has been registered`
                    });
                } else if (userHasRegistered[0].email == dataInsert.email) {
                    return res.status(400).json({
                        status: 'Bad Request',
                        message: `Email : ${userHasRegistered[0].email} has been registered`
                    });
                } else if (userHasRegistered[0].username == dataInsert.username) {
                    return res.status(400).json({
                        status: 'Bad Request',
                        message: `Username : ${userHasRegistered[0].username} has been registered`
                    });
                }
            } else {
                if (dataInsert.password !== req.body.password_confirmation) {
                    return res.status(400).json({
                        status: 'Bad Request',
                        message: `Password confirmation doesn't match with Password`,
                      });
                } else {
                    bcrypt.hash(dataInsert.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                status: 'Internal Server Error',
                                message: err
                            });
                        } else {
                            dataInsert.password = hash;
                            UserServices.createUser(dataInsert)
                            .then(data => {
                                res.status(201).json({
                                    message: 'User Created',
                                    data,
                                    request: {
                                        type: 'POST',
                                        url: '/create-user'
                                    }
                                });
                            }).catch(err => {
                                next(err);
                            });
                        }
                    });
                }
            }
            
        } else {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'Only admin can access!'
            });
        }

    } catch (err) {
        next(err);
    }
}

// Get All Users
const getAllUser = (req, res, next) => {
    try {

        if (req.userData.role.id == globalVariable.ROLE_ADMIN) {
            UserServices.getAllUser(req)
            .then(docs => {
                if (docs.data.rows.length > 0) {
                    const response = {
                        total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        currentPage: docs.pagination.currentPage,
                        totalPages: Math.ceil(docs.data.count / 10),
                        results: docs.data.rows.map((doc) => {
                            return {
                                id: doc.id,
                                email: doc.email,
                                username: doc.username,
                                firstname: doc.firstname,
                                lastname: doc.lastname,
                                mobile_number: doc.mobile_number,
                                status: doc.status,
                                kode_wilayah: doc.kode_wilayah,
                                created_at: doc.created_at,
                                created_by: doc.created_by,
                                role: doc.role,
                            };
                        }),
                        request: {
                        type: 'GET',
                        url: '/get-all-users',
                        },
                    };
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'No records found'
                    });
                }
            }).catch(err => {
                next(err);
            });            
        } else {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'Only admin can access!'
            });
        }
    } catch(err) {
        next(err);
    }
}

// Get Detail Users
const getDetailUser = (req, res, next) => {
    const id = req.query.id;
    try {

        if (req.userData.id == id || req.userData.role.id == globalVariable.ROLE_ADMIN || req.userData.role.id == globalVariable.ROLE_USER || req.userData.role.id == globalVariable.ROLE_UMUM) {

            UserServices.getDetailUser(id)
            .then(docs => {
                if (docs.length > 0) {
                    const response = {
                        data: docs.map(doc => {
                            return {
                                id: doc.id,
                                email: doc.email,
                                username: doc.username,
                                firstname: doc.firstname,
                                lastname: doc.lastname,
                                password: doc.password,
                                mobile_number: doc.mobile_number,
                                status: doc.status,
                                kode_wilayah: doc.kode_wilayah,
                                created_at: doc.created_at,
                                created_by: doc.created_by,
                                role: doc.role,
                            }
                        }),
                        request: {
                            type: 'GET',
                            url: `/detail-user?id=${id}`
                        }
                    }
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: `Can't find User with id: ${id}`
                    });
                }
            })
            .catch(err => {
                next(err);
            });
            
        } else {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'You cannot see detail another user!'
            });
        }
    } catch(err) {
        next(err);
    }

}

// Delete User
const deleteUser = async (req, res, next) => {
    try {
        const id = req.query.id;
        const currentDate = getCurrentDate();
        
        if (req.userData.role.id == globalVariable.ROLE_ADMIN) {

            let detailUser = await UserServices.getDetailUser(id);
            if (detailUser.length > 0) {
                const deleteData = {
                    deleted_at: currentDate.dateAsiaJakarta,
                    status: 0,
                    deleted_by: req.userData.id
                };
                const deleteUser = await UserServices.deleteUser(id, deleteData);
                const response = {
                    message: `Successfully Deleted User with id: ${id}`,
                    totalDeleted: deleteUser[0],
                    request: {
                        type: 'PATCH',
                        url: `/delete-user?id=${id}`
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: `Can't find User with id: ${id}`
                });
            }
            
        } else {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'Only admin can access!'
            });
        }
    } catch (err) {
        next(err);
    }
}

//Update Kegiatan
const updateUser = async (req, res, next) => {
    try{
      const currentDate = getCurrentDate();
      const id = req.query.id;
  
      if (req.userData.id == id || req.userData.role.id == globalVariable.ROLE_ADMIN || req.userData.role.id == globalVariable.ROLE_USER || req.userData.role.id == globalVariable.ROLE_UMUM)  {

      let detailUser = await UserServices.getDetailUser(id);
      if (detailUser.length > 0) {
        const updateDataUser = {
          id: req.query.id,
          email: req.body.email,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: req.body.password,
          mobile_number: req.body.mobile_number,
          status: req.body.status,
          kode_wilayah: req.body.kode_wilayah
        };
        bcrypt.hash(updateDataUser.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    status: 'Internal Server Error',
                    message: err
                });
            } else {
                updateDataUser.password = hash;
                const updateUser = UserServices.updateUser(id, updateDataUser);
                const response = {
                    message: `Successfully Updated Kegiatan with id: ${id}`,
                    totalUpdated: updateUser[0],
                    request: {
                        type: 'PATCH',
                        url: `/update-user?id=${id}`
                      }
                };
                    res.status(200).json(response);
            }
        })
    }
    else {
        res.status(404).json({
            message: `Can't find Kegiatan with id: ${id}`
                });
            }
        }
        else {
              return res.status(403).json({
                  status: 'Forbidden',
                  message: 'Only registered users can access!'
              });
          }
      } catch (err) {
          next(err);
      }
  }

module.exports = {
    doLogin,
    checkToken,
    doLogout,
    createUser,
    getAllUser,
    getDetailUser,
    deleteUser,
    updateUser
}