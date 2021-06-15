const userServices = require('../services/services');
const getCurrentDate = require('../helper/current-date');

//Public Content
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
//User Content
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
//Admin Content
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
//Get All Users
  exports.getAll = (req, res) => {
    userServices.getAll(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/user/view/' ,
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                status: 404,
                message: `No Records Found with id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//Update User
exports.updateUser = (req, res) => {
  const currentDate = getCurrentDate();

  const dataUpdate = {
      id: req.query.id,
      nama: req.body.nama,
      nip: req.body.nip,
      no_HP: req.body.no_HP,
      password: req.body.password,
      username: req.body.username,
      email: req.body.email,
      updated_at: currentDate.dateAsiaJakarta,
      tableRoleId: req.body.tableRoleId
  }

  userServices.getById(dataUpdate.id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.updateUser(dataUpdate)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Update User',
                  dataUpdate: dataUpdate,
                  request: {
                      type: "PATCH",
                      url: "/user/update-user"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Update a User"
              });
          })
      } else {
          res.status(404).json({
              message: `Data not found with id ${dataUpdate.id}`
          });
      }
  })
  .catch(err => {
      res.status(500).json({
          error : err
      });
  });
}


//Delete User
exports.deleteUser = (req, res) => {
  const id = req.query.id;

  userServices.getById(id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.deleteUser(id)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Delete User',
                  id: id,
                  request: {
                      type: "PATCH",
                      url: "/user/delete-user"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Delete a User"
              });
          })
      } else {
          res.status(404).json({
              message: `Data not found with id ${id}`
          });
      }
  })
  .catch(err => {
      res.status(500).json({
          error : err
      });
  });
}


//GetUserById
exports.getById = (req, res, next) => {
  const id = req.query.id;
  userServices.getById(id)
  .then(docs => {
      if (docs.length > 0) {
          const response = {
              status: 'OK',
              message: 'Successfully Get By Id',
              data: docs,
              request: {
                  type: 'GET',
                  url: '/user/get-by-id'
              }
          }

          res.status(200).json(response);
      } else {
          res.status(404).json({
              message: `Data not found with id ${id}`
          });
      }
  })
}

//Get All Roles
exports.getAllRole = (req, res) => {
    userServices.getAllRole(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/role/viewRole/' ,
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                status: 404,
                message: `No Records Found with id: ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


//Delete Roles
exports.deleteRole = (req, res) => {
  const id = req.query.id;

  userServices.getRoleById(id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.deleteRole(id)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Delete Role',
                  id: id,
                  request: {
                      type: "PATCH",
                      url: "/role/delete-role"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Delete a Role"
              });
          })
      } else {
          res.status(404).json({
              message: `Data not found with id ${id}`
          });
      }
  })
  .catch(err => {
      res.status(500).json({
          error : err
      });
  });
}

//Create Role
exports.createRole = (req, res) => {
    const currentDate = getCurrentDate();

    const dataRole = {
        role_name: req.body.role_name,
        created_at: currentDate.dateAsiaJakarta
    }

    userServices.createRole(dataRole)
    .then(() => {
        res.status(201).json({
            status: 'Created',
            message: 'Successfully Created Role',
            dataRole: dataRole,
            request: {
                type: "POST",
                url: "/role/create-role"
            }
        }); 
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}
