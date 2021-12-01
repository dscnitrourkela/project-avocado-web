const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: String,
  email: String,
  prefect: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("mentors", mentorSchema);
