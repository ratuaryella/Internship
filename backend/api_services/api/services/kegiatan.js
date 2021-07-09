const { Op } = require('sequelize');
const { Kegiatan, Tatanan } = require('../../sequelize');
const paginator = require('../helper/pagination');
var stream = require('stream');

// Get All Kegiatan
const getKegiatan = (req) => {
    const pagination = paginator(req.query.page, 10); // set 1 page = 10 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Kegiatan.findAndCountAll({
        where: { deleted_at: null },
        limit, 
        offset,
        order: [['created_at', 'DESC']]
    }).then(docs => {
        return {
            data: docs,
            pagination: pagination
        }
    });
}

// Get Kegiatan by Id
const getKegiatanById = (id, req, res) => {
    return Kegiatan.findAll({
        where: {
            id: id,
            deleted_at: null
        },
        limit: 1,
      })
      .then(docs => {
        return docs;
    });
}

// Create Kegiatan
const createKegiatan = (dataKegiatan) => {
    return Tatanan.findOne({
            raw: true,
            where: {
            nama_tatanan: dataKegiatan.nama_tatanan,
            jenis_indikator: dataKegiatan.jenis_indikator,
            kategori: dataKegiatan.kategori,
            nama_indikator: dataKegiatan.nama_indikator,
            subindikator: dataKegiatan.subindikator
        },
        attributes: ['id']
    })
        .then((data)=> {
            dataKegiatan.id_tatanan = Object.values(data);
            return Kegiatan.create(dataKegiatan)
            .then(docs => {
                return {
                docs: docs,
            }
        })

    })
    .catch(error => {
        console.log(error);
    })
}


// Update Kegiatan
const updateKegiatan = (id, updateKegiatan) => {
    return Kegiatan.update(updateKegiatan, {
        where: { id: id }
    });
}

// Delete Kegiatan
const deleteKegiatan = (id, deleteKegiatan) => {
    return Kegiatan.update(deleteKegiatan, {
        where: { id: id }
    });
}

module.exports = {
    createKegiatan,
    getKegiatan,
    getKegiatanById,
    updateKegiatan,
    deleteKegiatan,
}