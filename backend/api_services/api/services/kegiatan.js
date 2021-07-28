const { Op } = require('sequelize');
const { Kegiatan, Tatanan } = require('../../sequelize');
const { User } = require('../../../api_authentication/sequelize');
const paginator = require('../helper/pagination');

// Get All Kegiatan
const getKegiatan = (req) => {
    const pagination = paginator(req.query.page, 5); // set 1 page = 5 length data
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

// Get All Kegiatan (No Paging)
const getAllKegiatan = (req) => {
    return Kegiatan.findAndCountAll({
        where: { deleted_at: null },
        order: [['created_at', 'DESC']]
    }).then(docs => {
        return {
            data: docs
        }
    });
}

// Create Kegiatan
const createKegiatanNon = (dataKegiatanNon) => {
    return Tatanan.findOne({
            raw: true,
            where: {
            nama_tatanan: dataKegiatanNon.nama_tatanan,
            jenis_indikator: dataKegiatanNon.jenis_indikator,
            kategori: dataKegiatanNon.kategori,
            nama_indikator: dataKegiatanNon.nama_indikator,
            subindikator: dataKegiatanNon.subindikator
        },
        attributes: ['id']
    })
        .then((data)=> {
            dataKegiatanNon.id_tatanan = Object.values(data);
            return Kegiatan.create(dataKegiatanNon)
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

//Get Kegiatan by Role
const getKegiatanByRole = (role, req) => {
    const pagination = paginator(req.query.page, 5); // set 1 page = 5 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Kegiatan.findAndCountAll({
        where: { 
            creator_role: role,
            deleted_at: null },
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

const getKegiatanByUser = (user_id, req) => {
    const pagination = paginator(req.query.page, 5); // set 1 page = 5 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Kegiatan.findAndCountAll({
        where: { 
            created_by: user_id,
            deleted_at: null },
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

module.exports = {
    createKegiatan,
    getKegiatan,
    getKegiatanById,
    updateKegiatan,
    deleteKegiatan,
    getAllKegiatan,
    createKegiatanNon,
    getKegiatanByRole,
    getKegiatanByUser
}