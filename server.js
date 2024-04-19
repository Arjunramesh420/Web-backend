const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import Mongoose

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Handle Mongoose Deprecation Warning
mongoose.set('strictQuery', false);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To Dynamics101" });
});

// require("./app/routes/contact.routes")(app);
require("./app/routes/movies.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000; // Change port number here
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
