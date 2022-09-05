const express = require("express");

const router = express.Router();
const authToken = require("../middlewares/auth-token");
const featureController = require("../controllers/feature");

router.post(
    "/interior",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.interiorPost
);
router.get("/interior", featureController.interiorGet);
router.patch(
    "/interior/:id",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.interiorUpdate
);

router.post(
    "/external",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.externalPost
);
router.get("/external", featureController.externalGet);
router.patch(
    "/external/:id",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.externalUpdate
);

router.post(
    "/location",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.locationPost
);
router.get("/location", featureController.locationGet);
router.patch(
    "/location/:id",
    authToken.verifyAndAuthorizationToken(["admin"]),
    featureController.locationUpdate
);

module.exports = router;