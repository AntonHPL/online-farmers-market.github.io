const express = require('express');
const {
  validateToken,
  logOut,
} = require("../controllers/other");

const router = express.Router();

router.get("/api/log-out", logOut);
router.get("/api/validate-token", validateToken);

module.exports = router;