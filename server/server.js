const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { authRouter } = require("./routers/authRouter.js");
const { authenticateToken } = require("./middlewares/authenticateToken.js");
const { getUser } = require("./controllers/userController.js");
const { userRouter } = require("./routers/userRouter.js");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", authenticateToken, userRouter);

app.get("/", (req, res) => {
  res.send("Reached GET /");
});

app.get("/api/dashboard", authenticateToken, async (req, res) => {
  try {
    const user = await getUser(req.user.email);
    return res.json(user);
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw new Error("Error fetching user details. Please try again.");
  }
});

app.get("/:username", (req, res) => {
  res.send(`Reached ${req.params.username}'s profile`);
});

app.listen(PORT, () => {
  console.log(`Server started. Listening to port:${PORT}`);
});
