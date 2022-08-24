const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const advertHousingController = require("../controllers/advertControllers/AdvertHousingController");
router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertHousingController.advertHousingPost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertHousingController.advertHousingGetByCategory
);
module.exports = router;