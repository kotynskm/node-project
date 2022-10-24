const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/viewsController");

// ROUTES
router.get("/", viewsController.getOverview);
router.get("/tea/:id", viewsController.getTea);

module.exports = router;
