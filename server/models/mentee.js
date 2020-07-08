const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menteeSchema = new Schema({
  name: String,
  rollNumber: String,
  email: String,
  contact: Number,
  mentor: String,
  // prefect: String,
  // coordinator: String,
});

module.exports = mongoose.model("mentee_sample", menteeSchema);
