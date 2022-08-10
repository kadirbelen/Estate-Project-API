const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validationControl");
const userController = require("../controllers/UserController");

router.post(
    "/register",
    validate("registerSchema"),
    userController.registerController
);
router.post("/login", validate("loginSchema"), userController.loginController);
router.post("/refreshToken", userController.refreshToken);
router.delete("/logOut", userController.logOut);
router.get("/verify/:id", userController.emailVerification);

module.exports = router;