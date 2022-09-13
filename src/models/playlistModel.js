const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
      description: {
        type: String,
        required: false,
      },

      songs: {
        //array de musicas, fazer relação
      },

      is_public: {
        type: Boolean,
        required: true,
        default: true
      },

      user: {
        //relação com usuario
      }
    },
    { timestamps: true }
  );
  
  const Playlist = mongoose.model("Playlist", userSchema);
  module.exports = Playlist;
  