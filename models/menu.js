const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  contents: {
    type: Array,
    required: false,
  }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
