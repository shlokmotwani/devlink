import { jwtDecode } from "jwt-decode";

const LOCAL_STORAGE_TOKEN_NAME = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME;

export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // convert ms to seconds
    return exp < currentTime;
  } catch (err) {
    console.error("Error while checking token expiration:", err);
    return true; // treat as expired if decoding fails
  }
}

export function validateToken(navigate, calledFrom) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  if (token) {
    const expired = isTokenExpired(token);
    if (expired) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      navigate(`/${calledFrom}`);
      return;
    }
    navigate("/dashboard");
    return;
  }
}
