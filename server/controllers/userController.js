const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function checkIfUserExists(user) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: user.username }, { email: user.email }],
      },
    });
    console.log(existingUser);
    return existingUser !== null;
  } catch (err) {
    console.error("Error checking user existence:", err);
    throw new Error("Failed to check user existence");
  }
}

async function createUser(user) {
  try {
    const createdUser = await prisma.user.create({ data: user });
    return createdUser;
  } catch (err) {
    console.error("Error creating new user:", err);
    throw new Error("Failed to create a new user");
  }
}

async function getUser(usernameOREmail) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOREmail }, { username: usernameOREmail }],
      },
    });
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Failed to fetch user");
  }
}

async function updateUser(username, data) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        username,
      },
      data: {
        bio: data.bio || "",
        avatarUrl: data.avatarUrl || "",
        resumeUrl: data.resumeUrl || "",
        socialLinks: data.socialLinks || {},
        skills: {
          set: data.skills || [],
        },
        projects: {
          set: data.projects || [],
        },
      },
    });
    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Failed to update user");
  }
}

module.exports = {
  checkIfUserExists,
  createUser,
  getUser,
  updateUser,
};
