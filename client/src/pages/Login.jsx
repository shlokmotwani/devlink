import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const USER_LOGIN_URI = import.meta.env.VITE_USER_LOGIN_URI;
const LOCAL_STORAGE_TOKEN_NAME = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME;

export function Login() {
  const [usernameOREmail, setUsernameOREmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const user = { usernameOREmail, password };

    try {
      const verifyRes = await axios.post(USER_LOGIN_URI, user);

      if (!verifyRes.data.verified) {
        console.log("User NOT verified!");
        setMessage("User NOT verified!");
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, verifyRes.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <div>
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
              value="Log In"
              disabled={!usernameOREmail || !password}
            />
          </div>
        </form>
        <p>
          New user?
          <span>
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
