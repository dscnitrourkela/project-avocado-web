const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: String,
  designation: String,
  year: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("faculty", facultySchema);
