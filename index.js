const express = require("express");
const cors = require("cors");
const { appendFile, realpathSync } = require("fs");

const app = express();
const port = 5001;
app.get("/", (req, res) => {
  return res.send("OK");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost${port}`);
});
