const express = require('express');
const { getMenu } = require("../controllers/menus");

const router = express.Router();

router.get('/api/menu', getMenu);

module.exports = router;