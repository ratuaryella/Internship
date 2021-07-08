const jwt = require("jsonwebtoken");
const config = require("../config");
const authFetch = require("../fetch/auth/auth");

const checkToken = (token) => {
  return authFetch
    .checkTokenFetch(token)
    .then((response) => {
      if (response.status == 200) {
        return response.data.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;
    const validToken = await checkToken(token);
    if (validToken) {
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.userData = decoded;
      res.redirect('/');
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};
