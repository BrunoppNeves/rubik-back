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

      image: {
        
      }
    },
    { timestamps: true }
  );
  
  const Song = mongoose.model("Song", userSchema);
  module.exports = Song;