const express = require("express");
const router = express.Router();

const featureCategoryController = require("../../controllers/featureControllers/FeatureCategoryController");

router.post("/:id", featureCategoryController.featureCategoryPost);
router.patch("/:id", featureCategoryController.featureCategoryUpdate);

module.exports = router;