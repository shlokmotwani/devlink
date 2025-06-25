const express = require("express");
const {
  checkIfUserExists,
  createUser,
} = require("../controllers/userController.js");
const { hashPassword } = require("../services/hashService.js");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const userExists = await checkIfUserExists({ username, email });

    if (userExists) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    const userWithoutPassword = {
      fullName,
      username,
      email,
    };

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error("Error registering user:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while registering user." });
  }
});

authRouter.post("/login", (req, res) => {
  res.send("Reached POST /login");
});

authRouter.post("/check-user", async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ error: "Username or email is required." });
  }

  try {
    const user = { username, email };
    const exists = await checkIfUserExists(user);
    return res.status(200).json({ exists });
  } catch (err) {
    console.error("Error checking user existence:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { authRouter };
