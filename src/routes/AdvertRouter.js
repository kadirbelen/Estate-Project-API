const express = require("express");
const router = express.Router();

const advertController = require("../controllers/advertControllers/AdvertController");
// upload.array("images", 2),

router.get("/:id", advertController.advertGetById);
router.get("/", advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
// router.delete("/:id", advertLandController.advertLandDelete);

module.exports = router;