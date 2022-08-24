const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const authToken = require("../middlewares/authToken");

const advertController = require("../controllers/advertControllers/AdvertController");

router.get("/:id", advertController.advertGetById);
router.get("/", advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
router.delete("/:id", advertController.advertDelete);
router.post(
    "/image/upload",
    authToken.verifyAndAuthorizationToken(["user"]),
    upload.single("image"),
    advertController.advertImagePost
);

router.delete(
    "/image/:remoteId",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertImageDelete
);
// router.delete("/:id", advertLandController.advertLandDelete);

module.exports = router;