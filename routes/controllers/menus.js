const Menu = require("../../models/menu");

const getMenu = (req, res) => {
  Menu
    .find()
    .then(menu => res.status(200).json(menu))
    .catch(error => console.error(error));
};

module.exports = { getMenu };