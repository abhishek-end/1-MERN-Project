const mongoose = require("mongoose");
const conn = mongoose
  .connect(process.env.ATLAS_URL)
  .then((db) => {
    console.log("DB is connected 📚");
    return db;
  })
  .catch((err) => {
    console.error("Connection Error");
  });

module.exports = conn;
