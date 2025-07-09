import { Outlet } from "react-router-dom";
import "./App.css";
import "./styles/themes.css";
import "./styles/components/theme-toggle.css";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  }

  return (
    <div>
      <div className="theme-toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
        <span className="theme-label">
          {theme === "light" ? "☀️ Light" : "🌙 Dark"}
        </span>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
