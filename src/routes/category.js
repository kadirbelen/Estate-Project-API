const express = require("express");

const router = express.Router();
const authorization = require("../middlewares/authorization");
const authanticate = require("../middlewares/authanticate");
const categoryController = require("../controllers/category");

router.post("/", authanticate, authorization(["admin"]), categoryController.categoryPost);
router.get("/", categoryController.getSubCategory);
router.patch("/:id", categoryController.categoryUpdate);

module.exports = router;
