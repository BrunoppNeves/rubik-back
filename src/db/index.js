const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db =  mongoose.connect(
      "mongodb+srv://rubik:rubik123@rubik.myhts5q.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;