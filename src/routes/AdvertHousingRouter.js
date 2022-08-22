const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");
const authToken = require("../middlewares/authToken");

const advertHousingController = require("../controllers/advertControllers/AdvertHousingController");
// upload.array("images", 2),
router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    upload.array("images", 15),
    advertHousingController.advertHousingPost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertHousingController.advertHousingGetByCategory
);
module.exports = router;