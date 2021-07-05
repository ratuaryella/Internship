const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const authFetch = require('../fetch/auth');

const isAuth = (token) => {
    return authFetch.fetchAuth(token)
    .then(response => {
        if (response.status == 200) {
            return response.data.data
        } else { 
            return false;
        }
    }).catch(error => {
        console.log(error);
    });
}

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const validToken = await isAuth(token);
        if (validToken == false) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            const decoded = jwt.verify(token, config.JWT_KEY);
            req.userData = decoded;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = {
    checkAuth
}