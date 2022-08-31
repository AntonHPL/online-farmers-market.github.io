const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
  images: {
    // data: Buffer,
    // contentType: String,
    type: Array,
    required: true,
  },
  textInfo: {
    type: Object,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  }
}, {minimize: false});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
