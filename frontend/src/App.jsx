import "./App.css";
import AppRoutes from "./AppRoutes";
import ThemeToggle from "./components/ThemeToggle"; // 🔹 Import ThemeToggle

function App() {
  return (
    <>
      {/* Theme toggle icon placed globally */}
      <div style={{ display:'none', position: "absolute", top: "1rem", right: "1rem" }}>
        <ThemeToggle />
      </div>

      <AppRoutes />
    </>
  );
}

export default App;
