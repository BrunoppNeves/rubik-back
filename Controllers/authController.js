const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: async (req, res) => {
    const {
      name,
      email,
      birthday,
      genre,
      checkbox1,
      checkbox2,
      checkbox3,
      password,
    } = req.body;

    try {
      const user = await User.create({
        name: name,
        email: email,
        birthday: birthday,
        genre: genre,
        checkbox1: checkbox1,
        checkbox2: checkbox2,
        checkbox3: checkbox3,
        password: password,
      });
      return res.status(201).json({ user: user });
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },
};
