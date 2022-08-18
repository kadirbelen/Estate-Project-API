const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");

const advertWorkPlaceController = require("../controllers/advertControllers/AdvertWorkPlaceController");
// upload.array("images", 2),
router.post(
    "/",
    upload.array("images", 5),
    advertWorkPlaceController.advertWorkPlacePost
);
router.patch("/", advertWorkPlaceController.advertWorkPlaceUpdate);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertWorkPlaceController.advertWorkPlaceGetByCategory
);
router.get("/:id", advertWorkPlaceController.advertWorkPlaceGetById);
router.delete("/:id", advertWorkPlaceController.advertWorkPlaceDelete);

module.exports = router;