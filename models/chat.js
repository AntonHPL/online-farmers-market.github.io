const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  participants: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  adId: {
    type: String,
    required: true,
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
