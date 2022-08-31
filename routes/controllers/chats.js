const Chat = require("../../models/chat");

const postChat = (req, res) => {
  new Chat({
    participants: req.body.participants,
    messages: req.body.messages,
    creationDate: req.body.creationDate,
    adId: req.body.adId,
  })
    .save()
    .then(() => res.json("OK"))
    .catch(error => console.error(error));
};

const getChat = (req, res) => {
  Chat
    .findOne({ _id: req.params.id }, { messages: true })
    .then(chat => res.json(chat))
};

const getChats = (req, res) => {
  Chat
    .find({ "participants.id": req.params.userId }, { messages: { $slice: -1 } })
    .then(chats => res.json(chats))
    .catch(error => console.error(error));
};

const addMessages = (req, res) => {
  Chat
    .updateOne({ _id: req.body.id }, {
      $push: {
        messages: req.body.message,
      },
    })
    .then(() => res.json("Ok"))
    .catch(error => console.error(error));
};

const determineChatExistence = (req, res) => {
  Chat
    .findOne({ adId: req.params.adId })
    .then(chat => res.json(chat ? true : false))
};

const deleteChat = (req, res) => {
  Chat
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.json("Ok"))
    .catch(error => console.log(error))
};

module.exports = {
  postChat,
  getChats,
  addMessages,
  determineChatExistence,
  deleteChat,
  getChat,
};