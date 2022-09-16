const express = require("express");
const playlistController = require("../controllers/playlistController");
const router = express.Router();
const multer = require("multer")();

router.post("/create", multer.single("image"), playlistController.create);
router.get("/get/:id", playlistController.getPlaylist);
router.put("/addSong", playlistController.addSong);
router.put("/removeSong", playlistController.removeSong);
router.put("/changeVisibility/:id", playlistController.changeVisibility);
router.delete("/deletePlaylist/:id", playlistController.deletePlaylist);  

module.exports = router;
