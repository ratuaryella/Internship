const userServices = require('../services/services');
const getCurrentDate = require('../helper/current-date');
const db = require("../models");
const Kegiatan = db.kegiatan;

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
};

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
};

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
};

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
};

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
};

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
};

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
};

//Create Tatanan
exports.createTatanan = (req, res) => {
    const currentDate = getCurrentDate();

    const dataTatanan = {
        nama_tatanan: req.body.nama_tatanan,
        jenis_indikator: req.body.jenis_indikator,
        kategori: req.body.kategori,
        nama_indikator: req.body.nama_indikator,
        subindikator: req.body.subindikator,
        created_at: currentDate.dateAsiaJakarta
    }

    userServices.createTatanan(dataTatanan)
    .then(() => {
        res.status(201).json({
            status: 'Created',
            message: 'Successfully Created Tatanan',
            dataTatanan: dataTatanan,
            request: {
                type: "POST",
                url: "/tatanan/create-tatanan"
            }
        }); 
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
};

//Get All Tatanan
exports.getTatanan = (req, res) => {
    userServices.getTatanan(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/tatanan/viewTatanan/' ,
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

//Update Tatanan
exports.updateTatanan = (req, res) => {
  const currentDate = getCurrentDate();

  const dataTatanan = {
      id: req.query.id,
      nama_tatanan: req.body.nama_tatanan,
      jenis_indikator: req.body.jenis_indikator,
      kategori: req.body.kategori,
      nama_indikator: req.body.nama_indikator,
      subindikator: req.body.subindikator,
      updated_at: currentDate.dateAsiaJakarta
  }

  userServices.getTatananById(dataTatanan.id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.updateTatanan(dataTatanan)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Update Tatanan',
                  dataTatanan: dataTatanan,
                  request: {
                      type: "PATCH",
                      url: "/tatanan/update-tatanan"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Update a Tatanan"
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

//Delete Tatanan
exports.deleteTatanan = (req, res) => {
  const id = req.query.id;

  userServices.getTatananById(id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.deleteTatanan(id)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Delete Tatanan',
                  id: id,
                  request: {
                      type: "PATCH",
                      url: "/tatanan/delete-tatanan"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Delete a Tatanan"
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

//Get Tatanan By Id
exports.getTatananById = (req, res, next) => {
  const id = req.query.id;
  userServices.getTatananById(id)
  .then(docs => {
      if (docs.length > 0) {
          const response = {
              status: 'OK',
              message: 'Successfully Get Tatanan By Id',
              data: docs,
              request: {
                  type: 'GET',
                  url: '/tatanan/get-by-id'
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

//Create Kegiatan
exports.createKegiatan = (req, res) => {
    const currentDate = getCurrentDate();

    const dataKegiatan = {
        tableTatananId: req.body.tableTatananId,
        nama_kegiatan: req.body.nama_kegiatan,
        nama_tatanan: req.body.nama_tatanan,
        jenis_indikator: req.body.jenis_indikator,
        kategori: req.body.kategori,
        nama_indikator: req.body.nama_indikator,
        subindikator: req.body.subindikator,
        pelaksana: req.body.pelaksana,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        deskripsi: req.body.deskripsi,
        gambar: req.body.gambar,
        tableUserId: req.body.tableUserId,
        created_at: currentDate.dateAsiaJakarta
    }

    userServices.createKegiatan(dataKegiatan)
    .then(() => {
        res.status(201).json({
            status: 'Created',
            message: 'Successfully Created Kegiatan',
            dataKegiatan: dataKegiatan,
            request: {
                type: "POST",
                url: "/Kegiatan/create-Kegiatan"
            }
        }); 
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
};

//Get All Kegiatan
exports.getKegiatan = (req, res) => {
    userServices.getKegiatan(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/Kegiatan/viewKegiatan/' ,
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

//Update Kegiatan
exports.updateKegiatan = (req, res) => {
  const currentDate = getCurrentDate();

  const dataKegiatan = {
      id: req.query.id,
      tableTatananId: req.body.tableTatananId,
      nama_kegiatan: req.body.nama_kegiatan,
      nama_tatanan: req.body.nama_tatanan,
      jenis_indikator: req.body.jenis_indikator,
      kategori: req.body.kategori,
      nama_indikator: req.body.nama_indikator,
      subindikator: req.body.subindikator,
      pelaksana: req.body.pelaksana,
      tanggal_kegiatan: req.body.tanggal_kegiatan,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      deskripsi: req.body.deskripsi,
      gambar: req.body.gambar,
      tableUserId: req.body.tableUserId,
      updated_at: currentDate.dateAsiaJakarta
  }

  userServices.getKegiatanById(dataKegiatan.id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.updateKegiatan(dataKegiatan)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Update Kegiatan',
                  dataKegiatan: dataKegiatan,
                  request: {
                      type: "PATCH",
                      url: "/Kegiatan/update-Kegiatan"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Update a Kegiatan"
              });
          })
      } else {
          res.status(404).json({
              message: `Data not found with id ${dataKegiatan.id}`
          });
      }
  })
  .catch(err => {
      res.status(500).json({
          error : err
      });
  });
}

//Delete Kegiatan
exports.deleteKegiatan = (req, res) => {
  const id = req.query.id;

  userServices.getKegiatanById(id)
  .then(docs => {  
      if(docs.length > 0) {
          userServices.deleteKegiatan(id)
          .then(() => {
              res.status(200).json({
                  message: 'Successfully Delete Kegiatan',
                  id: id,
                  request: {
                      type: "PATCH",
                      url: "/Kegiatan/delete-Kegiatan"
                  }
              });
          })
          .catch(err => {
              res.status(500).json({
                  message: "Failed Delete a Kegiatan"
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


//Get Kegiatan By Id
exports.getKegiatanById = (req, res, next) => {
  const id = req.query.id;
  userServices.getKegiatanById(id)
  .then(docs => {
      if (docs.length > 0) {
          const response = {
              status: 'OK',
              message: 'Successfully Get Kegiatan By Id',
              data: docs,
              request: {
                  type: 'GET',
                  url: '/Kegiatan/get-by-id'
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
