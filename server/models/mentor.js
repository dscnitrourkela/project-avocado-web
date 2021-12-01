const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: Number,
  email: String,
  prefect: String,
  isActive: Boolean,
});

module.exports = mongoose.model("mentors", mentorSchema);
