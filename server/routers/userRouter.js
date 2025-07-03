const express = require("express");
const { updateUser, getUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await getUser(username);
    const updatedUser = { ...user };
    delete updatedUser["password"];
    return res.status(201).json(updatedUser);
  } catch (err) {
    console.error("Error fetching user details:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching user details." });
  }
});

userRouter.put("/:username", async (req, res) => {
  const data = req.body;
  try {
    const updatedUser = await updateUser(req.user.username, data);
    return res.status(201).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while updating user." });
  }
});

module.exports = { userRouter };
