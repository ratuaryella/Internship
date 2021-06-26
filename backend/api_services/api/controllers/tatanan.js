const KegiatanServices = require('../services/kegiatan');
const TatananServices = require('../services/tatanan');
const getCurrentDate = require('../helper/current-date');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const currentDate = getCurrentDate();
const globalVariable = require('../helper/globalVarible');

//Create Tatanan
const createTatanan = async (req, res, next) => {
    const currentDate = getCurrentDate();

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN) {

    const dataTatanan = {
        nama_tatanan: req.body.nama_tatanan,
        jenis_indikator: req.body.jenis_indikator,
        kategori: req.body.kategori,
        nama_indikator: req.body.nama_indikator,
        subindikator: req.body.subindikator,
        created_at: currentDate.dateAsiaJakarta,
        created_by: req.userData.id
    }

    TatananServices.createTatanan(dataTatanan)
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
}
else {
    return res.status(403).json({
        status: 'Forbidden',
        message: 'Only admin can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Get All Tatanan
const getTatanan = (req, res, next) => {

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN) {
    TatananServices.getTatanan(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        results: docs.data.rows.map((doc) => {
                            return {
                                nama_tatanan: doc.nama_tatanan,
                                jenis_indikator: doc.jenis_indikator,
                                kategori: doc.kategori,
                                nama_indikator: doc.nama_indikator,
                                subindikator: doc.subindikator,
                                created_at: doc.created_at,
                                created_by: doc.created_by
                            };
                        }),
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
else {
    return res.status(403).json({
        status: 'Forbidden',
        message: 'Only admin can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Update Tatanan
const updateTatanan = async (req, res, next) => {
  const currentDate = getCurrentDate();

  try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {

  const dataTatanan = {
      id: req.query.id,
      nama_tatanan: req.body.nama_tatanan,
      jenis_indikator: req.body.jenis_indikator,
      kategori: req.body.kategori,
      nama_indikator: req.body.nama_indikator,
      subindikator: req.body.subindikator,
      updated_at: currentDate.dateAsiaJakarta,
      updated_by: req.userData.id
  }

  TatananServices.getTatananById(dataTatanan.id)
  .then(docs => {  
      if(docs.length > 0) {
          TatananServices.updateTatanan(dataTatanan)
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
else {
    return res.status(403).json({
        status: 'Forbidden',
        message: 'Only admin can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Delete Tatanan
const deleteTatanan = async (req, res, next) => {
    try {
        const id = req.query.id;
        const currentDate = getCurrentDate();
        
        if (req.userData.role.id == globalVariable.ROLE_ADMIN) {

            let detailTatanan = await TatananServices.getTatananById(id);
            if (detailTatanan.length > 0) {
                const deleteDataTatanan = {
                    deleted_at: currentDate.dateAsiaJakarta,
                    status: 0,
                    deleted_by: req.userData.id
                };
                const deleteTatanan = await KegiatanServices.deleteTatanan(id, deleteDataTatanan);
                const response = {
                    message: `Successfully Deleted Tatanan with id: ${id}`,
                    totalDeleted: deleteTatanan[0],
                    request: {
                        type: 'PATCH',
                        url: `/delete-tatanan?id=${id}`
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: `Can't find Tatanan with id: ${id}`
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

//Get Tatanan By Id
const getTatananById = (req, res, next) => {
  const id = req.query.id;

  try {

  if (req.userData.id == id || req.userData.role.id == globalVariable.ROLE_ADMIN) {
  TatananServices.getTatananById(id)
  .then(docs => {
      if (docs.length > 0) {
          const response = {
            data: docs.map(doc => {
                return {
                    nama_tatanan: doc.nama_tatanan,
                                jenis_indikator: doc.jenis_indikator,
                                kategori: doc.kategori,
                                nama_indikator: doc.nama_indikator,
                                subindikator: doc.subindikator,
                                created_at: doc.created_at,
                                created_by: doc.created_by
                }
            }),
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
else {
    return res.status(403).json({
        status: 'Forbidden',
        message: 'Only admin can access!'
        });
        }
    }   
    catch (err) {
    next(err);
    }
}

module.exports = {
    createTatanan,
    getTatananById,
    getTatanan,
    updateTatanan,
    deleteTatanan
}