const express = require("express");
const router = express.Router();

const locationController = require("../controllers/featureControllers/LocationFeatureController");
const externalController = require("../controllers/featureControllers/ExternalFeatureController");
const interiorController = require("../controllers/featureControllers/InteriorFeatureController");

router.post("/interior", interiorController.interiorPost);
router.get("/interior", interiorController.interiorGet);
router.patch("/interior/:id", interiorController.interiorUpdate);

router.post("/external", externalController.externalPost);
router.get("/external", externalController.externalGet);
router.patch("/external/:id", externalController.externalUpdate);

router.post("/location", locationController.locationPost);
router.get("/location", locationController.locationGet);
router.patch("/location/:id", locationController.locationUpdate);

module.exports = router;