const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
require('dotenv').config()


module.exports = {
  login: async (req, res) => {
      const { email, password } = req.body;
      try {
          const user = await User.findOne({ email }).select('+password');
          if(!user)
              return res.status(400).send({ error: 'User not found' });
          if (!await bcrypt.compare(password, user.password))
              return res.status(400).send({ error: 'Invalid credentials' });
          
          user.password = undefined;
          
          return res.send({
              user,
              token: jwt.sign({ id: user.id }, process.env.SECRET, {
                  expiresIn: 86400,
              }),
          });
      } catch (error) {
          console.log(err);
          return res.status(403).send({ error: 'Failed on login' });
      }
    }
}