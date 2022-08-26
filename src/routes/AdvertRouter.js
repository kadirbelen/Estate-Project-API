const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const validate = require("../middlewares/validationControl");
const advertController = require("../controllers/AdvertController");

router.post(
    "/housing",
    validate("housingSchema"),
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertHousingPost
);
router.post(
    "/land",
    validate("landSchema"),
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertLandPost
);
router.post(
    "/workPlace",
    validate("workPlaceSchema"),
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertWorkPlacePost
);

router.get("/getById/:id", advertController.advertGetById);
router.get("/getAll", advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
router.delete("/:id", advertController.advertDelete);
router.get(
    "/getAdvertByCategory/:categoryPath",
    advertController.advertGetByCategory
);
router.get(
    "/getByUser",
    authToken.verifyAndAuthorizationToken(["user"]),
    advertController.advertGetByUser
);
module.exports = router;