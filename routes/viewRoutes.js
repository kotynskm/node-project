const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

// ROUTES
router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/tea/:id", authController.isLoggedIn, viewsController.getTea);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/me", authController.protect, viewsController.getAccount);

module.exports = router;
