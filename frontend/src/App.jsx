import { useEffect } from "react";
import { useState } from "react";

import "./App.css";
import AppRoutes from "./AppRoutes";

function App() {
  useEffect(() => {
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
