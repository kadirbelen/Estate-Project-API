const express = require("express");
const router = express.Router();

const addressController = require("../controllers/AddressController");

router.get("/city", addressController.getCity);
router.get("/district/:cityId", addressController.getDistrictByCity);
router.get("/town/:districtId", addressController.getTownByDistrict);

module.exports = router;