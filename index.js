const express = require("express");
const cors = require("cors");
const connectDB = require("./db/index.js");

const app = express();
const port = 5001;

connectDB();

app.get("/", (req, res) => {
  return res.send("OK");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost${port}`);
});
