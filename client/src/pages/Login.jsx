import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/components/form.css";
import { validateToken } from "../services/tokenServices.js";

const USER_LOGIN_URI = import.meta.env.VITE_USER_LOGIN_URI;
const LOCAL_STORAGE_TOKEN_NAME = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME;

export function Login() {
  const [usernameOREmail, setUsernameOREmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calledFrom = "login";
    validateToken(navigate, calledFrom);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const user = { usernameOREmail, password };

    setLoading(true); // Start spinner

    try {
      const verifyRes = await axios.post(USER_LOGIN_URI, user);

      if (!verifyRes.data.verified) {
        setMessage("User NOT verified!");
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, verifyRes.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      setMessage(err.response.data.error);
    } finally {
      setLoading(false); // Stop spinner
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Log In</h1>
        {message && <p>{message}</p>}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usernameOrEmail">Username/Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="Username OR email"
              onChange={(event) => setUsernameOREmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="submit"
              value={loading ? "Logging in..." : "Log In"}
              disabled={!usernameOREmail || !password || loading}
            />
          </div>
        </form>
        <p className="form-footer">
          New user?
          <span>
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
