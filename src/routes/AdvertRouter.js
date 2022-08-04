const express = require("express");
const router = express.Router();

const advertController = require("../controllers/AdvertController");

router.post("/", advertController.advertPost);
router.patch("/", advertController.advertUpdate);
router.get("/:id", advertController.advertGetByCategory);
router.delete("/", advertController.advertDelete);

module.exports = router;