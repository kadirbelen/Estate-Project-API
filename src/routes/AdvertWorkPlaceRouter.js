const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");
const authToken = require("../middlewares/authToken");

const advertWorkPlaceController = require("../controllers/advertControllers/AdvertWorkPlaceController");
// upload.array("images", 2),
router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["user"]),
    upload.array("images", 15),
    advertWorkPlaceController.advertWorkPlacePost
);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertWorkPlaceController.advertWorkPlaceGetByCategory
);

module.exports = router;