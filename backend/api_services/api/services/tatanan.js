const { Op } = require('sequelize');
const { Kegiatan, Tatanan } = require('../../sequelize');
const paginator = require('../helper/pagination');

// Get All Tatanan
const getTatanan = (req) => {
    const pagination = paginator(req.query.page, 10); // set 1 page = 10 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Tatanan.findAndCountAll({
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

// Get Tatanan by Id
const getTatananById = (id) => {
    return Tatanan.findAll({
        where: {
            id: id,
            deleted_at: null
        },
        limit: 1
      }).then(docs => {
        return docs;
    });
}

// Create Tatanan
const createTatanan = (dataTatanan) => {
    return Tatanan.create(dataTatanan)
    .then(docs => {
        return {
            docs: docs,
        }
    })
    .catch(error => {
        console.log(error);
    })
}

// Update Tatanan
const updateTatanan = (id, updateTatanan) => {
    return Tatanan.update(updateTatanan, {
        where: { id: id }
    });
}

// Delete Tatanan
const deleteTatanan = (id, deleteTatanan) => {
    return Tatanan.update(deleteTatanan, {
        where: { id: id }
    });
}

// Get All Tatanan (No Paging)
const getAllTatanan = (req) => {
    return Tatanan.findAndCountAll({
        where: { deleted_at: null },
        order: [['created_at', 'DESC']]
      }).then(docs => {
        return {
            data: docs
        }
    });
}

// Get All Tatanan (No Paging)
const getNamaTatanan = (nama_tatanan) => {
    return Tatanan.findAndCountAll({
        where: { nama_tatanan: nama_tatanan,
            deleted_at: null },
        order: [['created_at', 'DESC']]
      }).then(docs => {
        return {
            data: docs
        }
    });
}

// Get All Tatanan (No Paging)
const getNamaJenisTatanan = (nama_tatanan, jenis_indikator) => {
    return Tatanan.findAndCountAll({
        where: { nama_tatanan: nama_tatanan,
            jenis_indikator: jenis_indikator,
            deleted_at: null },
        order: [['created_at', 'DESC']]
      }).then(docs => {
        return {
            data: docs
        }
    });
}

// Get All Tatanan (No Paging)
const getNamaJenisKategori = (nama_tatanan, jenis_indikator, kategori) => {
    return Tatanan.findAndCountAll({
        where: { nama_tatanan: nama_tatanan,
            jenis_indikator: jenis_indikator,
            kategori: kategori,
            deleted_at: null },
        order: [['created_at', 'DESC']]
      }).then(docs => {
        return {
            data: docs
        }
    });
}

// Get All Tatanan (No Paging)
const getNamaJenisKategoriIndikator = (nama_tatanan, jenis_indikator, kategori, nama_indikator) => {
    return Tatanan.findAndCountAll({
        where: { nama_tatanan: nama_tatanan,
            jenis_indikator: jenis_indikator,
            kategori: kategori,
            nama_indikator: nama_indikator,
            deleted_at: null },
        order: [['created_at', 'DESC']]
      }).then(docs => {
        return {
            data: docs
        }
    });
}



module.exports = {
    createTatanan,
    getTatanan,
    getTatananById,
    updateTatanan,
    deleteTatanan,
    getAllTatanan,
    getNamaTatanan,
    getNamaJenisTatanan,
    getNamaJenisKategori,
    getNamaJenisKategoriIndikator
}