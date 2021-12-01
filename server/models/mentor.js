const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: String,
  rollNumber: {
    type: String,
    unique: true,
  },
  contact: String,
  email: String,
  prefect: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("mentors", mentorSchema);
