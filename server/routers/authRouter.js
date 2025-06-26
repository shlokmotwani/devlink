const express = require("express");
const {
  checkIfUserExists,
  createUser,
  getUser,
} = require("../controllers/userController.js");
const {
  hashPassword,
  comparePasswords,
} = require("../services/hashService.js");
const { generateToken } = require("../services/jwt.js");

const authRouter = express.Router();

//REGISTER
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
    await createUser({
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

//CHECK IF USER EXISTS IN DB
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

//LOGIN
authRouter.post("/login", async (req, res) => {
  const { usernameOREmail, password } = req.body;

  if (!usernameOREmail || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await getUser(usernameOREmail);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const userWithoutPassword = {...user};
    delete userWithoutPassword[password];

    //GENERATE TOKEN
    const token = generateToken(userWithoutPassword);

    return res.status(200).json({ verified: true, token });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ error: "Internal server error during login." });
  }
});

module.exports = { authRouter };
