const express = require("express");

const router = express.Router();
const authToken = require("../middlewares/authToken");
const validate = require("../middlewares/validationControl");
const advertController = require("../controllers/AdvertController");
const queryOptions = require("../middlewares/queryOptions");

router.post(
    "/housing",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    validate("housingSchema"),
    advertController.advertPost
);
router.post(
    "/land",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    validate("landSchema"),
    advertController.advertPost
);
router.post(
    "/workPlace",
    authToken.verifyAndAuthorizationToken(["user"]),
    validate("workPlaceSchema"),
    advertController.advertPost
);
router.get(
    "/user",
    queryOptions,
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    advertController.advertGetByUser
);
router.get(
    "/category/:path",
    queryOptions,
    advertController.advertGetByCategory
);
router.get("/:id", advertController.advertGetById);
router.get("/", queryOptions, advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
router.patch(
    "/favorite/:id",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    advertController.addFavorite
);
router.patch(
    "/unfavorite/:id",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    advertController.deleteFavorite
);
router.delete("/:id", advertController.advertDelete);

module.exports = router;