const express = require('express');
const { getRegions } = require("../controllers/regions");

const router = express.Router();

router.get("/api/regions", getRegions);

module.exports = router;