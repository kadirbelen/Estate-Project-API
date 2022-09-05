const express = require("express");

const router = express.Router();
const authToken = require("../middlewares/authToken");
const categoryController = require("../controllers/CategoryController");

router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["admin"]),
    categoryController.categoryPost
);
router.get("/", categoryController.getSubCategory);
router.patch("/:id", categoryController.categoryUpdate);

module.exports = router;