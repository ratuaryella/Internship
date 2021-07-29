const authFetch = require("../../fetch/auth/auth");
const { validationResult } = require("express-validator");

const index = (req, res) => {
  res.render("./pages/login/index");
};

const login = (req, res) => {
  const valResult = validationResult(req);
  var errors = valResult.errors;
  if (!valResult.isEmpty()) {
    res.render("./pages/login/index", {
      errors: errors,
    });
  } else {
    authFetch
      .loginFetch(req)
      .then((response) => {
        if (response.status == 200) {
          res.cookie("username", response.data.username, { httpOnly: true });
          res.cookie("id", response.data.id, { httpOnly: true });
          res.cookie("role", response.data.role.id, { httpOnly: true });
          res.cookie("user_token", response.data.token, {
            httpOnly: true,
          });
          res.redirect("/");
        } else {
          res.render("./pages/login/index", {
            auth_failed: "Wrong Credential",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const logout = (req, res) => {
  res.clearCookie("username");
  res.clearCookie("user_token");
  res.clearCookie("role");
  res.redirect("/");
};

module.exports = {
  index,
  login,
  logout,
};
