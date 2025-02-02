const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.MovieList = require("./movies.model.js")(mongoose);
db.Upload = require("./upload.models.js")(mongoose);
module.exports = db;
