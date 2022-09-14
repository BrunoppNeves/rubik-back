const Song = require('../models/songModel');
const Image = require('../models/imageModel');
const { convertBase64 } = require('../utils/handleImage');
require('dotenv').config()

module.exports = {
    create: async (req, res) => {
        const {
            title,
            artist,
            album,
            year,
            playPath,
            duration
        } = req.body;
        
        try {
            const avatarData = await convertBase64(req.file? req.file : undefined);
            const avatar = await Image.create({ image: avatarData });
            const avatarPath = process.env.IMAGE_URL + avatar._id;
            const song = await Song.create({
                title: title,
                artist: artist,
                album: album,
                year: year,
                duration: duration,
                playPath: playPath,
                imagePath: avatarPath,
                imageId: avatar._id,
            });
            return res.status(201).json(song);
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }
    },

    getOne: async (req, res) => {
        const {id} = req.params;
        try {
            const song = await Song.findById(id);
            return res.status(200).json(song);
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }
    },

    search: async (req, res) => {
        const { search } = req.query;
        try {
            const song = await Song.find({ $or:[{artist: { $regex: new RegExp(search, "i") } }, {title:  { $regex: new RegExp(search, "i") } }]});
            return res.status(200).json(song);
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }
    }
}