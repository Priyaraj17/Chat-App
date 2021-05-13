import mongoose from "mongoose";
import config from "./index.js";

const DB = `mongodb://${config.db.url}/${config.db.name}`;

const mongo = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

module.exports = mongo;
