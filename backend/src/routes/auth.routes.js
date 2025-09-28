const express = require("express");
const authControllers = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/logout", authControllers.logoutUser); // 🔹 Added logout

router.get("/me", authUser, authControllers.getMe);

module.exports = router;
