module.exports = app => {
    const movies = require("../controllers/movies.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // router.post("/", tutorials.create);
  
    // Retrieve all Movies
    router.get("/", movies.findAll);
  
    // Retrieve all published Movies
    // router.get("/retrieve", movies.findAllPublished);
  
    // Retrieve a single Movie with id
    // router.get("/:id", movies.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/movies", router);
  };
  