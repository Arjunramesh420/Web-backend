// module.exports = app => {
//   const Upload = require("../controllers/upload.controller.js"); // Import the updated controller

//   var router = require("express").Router();

//   // Upload a new Excel file
//   router.post("/", Upload.uploadExcel.create);

//   // // You can add other routes here if needed
//   // // Retrieve all uploaded data
//   // router.get("/", upload.findAll);

//   // // Retrieve a single uploaded entry by id
//   // router.get("/:id", upload.findOne);

//   // // Update an uploaded entry by id
//   // router.put("/:id", upload.update);

//   // // Delete an uploaded entry by id
//   // router.delete("/:id", upload.delete);

//   app.use("/api/uploads", router); // Change route to /api/uploads
// };


// module.exports = (app) => {
//   const uploads = require("../controllers/upload.controller.js");

//   const router = require("express").Router();

//   // Handle Excel file uploads
//   router.post("/excel", uploads.create);

//   app.use("/api/uploads", router);
// };

const multer = require('multer');
const path = require('path');
const uploads = require("../controllers/upload.controller.js");
const express = require('express');
const router = express.Router();

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

const upload = multer({ storage: storage }); // Initialize Multer

// Handle Excel file upload (use 'upload.single('file')' to handle a single file)
router.post("/excel", upload.single('file'), uploads.create); // Use 'file' to match the key in Postman form-data

// Export the routes for use in the main application
module.exports = (app) => {
  app.use("/api/uploads", router);
};
