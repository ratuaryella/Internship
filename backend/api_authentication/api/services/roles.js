const { Role } = require('../../sequelize');
const paginator = require('../helper/pagination');

const getAllRole = (req) => {
    const pagination = paginator(req.query.page, 10); // set 1 page = 10 length data
    const limit = pagination.limit;
    const offset = pagination.offset;
    return Role.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']]
    }).then(docs => {
        return {
            data: docs,
            pagination: pagination
        }
    });
}

module.exports = {
    getAllRole
}