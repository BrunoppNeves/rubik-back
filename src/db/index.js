const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/rubik", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;