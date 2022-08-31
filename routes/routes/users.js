const express = require('express');
const multer = require("multer");
const {
  getUser,
  verifyEmail,
  addAccountImage,
  logIn,
  signUp,
  getAccountImage,
  getSeller,
  getSellers,
} = require("../controllers/users");

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.get("/api/verify-email", verifyEmail);
router.get("/api/account-image/:userId", getAccountImage);
router.get("/api/user/:id", getUser);
router.get("/api/seller/:id", getSeller);
router.get("/api/sellers", getSellers);
router.post("/api/log-in", logIn);
router.post("/api/sign-up", signUp);
router.put("/api/account-image", upload.single("imageInput"), addAccountImage);

module.exports = router;