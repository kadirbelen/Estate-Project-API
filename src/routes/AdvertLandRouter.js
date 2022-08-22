const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");
const authToken = require("../middlewares/authToken");

const advertLandController = require("../controllers/advertControllers/AdvertLandController");
// upload.array("images", 2),
router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    upload.array("images", 15),
    advertLandController.advertLandPost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertLandController.advertLandGetByCategory
);

module.exports = router;