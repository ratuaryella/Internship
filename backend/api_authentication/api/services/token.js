const { Op } = require('sequelize');
const { Token } = require('../../sequelize');

const createUpdate = (id, dataInsert) => {
    return Token.findAll({
        where: {
            [Op.and]: [
                { status_is_valid: true },
                { id_user: id }
            ],
        },
    }).then(isExist => {
        if (isExist.length > 0) {
            Token.update(
                { status_is_valid: false },
                { 
                    where: {
                        [Op.and]: [
                            { status_is_valid: true },
                            { id_user: id }
                        ],
                    },
                }
            );
            return 'Success Invalidate Token';
        } else {
            return Token.create(dataInsert);
        }
    }).then(nextStep => {
        if (nextStep === 'Success Invalidate Token') {
            return Token.create(dataInsert);
        }
    });
}

const changeStatus = async (token) => {
    return await Token.update(
        { status_is_valid: false },
        {
            where: {
                token: token
            }
        }
    );
}

const checkToken = (token) => {
    return Token.findAll({
        where: {
            [Op.and]: [
                { status_is_valid: true },
                { token: token }
            ]
        }
    }).then(result => {
        return result;
    });
}

module.exports = {
    createUpdate,
    changeStatus,
    checkToken
}