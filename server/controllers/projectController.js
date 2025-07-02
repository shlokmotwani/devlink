const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function getProjects(userId) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });
    return projects;
  } catch (err) {
    console.error("Error finding user projects:", err);
    throw new Error("Error finding user projects.");
  }
}

async function addProject(username, project) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new Error("User not found");

    const newProject = await prisma.project.create({
      data: {
        ...project,
        userId: user.id,
      },
    });

    return newProject;
  } catch (err) {
    console.error("Error adding user project:", err);
    throw new Error("Error adding user project.");
  }
}

module.exports = { getProjects, addProject };
