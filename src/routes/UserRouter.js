const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.post("/refreshToken", userController.refreshToken);
router.delete("/logOut", userController.logOut);
router.get("/verify/:id", userController.emailVerification);

module.exports = router;