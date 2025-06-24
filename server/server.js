const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Reached GET /");
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port:${PORT}`);
});
