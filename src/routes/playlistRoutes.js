const express = require("express");
const playlistController = require("../controllers/playlistController");
const router = express.Router();
const multer = require("multer")();

router.post("/create", multer.single("image"), playlistController.create);

module.exports = router;
