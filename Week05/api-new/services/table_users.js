const { QueryTypes } = require('sequelize');
const sequelize = require("../db");
const userModel = require('../models/tables').userModel;
const roleModel = require('../models/tables').roleModel;
const getCurrentDate = require('../helper/current-date');

// Get All
const getAll = (req) => {
    const query = `SELECT * FROM table_users where "deletedAt" is NULL ORDER BY id`;
    return userModel.sequelize.query(query, {
        type: QueryTypes.SELECT,
    })
    .then(data => {
        return {
            data: data
        }
    })
}

// Get By Id
const getById = (id) => {
    return userModel.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

// Create
const createUser = (dataInsert) => {
    return roleModel.findOne({
        where: {
            id: dataInsert.tableRoleId
        }
    })
    .then(() => {
    return userModel.create(dataInsert)
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


// Update
const updateUser = (dataInsert) => {
    const currentDate = getCurrentDate();

    return userModel.update({
        nama: dataInsert.nama,
        nip: dataInsert.nip,
        no_HP: dataInsert.no_HP,
        password: dataInsert.password,
        username: dataInsert.username,
        email: dataInsert.email,
        updatedAt: currentDate.dateAsiaJakarta,
        tableRoleId: dataInsert.tableRoleId},
        
        
        { where: { id: dataInsert.id }
    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
}

// Delete
const deleteUser = (id) => {
    const currentDate = getCurrentDate();

    return userModel.update({
        deletedAt: currentDate.dateAsiaJakarta
    }, {
        where: { id: id }
    }).then(docs => {
        return {
            docs: docs,
        }
    }).catch(error => {
        console.log(error)
    })
}

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
}