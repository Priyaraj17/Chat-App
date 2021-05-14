const mongoose = require("mongoose");
const config = require("./config.js");

const DB = `mongodb://${config.db.url}/${config.db.name}`;

const mongo = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connection successful! ${DB}`));

module.exports = mongo;
