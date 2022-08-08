const express = require("express");
const router = express.Router();

const propertyCategoryController = require("../../controllers/propertyControllers/PropertyCategoryController");

router.post("/:id", propertyCategoryController.propertyCategoryPost);
router.patch("/:id", propertyCategoryController.propertyCategoryUpdate);

module.exports = router;