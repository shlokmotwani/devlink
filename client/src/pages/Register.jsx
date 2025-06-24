import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <form action="" method="POST">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Robin Sharma"
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
              required
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
        <p>Already a user?  
            <span>
                <Link to="/login">Log in</Link>
            </span>
        </p>
      </div>
    </div>
  );
}
