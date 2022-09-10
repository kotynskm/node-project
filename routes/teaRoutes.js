// import express, router, and controller
const express = require("express");
const router = express.Router();
const teaController = require("../controllers/teaController");

// routes
router.route("/").get(teaController.getAllTeas);

module.exports = router;
