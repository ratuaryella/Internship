const userServices = require('../services/services');
const getCurrentDate = require('../helper/current-date');

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
exports.getAll = (req, res) => {
    userServices.getAll(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/api/test/view/' ,
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
                      url: "/api/test/update-user"
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
                      url: "/api/test/delete-user"
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
                  url: '/api/test/get-by-id'
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

