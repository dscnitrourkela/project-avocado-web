const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menteeSchema = new Schema({
  name: String,
  rollNumber: String,
  email: String,
  contact: Number,
  mentor: String,
});

module.exports = mongoose.model('mentees', menteeSchema);
