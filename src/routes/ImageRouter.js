const express = require("express");

const router = express.Router();
const imageUpload = require("../middlewares/imageMulter");
const authToken = require("../middlewares/authToken");
const imageController = require("../controllers/ImageController");

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