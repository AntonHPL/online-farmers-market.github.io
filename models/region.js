const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  cities: {
    type: Array,
    required: true,
  }
});

const Region = mongoose.model('Region', regionSchema);
module.exports = Region;
