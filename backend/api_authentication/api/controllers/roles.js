const globalVarible = require('../helper/globalVarible');
const RoleServices = require('../services/roles');

const getAllRole = (req, res, next) => {
    try {
        if (req.userData.role.id == globalVarible.ROLE_ADMIN) {
            RoleServices.getAllRole(req)
            .then(docs => {
                if (docs.data.rows.length > 0) {
                    const response = {
                        message: 'Get All Roles',
                        total: docs.data.count,
                        nextPage: docs.pagination.nextPage,
                        prevPage: docs.pagination.prevPage,
                        results: docs.data.rows.map(doc => {
                            return {
                                id: doc.id,
                                name: doc.name,
                                description: doc.description
                            }
                        }),
                        request: {
                            type: 'GET',
                            url: '/get-roles'
                        }
                    }
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'No records found'
                    });
                }
            }).catch(err => {
                console.log(err);
                next(err);
            });
        } else {
            return res.status(403).json({
                status: 'Forbidden',
                message: 'Only admin can access!'
            });
        }
    } catch(err) {
        next(err);
    }    
}

module.exports = {
    getAllRole
}