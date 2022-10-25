const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

// middleware
router.use(authController.isLoggedIn);
// ROUTES
router.get("/", viewsController.getOverview);
router.get("/tea/:id", viewsController.getTea);
router.get("/login", viewsController.getLoginForm);

module.exports = router;
