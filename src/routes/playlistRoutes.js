const express = require("express");
const playlistController = require("../controllers/playlistController");
const router = express.Router();
const multer = require("multer")();
const authMiddleware = require('../middlewares/auth');

router.get("/get_one_public/:id", playlistController.getOnePublic);
router.get("/get_all_public", playlistController.getAllPublic);
router.get("/get_playlist/:id", playlistController.getOnePlaylist);

router.use(authMiddleware);
router.post("/create", multer.single("image"), playlistController.create);
router.get("/get_all_private/:user_id", playlistController.getAllPrivate);
router.get("/get_one_private/:user_id/:playlist_id", playlistController.getOnePrivate);

router.put("/update/:id", playlistController.updatePlaylist);
router.put("/addSong", playlistController.addSong);
router.put("/removeSong", playlistController.removeSong);
router.put("/changeVisibility/:id", playlistController.changeVisibility);
router.delete("/delete/:id", playlistController.deletePlaylist);  

module.exports = router;
