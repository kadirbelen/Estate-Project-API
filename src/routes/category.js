const express = require("express");

const router = express.Router();
const authToken = require("../middlewares/auth-token");
const categoryController = require("../controllers/category");

router.post(
    "/",
    authToken.verifyAndAuthorizationToken(["admin"]),
    categoryController.categoryPost
);
router.get("/", categoryController.getSubCategory);
router.patch("/:id", categoryController.categoryUpdate);

module.exports = router;