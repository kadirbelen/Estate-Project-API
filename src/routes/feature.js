const express = require("express");

const router = express.Router();
const authorization = require("../middlewares/authorization");
const authanticate = require("../middlewares/authanticate");
const featureController = require("../controllers/feature");

router.post(
    "/interior",
    authanticate,
    authorization(["admin"]),
    featureController.interiorPost
);
router.get("/interior", featureController.interiorGet);
router.patch(
    "/interior/:id",
    authanticate,
    authorization(["admin"]),
    featureController.interiorUpdate
);

router.post(
    "/external",
    authanticate,
    authorization(["admin"]),
    featureController.externalPost
);
router.get("/external", featureController.externalGet);
router.patch(
    "/external/:id",
    authanticate,
    authorization(["admin"]),
    featureController.externalUpdate
);

router.post(
    "/location",
    authanticate,
    authorization(["admin"]),
    featureController.locationPost
);
router.get("/location", featureController.locationGet);
router.patch(
    "/location/:id",
    authanticate,
    authorization(["admin"]),
    featureController.locationUpdate
);

module.exports = router;
