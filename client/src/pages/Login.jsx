import { Link } from "react-router-dom";

export function Login() {
  return (
    <div>
      <div>
        <h1>Log In</h1>
      </div>
      <div>
        <form action="" method="POST">
          <div>
            <label htmlFor="username">Username/Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username OR email"
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
              required
            />
          </div>

          <div>
            <input type="submit" />
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
