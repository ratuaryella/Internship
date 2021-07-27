const KegiatanServices = require('../services/kegiatan');
const TatananServices = require('../services/tatanan');
const getCurrentDate = require('../helper/current-date');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const globalVariable = require('../helper/globalVarible');
const { Tatanan } = require('../../sequelize');
const multer = require('multer');
const URL = "http://localhost:8083/kegiatan?name=";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../api_services/api/uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadImg = multer({storage: storage});

//Create Kegiatan
const createKegiatan = async (req, res, next) => {
    const currentDate = getCurrentDate();

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {

    const dataKegiatan = {
        id_tatanan: "",
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
        created_at: currentDate.dateAsiaJakarta,
        created_by: req.userData.id,
        gambar: URL + req.file.filename,
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
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        currentPage: docs.pagination.currentPage,
                        totalPages: Math.ceil(docs.data.count / 5),
                        results: docs.data.rows.map((doc) => {
                            return {
                                id: doc.id,
                                nama_kegiatan: doc.nama_kegiatan,
                                pelaksana: doc.pelaksana,
                                tanggal_kegiatan: doc.tanggal_kegiatan,
                                gambar: doc.gambar,
                                deskripsi: doc.deskripsi,
                                longitude: doc.longitude,
                                latitude: doc.latitude,
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
    try{
      const currentDate = getCurrentDate();
      const id = req.query.id;
  
      if (req.userData.role.id == globalVariable.ROLE_ADMIN || req.userData.role.id == globalVariable.ROLE_USER) {

      let detailKegiatan = await KegiatanServices.getKegiatanById(id);
      if (detailKegiatan.length > 0) {
        const updateDataKegiatan = {
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
          updated_at: currentDate.dateAsiaJakarta,
          updated_by: req.userData.id,
          gambar: req.file.path
        };
        const updateKegiatan = await KegiatanServices.updateKegiatan(id, updateDataKegiatan);
        const response = {
            message: `Successfully Updated Kegiatan with id: ${id}`,
            totalUpdated: updateKegiatan[0],
            request: {
                        type: 'PATCH',
                        url: `/update-kegiatan?id=${id}`
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
                  message: 'Only registered users can access!'
              });
          }
      } catch (err) {
          next(err);
      }
  }

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
                    kategori: doc.kategori,
                    nama_indikator: doc.nama_indikator,
                    subindikator: doc.subindikator,
                    pelaksana: doc.pelaksana,
                    tanggal_kegiatan: doc.tanggal_kegiatan,
                    longitude: doc.longitude,
                    latitude: doc.latitude,
                    deskripsi: doc.deskripsi,
                    pelaksana: doc.pelaksana,
                    tanggal_kegiatan: doc.tanggal_kegiatan,
                    created_at: doc.created_at,
                    created_by: doc.created_by,
                    gambar: doc.gambar,

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

//Download Image
const downloadFiles = (req, res) => {
    const fileName = req.query.name;
    const path = __dirname + "/../uploads/";
  
    res.download(path + fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "File can not be downloaded: " + err,
        });
      }
    });
};

//Get All Kegiatan (No Paging)
const getAllKegiatan = (req, res, next) => {

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {
    KegiatanServices.getAllKegiatan(req)
    .then(docs => {
        if (docs.data.rows.length > 0) {
            const response = {
                        total: docs.data.count,
                        results: docs.data.rows.map((doc) => {
                            return {
                                id: doc.id,
                                nama_kegiatan: doc.nama_kegiatan,
                                pelaksana: doc.pelaksana,
                                tanggal_kegiatan: doc.tanggal_kegiatan,
                                gambar: doc.gambar,
                                deskripsi: doc.deskripsi,
                                longitude: doc.longitude,
                                latitude: doc.latitude,
                                created_at: doc.created_at,
                                created_by: doc.created_by
                            };
                        }),
                request: {
                    type: 'GET',
                    url: '/Kegiatan/getAllKegiatan/' ,
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

//Create Kegiatan (Tanpa Gambar)
const createKegiatanNon = async (req, res, next) => {
    const currentDate = getCurrentDate();

    try{
    
    if (req.userData.role.id == globalVariable.ROLE_ADMIN || globalVariable.ROLE_USER) {

    const dataKegiatanNon = {
        id_tatanan: "",
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
        alamat: req.body.alamat,
        created_at: currentDate.dateAsiaJakarta,
        created_by: req.userData.id
    }

    KegiatanServices.createKegiatanNon(dataKegiatanNon)
    .then(() => {
        res.status(201).json({
            status: 'Created',
            message: 'Successfully Created Kegiatan',
            dataKegiatan: dataKegiatanNon,
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



module.exports = {
    createKegiatan,
    getKegiatanById,
    getKegiatan,
    updateKegiatan,
    deleteKegiatan,
    uploadImg,
    downloadFiles,
    getAllKegiatan,
    createKegiatanNon
}
