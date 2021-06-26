const { Op } = require('sequelize');
const { Kegiatan, Tatanan } = require('../../sequelize');
const paginator = require('../helper/pagination');

// Get All Kegiatan
const getKegiatan = (req) => {
    const pagination = paginator(req.query.page, 10); // set 1 page = 10 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Kegiatan.findAndCountAll({
        where: { deleted_at: null },
        attributes,
        limit, 
        offset,
        order: [['created_at', 'DESC']],
        include: {
            model: Tatanan,
            as: 'tatanan'
        }
    }).then(docs => {
        return {
            data: docs,
            pagination: pagination
        }
    });
}

// Get Kegiatan by Id
const getKegiatanById = (id) => {
    return Kegiatan.findAll({
        where: {
            id: id,
            deleted_at: null
        },
        attributes,
        limit: 1,
        include: [
            {
                model: Tatanan,
                as: 'tatanan'
            }
        ]
      }).then(docs => {
        return docs;
    });
}

// Create Kegiatan
const createKegiatan = (dataKegiatan) => {
    return Tatanan.findOne({
        where: {
            id: dataKegiatan.id_tatanan
        }
    })
        .then(()=> {
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
const updateKegiatan = (dataKegiatan) => {
    const currentDate = getCurrentDate();

    return Kegiatan.update({
        id_tatanan: dataKegiatan.tableTatananId,
        nama_kegiatan: dataKegiatan.nama_kegiatan,
        nama_tatanan: dataKegiatan.nama_tatanan,
        jenis_indikator: dataKegiatan.jenis_indikator,
        kategori: dataKegiatan.kategori,
        nama_indikator: dataKegiatan.nama_indikator,
        subindikator: dataKegiatan.subindikator,
        pelaksana: dataKegiatan.pelaksana,
        tanggal_kegiatan: dataKegiatan.tanggal_kegiatan,
        longitude: dataKegiatan.longitude,
        latitude: dataKegiatan.latitude,
        deskripsi: dataKegiatan.deskripsi,
        gambar: dataKegiatan.gambar,
        updated_at: currentDate.dateAsiaJakarta,
        updated_by: dataKegiatan.updated_by,
    },

        {where: { id: dataKegiatan.id }

    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
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
    deleteKegiatan
}