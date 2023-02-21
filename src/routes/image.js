const express = require("express");

const router = express.Router();
const imageUpload = require("../middlewares/image-multer");
const authorization = require("../middlewares/authorization");
const authanticate = require("../middlewares/authanticate");
const imageController = require("../controllers/image");

router.post(
    "/upload",
    authanticate,
    authorization(["user,admin"]),
    imageUpload,
    imageController.imagePost
);
router.delete(
    "/:remoteId",
    authanticate,
    authorization(["user,admin"]),
    imageController.imageDelete
);

module.exports = router;
