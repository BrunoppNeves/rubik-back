const express = require("express");
const playlistController = require("../controllers/playlistController");
const router = express.Router();
const multer = require("multer")();
const authMiddleware = require('../middlewares/auth');

router.get("/get/:id", playlistController.getPlaylist);

router.post("/create", multer.single("image"), playlistController.create);
router.put("/addSong", playlistController.addSong);
router.put("/removeSong", playlistController.removeSong);
router.put("/changeVisibility/:id", playlistController.changeVisibility);
router.delete("/deletePlaylist/:id", playlistController.deletePlaylist);  

module.exports = router;
