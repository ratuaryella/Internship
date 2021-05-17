module.exports = app =>{
    const issues = require("../controller/function.js");

    var router = require("express").Router();

    //GET
    router.get("/", issues.findAll);

    //GET by ID
    router.get("/:id", issues.findOne);

    //POST
    router.post("/", issues.create);

    //UPDATE
    router.put("/:id", issues.update);

    //DELETE
    router.delete("/:id", issues.delete);

    //DELETE ALL
    router.delete("/", issues.deleteAll);

    app.use('/api/issues', router);
}