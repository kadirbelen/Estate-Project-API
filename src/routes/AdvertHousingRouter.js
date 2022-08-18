const express = require("express");
const router = express.Router();
const upload = require("../../multerConfig");

const advertHousingController = require("../controllers/advertControllers/AdvertHousingController");
// upload.array("images", 2),
router.post(
    "/",
    upload.array("images", 15),
    advertHousingController.advertHousingPost
);
router.patch("/", advertHousingController.advertHousingUpdate);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertHousingController.advertHousingGetByCategory
);
router.get("/:id", advertHousingController.advertHousingGetById);
router.delete("/:id", advertHousingController.advertHousingDelete);

module.exports = router;