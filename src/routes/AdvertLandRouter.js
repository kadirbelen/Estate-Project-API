const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const advertLandController = require("../controllers/advertControllers/AdvertLandController");

router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertLandController.advertLandPost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertLandController.advertLandGetByCategory
);

module.exports = router;