const { QueryTypes } = require('sequelize');
const db = require('../models');
const getCurrentDate = require('../helper/current-date');

const User = db.user;
const Role = db.role;
const Tatanan = db.tatanan;

// Get All User
exports.getAll = (req) => {
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

// Get User By Id
exports.getById = (id) => {
    return User.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

// Create User
exports.createUser = (dataInsert) => {
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


// Update User
exports.updateUser = (dataInsert) => {
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

// Delete User
exports.deleteUser = (id) => {
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

//Get All Role
exports.getAllRole = (req) => {
    const query = `SELECT * FROM table_role where "deleted_at" is NULL ORDER BY id`;
    return User.sequelize.query(query, {
        type: QueryTypes.SELECT,
    })
    .then(data => {
        return {
            data: data
        }
    })
}

// Create Role
exports.createRole = (dataRole) => {
    return Role.create(dataRole)
    .then(docs => {
        return {
            docs: docs,
        }
    })
    .catch(error => {
        console.log(error);
    })
}

// Delete Role
exports.deleteRole = (id) => {
    const currentDate = getCurrentDate();

    return Role.update({
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

// Get Role By Id
exports.getRoleById = (id) => {
    return Role.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

// Get All Tatanan
exports.getTatanan = (req) => {
    const query = `SELECT * FROM table_tatanan where "deleted_at" is NULL ORDER BY id`;
    return Tatanan.sequelize.query(query, {
        type: QueryTypes.SELECT,
    })
    .then(data => {
        return {
            data: data
        }
    })
}

// Get Tatanan by Id
exports.getTatananById = (id) => {
    return Tatanan.findAll({
        where: {
            id: id 
        }
      }).then(docs => {
        return docs;
    });
}

// Create Tatanan
exports.createTatanan = (dataTatanan) => {
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
exports.updateTatanan = (dataTatanan) => {
    const currentDate = getCurrentDate();

    return Tatanan.update({
        nama_tatanan: dataTatanan.nama_tatanan,
        jenis_indikator: dataTatanan.jenis_indikator,
        kategori: dataTatanan.kategori,
        nama_indikator: dataTatanan.nama_indikator,
        subindikator: dataTatanan.subindikator,
        updated_at: currentDate.dateAsiaJakarta},

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
exports.deleteTatanan = (id) => {
    const currentDate = getCurrentDate();

    return Tatanan.update({
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