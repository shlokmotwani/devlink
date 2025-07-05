import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import "../styles/components/form.css";
import { validateToken } from "../services/tokenServices.js";

const USER_CHECK_URI = import.meta.env.VITE_USER_CHECK_URI;
const USER_REGISTER_URI = import.meta.env.VITE_USER_REGISTER_URI;
const LOCAL_STORAGE_TOKEN_NAME = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME;

export function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calledFrom = "register";
    validateToken(navigate, calledFrom);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const user = { fullName, username, email, password };

    setLoading(true); // Start spinner

    try {
      const checkRes = await axios.post(USER_CHECK_URI, { username, email });
      if (checkRes.data.exists) {
        setMessage("User already exists. Try logging in.");
        return;
      }

      const registerRes = await axios.post(USER_REGISTER_URI, user);
      console.log("Registration successful:", registerRes.data);
      setMessage("Registered successfully! 🎉");

      // TODO: redirect to login page here
      navigate("/login");
    } catch (err) {
      console.error("API error:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop spinner
    }
  }

  return (
    <div className="form-container register">
      <div className="form-header">
        <h1>Register</h1>
        {message && <p>{message}</p>}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Robin Sharma"
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              onChange={(event) => setUsername(event.target.value.toLowerCase())}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="robinsharma@5amclub.in"
              onChange={(event) => setEmail(event.target.value.toLowerCase())}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value={loading ? "Registering..." : "Register"}
              disabled={!password || password !== confirmPassword || loading}
            />
          </div>
        </form>
        <p className="form-footer">
          Already a user?{" "}
          <Link to="/login">
            <strong>Log in</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
