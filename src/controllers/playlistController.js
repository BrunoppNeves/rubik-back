const Playlist = require("../models/playlistModel");
const Image = require("../models/imageModel");
const { convertBase64 } = require("../utils/handleImage");
const { isValidObjectId } = require("mongoose");
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
      //verifica se a musica ja existe na playlist
      // for (let i = 0; i < playlist.songs.length; i++) {
      //   if (playlist.songs[i] == songId) {
      //     return res.status(400).json({ err: "Song already exists" });
      //   }
      // }
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
      const playlist = await Playlist.findById(playlistId).select("songs");
      const editPlaylist = playlist.songs;
      editPlaylist.splice(editPlaylist.indexOf(songId), 1);
      await playlist.save();
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  updatePlaylist: async (req, res) => {
    const playlistId = req.params.id;
    const { name, description, isPublic } = req.body;
    try {
      if(!isValidObjectId(playlistId) || !await Playlist.findById(playlistId)){
        return res.status(400).json({ err: "Playlist não encontrada" });
      }
      const update = await Playlist.findByIdAndUpdate(playlistId,
        { name, description, isPublic },
        { new: true }
      );
      return res.status(200).json(update);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  changeVisibility: async (req, res) => {
    const id = req.params.id;
    try {
      const playlist = await Playlist.findById(req.params.id);
      const update = await Playlist.findByIdAndUpdate(
        { _id: id },
        { isPublic: !playlist.isPublic },
        { new: true }
      );
      return res.status(200).json(update);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  deletePlaylist: async (req, res) => {
    const playlistId = req.params.id;
    try {
      const playlist = await Playlist.findById(playlistId);
      await playlist.deleteOne({ id: playlistId });
      return res.status(200).json({ message: "Playlist deleted" });
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  getAllPublic: async (req, res) => {
    try {
      const playlists = await Playlist.find({ isPublic: true }).populate(
        "songs"
      );
      return res.status(200).json(playlists);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  getOnePublic: async (req, res) => {
    const playlistId = req.params.id;
    try {
      const playlist = await Playlist.find({
        _id: playlistId,
        isPublic: true,
      }).populate("songs");
      return res.status(200).json(playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  getAllPrivate: async(req, res) => {
    const { user_id } = req.params;
    try {
      const private_playlists = await Playlist.find({ createdBy: user_id }).populate( "songs" );
      return res.status(200).json(private_playlists);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  getOnePrivate: async (req, res) => {
    const { playlist_id, user_id } = req.params;
    try {
      const private_playlist = await Playlist.find({ _id: playlist_id, createdBy: user_id }).populate( "songs" );
      return res.status(200).json(private_playlist);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }

};
