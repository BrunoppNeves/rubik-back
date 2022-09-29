const express = require("express");
const playlistController = require("../controllers/playlistController");
const router = express.Router();
const multer = require("multer")();
const authMiddleware = require('../middlewares/auth');

router.get("/get_one_public/:id", playlistController.getOnePublic);
router.get("/get_all_public", playlistController.getAllPublic);

router.use(authMiddleware);
router.post("/create", multer.single("image"), playlistController.create);
router.put("/addSong", playlistController.addSong);
router.put("/removeSong", playlistController.removeSong);
router.put("/changeVisibility/:id", playlistController.changeVisibility);
router.delete("/delete/:id", playlistController.deletePlaylist);  

module.exports = router;
