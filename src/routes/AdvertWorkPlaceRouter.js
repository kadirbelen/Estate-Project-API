const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const advertWorkPlaceController = require("../controllers/advertControllers/AdvertWorkPlaceController");

router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertWorkPlaceController.advertWorkPlacePost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertWorkPlaceController.advertWorkPlaceGetByCategory
);

module.exports = router;