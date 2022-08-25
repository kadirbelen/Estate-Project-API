const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const authToken = require("../middlewares/authToken");
const imageController = require("../controllers/ImageController");

router.post(
    "/upload",
    authToken.verifyAndAuthorizationToken(["user"]),
    upload.single("image"),
    imageController.imagePost
);
router.delete(
    "/:remoteId",
    authToken.verifyAndAuthorizationToken(["user"]),
    imageController.imageDelete
);

module.exports = router;