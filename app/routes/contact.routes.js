module.exports = app => {
    const ContactUs = require("../controllers/contact.controller.js")
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", ContactUs.create);
  
    // // Retrieve all Tutorials
    // router.get("/", contact.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", contact.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", contact.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", contact.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", contact.delete);

    app.use("/api/ContactUs", router);
  };
  