const Image = require("../models/imageModel");

module.exports = {
    getImage: async (req, res) => {
        const {id} = req.params;
        try {
            const image = await Image.findById(id);
            return res.status(200).json({image});
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }
    }
}