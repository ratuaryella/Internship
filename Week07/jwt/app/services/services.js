const { QueryTypes } = require('sequelize');
const db = require('../models');
const getCurrentDate = require('../helper/current-date');

const User = db.user;
const Role = db.role;

// Get All
const getAll = (req) => {
    const query = `SELECT * FROM table_users where "deleted_at" is NULL ORDER BY id`;
    return User.sequelize.query(query, {
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
    return User.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

// Create
const createUser = (dataInsert) => {
    return Role.findOne({
        where: {
            id: dataInsert.tableRoleId
        }
    })
    .then(() => {
    return User.create(dataInsert)
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

    return User.update({
        nama: dataInsert.nama,
        nip: dataInsert.nip,
        no_HP: dataInsert.no_HP,
        password: dataInsert.password,
        username: dataInsert.username,
        email: dataInsert.email,
        updated_at: currentDate.dateAsiaJakarta,
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

    return User.update({
        deleted_at: currentDate.dateAsiaJakarta
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