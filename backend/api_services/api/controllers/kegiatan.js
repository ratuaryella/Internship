const KegiatanServices = require('../services/kegiatan');
const TatananServices = require('../services/tatanan');
const getCurrentDate = require('../helper/current-date');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const currentDate = getCurrentDate();
const globalVariable = require('../helper/globalVarible');

//Create Kegiatan
const createKegiatan = async (req, res, next) => {
    const currentDate = getCurrentDate();

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {

    const dataKegiatan = {
        id_tatanan: req.body.id_tatanan,
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
        created_at: currentDate.dateAsiaJakarta,
        created_by: req.userData.id
    }

    KegiatanServices.createKegiatan(dataKegiatan)
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

//Get All Kegiatan
const getKegiatan = (req, res, next) => {

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    KegiatanServices.getKegiatan(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        results: docs.data.rows.map((doc) => {
                            return {
                                nama_kegiatan: doc.nama_kegiatan,
                                nama_tatanan: doc.nama_tatanan,
                                jenis_indikator: doc.jenis_indikator,
                                pelaksana: doc.pelaksana,
                                tanggal_kegiatan: doc.tanggal_kegiatan,
                                created_at: doc.created_at,
                                created_by: doc.created_by
                            };
                        }),
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

//Update Kegiatan
const updateKegiatan = async (req, res, next) => {
  const currentDate = getCurrentDate();

  try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {

  const dataKegiatan = {
      id: req.query.id,
      id_tatanan: req.body.id_tatanan,
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
      updated_at: currentDate.dateAsiaJakarta,
      updated_by: req.userData.id
  }

  KegiatanServices.getKegiatanById(dataKegiatan.id)
  .then(docs => {  
      if(docs.length > 0) {
          KegiatanServices.updateKegiatan(dataKegiatan)
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

//Delete Kegiatan
const deleteKegiatan = async (req, res, next) => {
    try {
        const id = req.query.id;
        const currentDate = getCurrentDate();
        
        if (req.userData.role.id == globalVariable.ROLE_ADMIN) {

            let detailKegiatan = await KegiatanServices.getKegiatanById(id);
            if (detailKegiatan.length > 0) {
                const deleteDataKegiatan = {
                    deleted_at: currentDate.dateAsiaJakarta,
                    status: 0,
                    deleted_by: req.userData.id
                };
                const deleteKegiatan = await KegiatanServices.deleteKegiatan(id, deleteDataKegiatan);
                const response = {
                    message: `Successfully Deleted Kegiatan with id: ${id}`,
                    totalDeleted: deleteKegiatan[0],
                    request: {
                        type: 'PATCH',
                        url: `/delete-tatanan?id=${id}`
                    }
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: `Can't find Kegiatan with id: ${id}`
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


//Get Kegiatan By Id
const getKegiatanById = (req, res, next) => {
  const id = req.query.id;
  
  try {

  if (req.userData.id == id || req.userData.role.id == globalVariable.ROLE_ADMIN) {
  KegiatanServices.getKegiatanById(id)
  .then(docs => {
      if (docs.length > 0) {
          const response = {
            data: docs.map(doc => {
                return {
                    id: doc.id,
                    id_tatanan: doc.id_tatanan,
                    nama_kegiatan: doc.nama_kegiatan,
                    nama_tatanan: doc.nama_tatanan,
                    jenis_indikator: doc.jenis_indikator,
                    pelaksana: doc.pelaksana,
                    tanggal_kegiatan: doc.tanggal_kegiatan,
                    created_at: doc.created_at,
                    created_by: doc.created_by,

                }
            }),
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
    createKegiatan,
    getKegiatanById,
    getKegiatan,
    updateKegiatan,
    deleteKegiatan
}