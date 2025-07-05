import { Outlet } from "react-router-dom";
import "./App.css";
import "./styles/themes.css";
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
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider" />
        </label>
        <span>{theme === "light" ? "☀️ Light" : "🌙 Dark"}</span>
      </div>
      <h1>DevLink</h1>
      <Outlet />
    </div>
  );
}

export default App;
