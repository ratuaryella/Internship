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
        attributes,
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
        attributes,
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
const updateTatanan = (dataTatanan) => {
    const currentDate = getCurrentDate();

    return Tatanan.update({
        nama_tatanan: dataTatanan.nama_tatanan,
        jenis_indikator: dataTatanan.jenis_indikator,
        kategori: dataTatanan.kategori,
        nama_indikator: dataTatanan.nama_indikator,
        subindikator: dataTatanan.subindikator,
        updated_at: currentDate.dateAsiaJakarta,
        updated_by: dataTatanan.updated_by,
    },

        {where: { id: dataTatanan.id }

    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
}

// Delete Tatanan
const deleteTatanan = (id, deleteTatanan) => {
    return Tatanan.update(deleteTatanan, {
        where: { id: id }
    });
}



module.exports = {
    createTatanan,
    getTatanan,
    getTatananById,
    updateTatanan,
    deleteTatanan
}