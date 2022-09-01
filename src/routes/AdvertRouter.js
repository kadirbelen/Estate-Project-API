const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");
const validate = require("../middlewares/validationControl");
const advertController = require("../controllers/AdvertController");
const queryOptions = require("../middlewares/queryOptions");

router.post(
    "/housing",
    authToken.verifyAndAuthorizationToken(["user"]),
    validate("housingSchema"),
    advertController.advertPost
);
router.post(
    "/land",
    authToken.verifyAndAuthorizationToken(["user"]),
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
    authToken.verifyAndAuthorizationToken(["user"]),
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
router.delete("/:id", advertController.advertDelete);

module.exports = router;