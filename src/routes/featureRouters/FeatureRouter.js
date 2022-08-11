const express = require("express");
const router = express.Router();

const featureController = require("../../controllers/featureControllers/FeatureController");

router.post("/", featureController.featurePost);
router.patch("/:id", featureController.featureUpdate);
router.get("/", featureController.featureGet);

module.exports = router;