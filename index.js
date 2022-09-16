require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/index.js");

const app = express();
const port = 5001;
app.use(express.json());

connectDB();

app.all('*', require("./src/routes/index.js"));

app.get("/", (req, res) => {
  return res.send("OK");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
