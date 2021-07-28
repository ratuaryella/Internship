const KegiatanServices = require('../services/kegiatan');
const TatananServices = require('../services/tatanan');
const getCurrentDate = require('../helper/current-date');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const currentDate = getCurrentDate();
const globalVariable = require('../helper/globalVarible');

//Create Tatanan
const createTatanan = async (req, res, next) => {
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
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || req.userData.role.id == globalVariable.ROLE_USER) {
        TatananServices.getTatanan(req)
        .then(docs => {
            if (docs.data.rows.length > 0) {
                const response = {
                        total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        currentPage: docs.pagination.currentPage,
                        totalPages: Math.ceil(docs.data.count / 10),
                        result: docs.data.rows.map((doc) => {
                            return {
                                id: doc.id,
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
                    url: '/get-all-tatanan' ,
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
    try{
      const currentDate = getCurrentDate();
      const id = req.query.id;
  
      if (req.userData.role.id == globalVariable.ROLE_ADMIN) {
  
      let detailTatanan = await TatananServices.getTatananById(id);
      if (detailTatanan.length > 0) {
        const updateDataTatanan = {
          nama_tatanan: req.body.nama_tatanan,
          jenis_indikator: req.body.jenis_indikator,
          kategori: req.body.kategori,
          nama_indikator: req.body.nama_indikator,
          subindikator: req.body.subindikator,
          updated_at: currentDate.dateAsiaJakarta,
          updated_by: req.userData.id
        };
        const updateTatanan = await TatananServices.updateTatanan(id, updateDataTatanan);
        const response = {
            message: `Successfully Updated Tatanan with id: ${id}`,
            totalUpdated: updateTatanan[0],
            request: {
                        type: 'PATCH',
                        url: `/update-tatanan?id=${id}`
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
                const deleteTatanan = await TatananServices.deleteTatanan(id, deleteDataTatanan);
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

//Get All Tatanan (No Paging)
const getAllTatanan = (req, res, next) => {

    try{

    const nama_tatanan = req.query.nama_tatanan;
    const jenis_indikator = req.query.jenis_indikator;
    const kategori = req.query.kategori;
    const nama_indikator = req.query.nama_indikator;
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    TatananServices.getAllTatanan(req)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
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
                    url: '/Tatanan/getAllTatanan/' ,
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
        message: 'Only registered users can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Get by Nama Tatanan (No Paging)
const getNamaTatanan = (req, res, next) => {

    try{

    const nama_tatanan = req.query.nama_tatanan;
    const jenis_indikator = req.query.jenis_indikator;
    const kategori = req.query.kategori;
    const nama_indikator = req.query.nama_indikator;
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    TatananServices.getNamaTatanan(nama_tatanan)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
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
                    url: '/Tatanan/getAllTatanan/' ,
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
        message: 'Only registered users can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Get by Nama Tatanan (No Paging)
const getNamaJenisTatanan = (req, res, next) => {

    try{

    const nama_tatanan = req.query.nama_tatanan;
    const jenis_indikator = req.query.jenis_indikator;
    const kategori = req.query.kategori;
    const nama_indikator = req.query.nama_indikator;
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    TatananServices.getNamaJenisTatanan(nama_tatanan, jenis_indikator)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
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
                    url: '/Tatanan/getAllTatanan/' ,
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
        message: 'Only registered users can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Get by Nama Tatanan (No Paging)
const getNamaJenisKategori = (req, res, next) => {

    try{

    const nama_tatanan = req.query.nama_tatanan;
    const jenis_indikator = req.query.jenis_indikator;
    const kategori = req.query.kategori;
    const nama_indikator = req.query.nama_indikator;
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    TatananServices.getNamaJenisKategori(nama_tatanan, jenis_indikator, kategori)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
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
                    url: '/Tatanan/getAllTatanan/' ,
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
        message: 'Only registered users can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};

//Get by Nama Tatanan (No Paging)
const getNamaJenisKategoriIndikator = (req, res, next) => {

    try{

    const nama_tatanan = req.query.nama_tatanan;
    const jenis_indikator = req.query.jenis_indikator;
    const kategori = req.query.kategori;
    const nama_indikator = req.query.nama_indikator;
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    TatananServices.getNamaJenisKategoriIndikator(nama_tatanan, jenis_indikator, kategori, nama_indikator)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
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
                    url: '/Tatanan/getAllTatanan/' ,
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
        message: 'Only registered users can access!'
        });
        }
    }
    catch(err) {
    next(err);
    }
};


module.exports = {
    createTatanan,
    getTatananById,
    getTatanan,
    updateTatanan,
    deleteTatanan,
    getAllTatanan,
    getNamaTatanan,
    getNamaJenisTatanan,
    getNamaJenisKategori,
    getNamaJenisKategoriIndikator
}