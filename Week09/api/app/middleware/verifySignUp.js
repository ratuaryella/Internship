const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmailorPhone = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
      email: req.body.email,
      no_HP: req.body.no_HP

    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Credential is already in use!"
      });
      return;
    }

    next();
  });
  
};


const verifySignUp = {
  checkDuplicateUsernameOrEmailorPhone: checkDuplicateUsernameOrEmailorPhone
};

module.exports = verifySignUp;