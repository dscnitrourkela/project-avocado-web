const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prefectSchema = new Schema({
  name: String,
  rollNumber: {
    type: String,
    unique: true,
  },
  contact: String,
  email: String,
  year: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("prefect", prefectSchema);
