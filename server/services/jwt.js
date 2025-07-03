import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRES_IN = "2h";

export function generateToken(user) {
  try {
    const payload = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    };
    if (user.fullName === "guest") {
      return jwt.sign(payload, SECRET_KEY);
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw new Error("Failed to generate token");
  }
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }
}
