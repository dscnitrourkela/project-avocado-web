const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const importantDocumentsSchema = new Schema({
  title: String,
  link: String,
});

module.exports = mongoose.model('importantdoc', importantDocumentsSchema);
