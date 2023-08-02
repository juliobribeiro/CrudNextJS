module.exports = app => {
    const categoriaclientes = require("../controller/categoriacliente.controller.js");
    var router = require("express").Router();

    router.post("/", categoriaclientes.create);
    router.get("/", categoriaclientes.findAll);
    router.get("/publicado", categoriaclientes.findAllPublicado);
    router.get("/:id", categoriaclientes.findOne);
    router.put("/:id", categoriaclientes.update);
    router.delete("/:id", categoriaclientes.delete);
    router.delete("/", categoriaclientes.deleteAll);

    app.use("/api/categoriaclientes", router)
    
};