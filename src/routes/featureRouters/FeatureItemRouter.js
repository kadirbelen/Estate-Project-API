const express = require("express");
const router = express.Router();

const featureItemController = require("../../controllers/featureControllers/FeatureItemController");

router.post("/:id", featureItemController.featureItemPost);
router.patch("/:id", featureItemController.featureItemUpdate);

module.exports = router;