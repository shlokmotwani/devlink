const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { authRouter } = require("./routers/authRouter.js");
const { authenticateToken } = require("./middlewares/authenticateToken.js");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Reached GET /");
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port:${PORT}`);
});
