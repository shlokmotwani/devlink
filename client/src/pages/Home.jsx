// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "../styles/components/home.css";

export function Home() {
  return (
    <div className="app-container">
      <h1 className="app-title">DevLink</h1>
      <p className="subtitle">
        Your personal developer dashboard and portfolio builder.
      </p>

      <section className="intro-section">
        <h2>🔍 What is DevLink?</h2>
        <p>
          DevLink helps developers build and host a simple personal site that
          includes:
        </p>
        <ul>
          <li>🧑 Personal info and bio</li>
          <li>🔗 Social links</li>
          <li>🛠️ Skills and tech stack</li>
          <li>📁 Projects with GitHub & live URLs</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>🚀 How to Get Started</h2>
        <ol>
          <li>
            <strong>Register</strong> an account{" "}
            <Link to="/register">here</Link>
          </li>
          <li>Login and go to your dashboard</li>
          <li>Add your details, links, and projects</li>
          <li>
            Click <strong>Save</strong> and you're done!
          </li>
        </ol>
      </section>

      <section className="url-section">
        <h2>🌐 Share Your Webpage</h2>
        <p>Your public profile is available at:</p>
        <code>https://dev-link-app.netlify.app/yourusername</code>
        <p>
          Example: <code>https://dev-link-app.netlify.app/shlokmotwani</code>
        </p>
      </section>

      <Link to="/register" className="cta-button">
        Create Your Webpage
      </Link>
    </div>
  );
}
