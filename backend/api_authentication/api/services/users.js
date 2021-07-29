const { Op } = require('sequelize');
const { User, Role } = require('../../sequelize');
const paginator = require('../helper/pagination');

// Create User
const createUser = (dataInsert) => {
    return User.create(dataInsert);
}

// Check User Registered
const checkUserRegistered = (req) => {
    return User.findAll({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { username: req.body.username }
            ],
        },
        order: [['created_at', 'DESC']],
        limit: 1,
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    }).then(user => {
        return user;
    });
}

// Check Username to Login
const checkUsername = (username) => {
    return User.findAll({
        where: {
            username: username
        },
        order: [['created_at', 'DESC']],
        limit: 1,
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    }).then(user => {
        return user;
    });
}

// Get All User
const getAllUser = (req) => {
    const pagination = paginator(req.query.page, 10); // set 1 page = 10 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return User.findAndCountAll({
        where: { deleted_at: null },
        attributes: { exclude: ['password'] },
        limit, 
        offset,
        order: [['created_at', 'DESC']],
        include: {
            model: Role,
            as: 'role'
        }
    }).then(docs => {
        return {
            data: docs,
            pagination: pagination
        }
    });
}

// Get Detail User
const getDetailUser = (id) => {
    return User.findAll({
        where: {
            id: id,
            deleted_at: null
        },
        attributes: { exclude: ['password'] },
        limit: 1,
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    }).then(docs => {
        return docs;
    });
}

// Delete User
const deleteUser = (id, deleteData) => {
    return User.update(deleteData, {
        where: { id: id }
    });
}

// Update User
const updateUser = (id, updateUser) => {
    return User.update(updateUser, {
        where: { id: id }
    });
}

module.exports = {
    createUser,
    checkUserRegistered,
    checkUsername,
    getAllUser,
    getDetailUser,
    deleteUser,
    updateUser
}