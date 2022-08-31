const express = require('express');
const multer = require("multer");
const {
  getAds,
  countAds,
  getImages,
  postAd,
  finishAd,
  addImages,
  getMyAds,
  deleteImage,
  deleteAd,
  deleteUnsavedAd,
  getAd,
  getAdsBriefly,
} = require("../controllers/ads");

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.get("/api/ads", getAds);
router.get("/api/count_ads", countAds);
router.get("/api/images/:creationDate", getImages);
router.get("/api/ad/:id", getAd);
router.get("/api/ads/:userId", getMyAds);
router.get("/api/ads-briefly", getAdsBriefly);
router.post("/ad", upload.array("imagesInput", 4), postAd);
router.put("/api/ad/:creationDate", finishAd);
router.put("/api/images", upload.array("imagesInput", 4), addImages);
router.put("/api/images/:id", deleteImage);
router.delete("/api/ad/:creationDate", deleteAd);
router.delete("/api/unsaved_ad/:creationDate", deleteUnsavedAd);

module.exports = router;