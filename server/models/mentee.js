const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menteeSchema = new Schema({
  name: String,
  rollNumber: {
    type: String,
    unique: true,
  },
  contact: String,
  email: String,
  mentor: String,
  emoji: {
    type: Number,
    default: -1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("mentees", menteeSchema);
