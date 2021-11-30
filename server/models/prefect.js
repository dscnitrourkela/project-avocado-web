const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prefectSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: Number,
  year: Number,
  email: String,
  coordinator: String,
});

module.exports = mongoose.model("prefect", prefectSchema);
