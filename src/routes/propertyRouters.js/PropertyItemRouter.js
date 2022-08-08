const express = require("express");
const router = express.Router();

const propertyItemController = require("../../controllers/propertyControllers/PropertyItemController");

router.post("/:id", propertyItemController.propertyItemPost);
router.patch("/:id", propertyItemController.propertyItemUpdate);

module.exports = router;