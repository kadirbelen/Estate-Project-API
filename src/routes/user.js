const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validation-control");
const userController = require("../controllers/user");
const authorization = require("../middlewares/authorization");
const authanticate = require("../middlewares/authanticate");

router.post("/register", validate("registerSchema"), userController.registerController);
router.post("/login", validate("loginSchema"), userController.loginController);
router.post("/refreshToken", userController.refreshToken);
router.get(
    "/profile",
    authanticate,
    authorization(["user,admin"]),
    userController.userProfile
);
router.delete(
    "/logout",
    authanticate,
    authorization(["user,admin"]),
    userController.logout
);
router.get("/verify/:token", userController.emailVerification);

router.put(
    "/updateUser",
    authanticate,
    authorization(["user,admin"]),
    userController.userUpdate
);
router.put(
    "/updatePassword",
    authanticate,
    authorization(["user,admin"]),
    validate("passwordChangeSchema"),
    userController.userPasswordUpdate
);

module.exports = router;
