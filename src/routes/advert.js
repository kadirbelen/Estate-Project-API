const express = require("express");

const router = express.Router();
const authorization = require("../middlewares/authorization");
const authanticate = require("../middlewares/authanticate");
const validate = require("../middlewares/validation-control");
const advertController = require("../controllers/advert");
const queryOptions = require("../middlewares/query-options");

router.post(
    "/housing",
    authanticate,
    authorization(["user,admin"]),
    validate("housingSchema"),
    advertController.advertPost
);
router.post(
    "/land",
    authanticate,
    authorization(["user,admin"]),
    validate("landSchema"),
    advertController.advertPost
);
router.post(
    "/workPlace",
    authanticate,
    authorization(["user,admin"]),
    validate("workPlaceSchema"),
    advertController.advertPost
);
router.get(
    "/user",
    authanticate,
    authorization(["user,admin"]),
    queryOptions,
    advertController.advertGetByUser
);
router.get("/category/:path", queryOptions, advertController.advertGetByCategory);
router.get("/:id", advertController.advertGetById);
router.get("/", queryOptions, advertController.advertGetAll);
router.patch("/:id", advertController.advertUpdate);
router.patch(
    "/favorite/:id",
    authanticate,
    authorization(["user,admin"]),
    advertController.addFavorite
);
router.patch(
    "/unfavorite/:id",
    authanticate,
    authorization(["user,admin"]),
    advertController.deleteFavorite
);
router.delete(
    "/:id",
    authanticate,
    authorization(["user,admin"]),
    advertController.advertDelete
);

module.exports = router;
