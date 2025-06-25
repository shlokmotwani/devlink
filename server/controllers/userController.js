const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function checkIfUserExists(user) {
  console.log("checkIfUserExists() called");
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

module.exports = { checkIfUserExists, createUser };
