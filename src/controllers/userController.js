const User = require("../models/userModel");
const Image = require("../models/imageModel");
const bcrypt = require("bcrypt");
const { convertBase64 } = require('../utils/handleImage');
require('dotenv').config()

module.exports = {
  create: async (req, res) => {
    const {
      name,
      email,
      birthday,
      gender,
      password,
    } = req.body;

    try {
      // const avatarData = await convertBase64(req.file? req.file : undefined);
      // const avatar = await Image.create({ image: avatarData });
      // const avatarPath = process.env.IMAGE_URL + avatar._id;
      const user = await User.create({
        name: name,
        email: email,
        birthday: birthday,
        gender: gender,
        password: password,
        // imagePath: avatarPath,
        // imageId: avatar._id,
      });
      return res.status(201).json({ user: {_id: user.id, name: user.name, email: user.email }});
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  },

  getOne: async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ err: err.message });
    }
  },

  update: async (req, res) => {
    const {id} = req.params;
    const {
      name,
      email,
      birthday,
      gender,
    } = req.body;
    try {
      if(!await User.findById(id)){
        return res.status(400).send({error: "id não encontrado"});
      }
      const update = await User.findByIdAndUpdate(id,
        {name, email, birthday, gender},
        {new: true}
      );
      return res.status(200).send(update);
    } catch (err) {
      return res.status(400).send({error: "erro na atualização"});
    }
  },

  updatePassword: async (req, res) => {
    const {id} = req.params;
    const { old_password, password } = req.body;
      try {
        const user = await User.findById(id).select('+password');
        if(!user)
            return res.status(400).send({ error: 'User not found' });
        if (!await bcrypt.compare(old_password, user.password))
            return res.status(400).send({ error: 'Invalid credentials' });
        user.password = password;
        await user.save();
        return res.status(200).json({ ok: "Senha alterada" });
      } catch (err) {
        return res.status(400).send({error: err.message});
      }
  },

  delete: async(req, res) => {
    
  }

};
