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

      songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: false
      }],

      isPublic: {
        type: Boolean,
        required: true,
        default: true
      },

      createdBy: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false
      }],

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
  
  const Playlist = mongoose.model("Playlist", userSchema);
  module.exports = Playlist;
  