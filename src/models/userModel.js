const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },

    birthday: {
      type: Date,
      required: [true, "Please provide your birthday"],
    },

    gender: {
      type: String,
      required: [true, "Please provide your genre"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },

    imagePath: {
      type: String,
    },
    imageId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  let user = this._update;

  if (user.password) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
