const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const TokenServices =  require('../services/token');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const checkToken  = await TokenServices.checkToken(token);
        if (checkToken.length > 0) {
            const decoded = jwt.verify(token, config.JWT_KEY);
            req.userData = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = {
    checkAuth,
}