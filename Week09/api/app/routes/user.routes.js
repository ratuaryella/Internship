const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Get General Content
  app.get("/api/test/all", controller.allAccess);

  //Get User Content
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  //Get Admin Content
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //Get All User
  app.get(
    "/api/test/user/view", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAll
  );

  //Get User By Id
  app.get(
    "/api/test/user/get-by-id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getById
  );

  //Update User
  app.patch(
    "/api/test/user/update-user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
    );

  //Delete User
  app.patch(
    "/api/test/user/delete-user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
    );
  
  //Create Role
  app.post(
    "/api/test/role/create-role",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createRole
    );

  //Get All Roles
  app.get(
    "/api/test/role/viewRole", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllRole
  );

  //Delete Role
  app.patch(
    "/api/test/role/delete-role",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRole
  );

  //Create Tatanan
  app.post(
    "/api/test/tatanan/create-tatanan",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTatanan
    );

   //Get All Tatanan
   app.get(
    "/api/test/tatanan/viewTatanan", 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getTatanan
  );

  //Get Tatanan By Id
  app.get(
    "/api/test/tatanan/get-by-id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getTatananById
  );

  //Update User
  app.patch(
    "/api/test/tatanan/update-tatanan",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateTatanan
    );

  //Delete User
  app.patch(
    "/api/test/tatanan/delete-tatanan",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTatanan
    );

}