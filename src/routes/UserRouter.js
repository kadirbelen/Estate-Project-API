const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validationControl");
const userController = require("../controllers/UserController");
const authToken = require("../middlewares/authToken");

router.post(
    "/register",
    validate("registerSchema"),
    userController.registerController
);
router.post("/login", validate("loginSchema"), userController.loginController);
router.post("/refreshToken", userController.refreshToken);
router.get(
    "/profile",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    userController.userProfile
);
router.delete(
    "/logOut",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    userController.logOut
);
router.get("/verify/:id", userController.emailVerification);

module.exports = router;