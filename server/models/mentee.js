const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menteeSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: Number,
  email: String,
  mentor: String,
  emoji: {
    type: Number,
    default: -1,
  },
});

module.exports = mongoose.model("mentees", menteeSchema);
