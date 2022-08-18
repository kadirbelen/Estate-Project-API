const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");

const advertLandController = require("../controllers/advertControllers/AdvertLandController");
// upload.array("images", 2),
router.post(
    "/",
    upload.array("images", 15),
    advertLandController.advertLandPost
);
router.patch("/", advertLandController.advertLandUpdate);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertLandController.advertLandGetByCategory
);
router.get("/:id", advertLandController.advertLandGetById);
router.delete("/:id", advertLandController.advertLandDelete);

module.exports = router;