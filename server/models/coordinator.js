const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinatorSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: String,
  email: String,
  year: Number,
  isActive: Boolean,
});

module.exports = mongoose.model("coordinator", coordinatorSchema);
