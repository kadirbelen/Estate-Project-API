const express = require("express");

const router = express.Router();

const featureController = require("../controllers/FeatureController");

router.post("/interior", featureController.interiorPost);
router.get("/interior", featureController.interiorGet);
router.patch("/interior/:id", featureController.interiorUpdate);

router.post("/external", featureController.externalPost);
router.get("/external", featureController.externalGet);
router.patch("/external/:id", featureController.externalUpdate);

router.post("/location", featureController.locationPost);
router.get("/location", featureController.locationGet);
router.patch("/location/:id", featureController.locationUpdate);

module.exports = router;