const express = require("express");
const { updateUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.put("/:username", async (req, res) => {
  const { data } = req.body;
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
