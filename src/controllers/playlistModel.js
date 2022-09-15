const Playlist = require('../models/playlistModel');
const Image = require("../models/imageModel");
const { convertBase64 } = require('../utils/handleImage');
require('dotenv').config()

module.exports = {
    create: async (req, res) => {
        const {
            name,
            description,
            isPublic,
            createdBy
        } = req.body;
        
        try {
            const avatarData = await convertBase64(req.file? req.file : undefined);
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

    },

    removeSong: async (req, res) => {

    },

    updatePlaylist: async(req, res) => {

    },

    deletePlaylist: async (req, res) => {

    },

    getPlaylist: async (req, res) => {

    },

}