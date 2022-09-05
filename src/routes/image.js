const express = require("express");

const router = express.Router();
const imageUpload = require("../middlewares/image-multer");
const authToken = require("../middlewares/auth-token");
const imageController = require("../controllers/image");

router.post(
    "/upload",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    imageUpload,
    imageController.imagePost
);
router.delete(
    "/:remoteId",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    imageController.imageDelete
);

module.exports = router;