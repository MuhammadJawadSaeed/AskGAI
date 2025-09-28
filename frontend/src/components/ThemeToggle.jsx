import React, { useEffect, useState } from "react";
import "../styles/theme.css"; // adjust path if needed

function ThemeToggle({ className = "theme-toggle" }) {
  // Load theme from localStorage or default to light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme to <html> attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light/dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "light" ? " Dark Mode" : " Light Mode"}
    </button>
  );
}

export default ThemeToggle;
