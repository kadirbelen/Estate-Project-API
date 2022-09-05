const express = require("express");

const router = express.Router();

const addressController = require("../controllers/AddressController");

router.get("/city", addressController.getCity);
router.get("/city/:cityId/district", addressController.getDistrictByCity);
router.get(
    "/city/district/:districtId/town",
    addressController.getTownByDistrict
);

module.exports = router;