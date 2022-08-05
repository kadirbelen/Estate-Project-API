const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/PropertyController");

router.post("/", propertyController.propertyPost);

module.exports = router;