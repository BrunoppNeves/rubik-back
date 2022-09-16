const Playlist = require("../models/playlistModel");
const Image = require("../models/imageModel");
const { convertBase64 } = require("../utils/handleImage");
require("dotenv").config();

module.exports = {
  create: async (req, res) => {
    const { name, description, isPublic, createdBy } = req.body;

    try {
      const avatarData = await convertBase64(req.file ? req.file : undefined);
      const avatar = await Image.create({ image: avatarData });
      const avatarPath = process.env.IMAGE_URL + avatar._id;
      const playlist = await Playlist.create({
        name: name,
        description: description,
        isPublic: isPublic,
        createdBy: createdBy,
        imagePath: avatarPath,
        imageId: avatar._id,
      });
      return res.status(201).json(playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  addSong: async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
      const playlist = await Playlist.findById(playlistId);
      playlist.songs.push(songId);
      await playlist.save();
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  removeSong: async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
      const playlist = await Playlist.findById(playlistId).populate("songs");
      playlist.songs 
      await playlist.save();
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  updatePlaylist: async (req, res) => {},

  changeVisibility: async (req, res) => {},

  deletePlaylist: async (req, res) => {},

  getPlaylist: async (req, res) => {},
};
