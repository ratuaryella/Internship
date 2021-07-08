const jwt = require('jsonwebtoken');
const config = require('../config');
const { checkToken } = require('./login');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;
    if (token != undefined) {
      jwt.verify(token, config.JWT_KEY, function(err, decoded) {
        if (err) {
          res.redirect('/login');
        } 
        req.userData = decoded;
        res.locals.user = decoded;
        next();
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
  }
}