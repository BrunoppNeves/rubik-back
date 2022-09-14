const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      artist: {
        type: String,
        required: true,
      },
  
      album: {
        type: String,
        required: true,
      },

      year: {
        type: String,
        required: true,
      },

      duration: {
        type: String,
        required: true
      },

      playPath: {
        type: String,
        required: false
      },

      imagePath: {
        type: String,
        required: false,
      },
      imageId: {
        type: String,
        required: false
      },
    },
    { timestamps: true }
  );
  
  const Song = mongoose.model("Song", songSchema);
  module.exports = Song;