const express = require("express");
const { getProjects } = require("../controllers/projectController");
const projectRouter = express.Router();

projectRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const projects = await getProjects(Number(userId));
    return res.status(201).json(projects);
  } catch (err) {
    console.error("Error fetching user projects:", err);
    return res
      .status(500)
      .json({ error: "Internal server error while fetching user projects." });
  }
});

module.exports = { projectRouter };
