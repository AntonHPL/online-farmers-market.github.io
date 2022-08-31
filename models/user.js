const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: Object,
    required: false,
  }
}, { minimize: false });

const User = mongoose.model('User', userSchema);
module.exports = User;
