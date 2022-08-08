const express = require("express");
const router = express.Router();

const propertyController = require("../../controllers/propertyControllers/PropertyController");

router.post("/", propertyController.propertyPost);
router.patch("/:id", propertyController.propertyUpdate);
router.get("/", propertyController.propertyGet);

module.exports = router;