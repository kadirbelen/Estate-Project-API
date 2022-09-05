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
    authToken.verifyAndAuthorizationToken(["admin,user"]),
    userController.userProfile
);
router.delete(
    "/logout",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    userController.logout
);
router.get("/verify/:id", userController.emailVerification);

router.put(
    "/updateUser",
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    userController.userUpdate
);
router.put(
    "/updatePassword",
    validate("passwordChangeSchema"),
    authToken.verifyAndAuthorizationToken(["user,admin"]),
    userController.userPasswordUpdate
);

module.exports = router;