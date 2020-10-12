const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coordinatorSchema = new Schema({
  name: String,
  rollNumber: String,
  contact: Number,
  email: String,
  designation: String,
  prefect: {
    type: Schema.Types.ObjectId,
    ref: 'prefect',
  },
});

module.exports = mongoose.model('coordinator', coordinatorSchema);
