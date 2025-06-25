import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Password hashing failed");
  }
}

export async function comparePasswords(plainText, hashedPassword) {
    try {
      return await bcrypt.compare(plainText, hashedPassword);
    } catch (err) {
      console.error("Error comparing passwords:", err);
      return false;
    }
  }
  