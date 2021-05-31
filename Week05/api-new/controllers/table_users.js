const userServices = require('../services/table_users');
const getCurrentDate = require('../helper/current-date');
const roleModel = require('../models/tables').roleModel;
const { userModel } = require('../models/tables').userModel;

const getAll = (req, res) => {
    userServices.getAll(req)
    .then(docs => {
        if (docs.data.length > 0) {
            const response = {
                data: docs.data,
                request: {
                    type: 'GET',
                    url: '/all-board/' ,
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


const createUser = (req, res) => {
    const currentDate = getCurrentDate();

    const dataInsert = {
        nama: req.body.nama,
        nip: req.body.nip,
        no_HP: req.body.no_HP,
        password: req.body.password,
        username: req.body.username,
        email: req.body.email,
        createdAt: currentDate.dateAsiaJakarta,
        tableRoleId: req.body.tableRoleId
    }

    userServices.createUser(dataInsert)
    .then(docs => {
    if(!docs) {
            res.status(406).json({
                message: `Constraint violation on foreign key`
            });
    } else {
        res.status(201).json({
            status: 'Created',
            message: 'Successfully Create User',
            dataInsert: dataInsert,
            request: {
                type: "POST",
                url: "/create-user"
            }
        });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}


const updateUser = (req, res) => {
    const currentDate = getCurrentDate();

    const dataUpdate = {
        id: req.query.id,
        nama: req.body.nama,
        nip: req.body.nip,
        no_HP: req.body.no_HP,
        password: req.body.password,
        username: req.body.username,
        email: req.body.email,
        updatedAt: currentDate.dateAsiaJakarta,
        tableRoleId: req.body.tableRoleId
    }

    userServices.getById(dataUpdate.id)
    .then(docs => {  
        if(docs.length > 0) {
            userServices.updateUser(dataUpdate)
            .then(() => {
                res.status(200).json({
                    message: 'Successfully Update User',
                    dataUpdate: dataUpdate,
                    request: {
                        type: "PATCH",
                        url: "/update-user"
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed Update a User"
                });
            })
        } else {
            res.status(404).json({
                message: `Data not found with id ${dataUpdate.id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}


const deleteUser = (req, res) => {
    const id = req.query.id;

    userServices.getById(id)
    .then(docs => {  
        if(docs.length > 0) {
            userServices.deleteUser(id)
            .then(() => {
                res.status(200).json({
                    message: 'Successfully Delete User',
                    id: id,
                    request: {
                        type: "PATCH",
                        url: "/delete-user"
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed Delete a User"
                });
            })
        } else {
            res.status(404).json({
                message: `Data not found with id ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}


const getById = (req, res, next) => {
    const id = req.query.id;
    userServices.getById(id)
    .then(docs => {
        if (docs.length > 0) {
            const response = {
                status: 'OK',
                message: 'Successfully Get By Id',
                data: docs,
                request: {
                    type: 'GET',
                    url: '/api/get-by-id'
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

module.exports = {
    getAll,
    createUser,
    updateUser,
    deleteUser,
    getById
}