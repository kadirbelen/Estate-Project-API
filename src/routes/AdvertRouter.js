const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");

const advertController = require("../controllers/AdvertController");

router.post(
    "/housing",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertHousingPost
);
router.post(
    "/land",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertLandPost
);
router.post(
    "/workPlace",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertWorkPlacePost
);
router.get("/:id", advertController.advertGetById);
router.get("/", advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
router.delete("/:id", advertController.advertDelete);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertController.advertGetByCategory
);

module.exports = router;