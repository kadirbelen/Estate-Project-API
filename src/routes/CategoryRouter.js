const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/CategoryController");

router.post("/", categoryController.categoryPost);
router.get("/", categoryController.getSubCategory);
router.patch("/:id", categoryController.categoryUpdate);

module.exports = router;