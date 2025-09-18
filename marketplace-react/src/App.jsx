import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import cartIcon from "../src/assets/shopping-cart.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { RoleProvider, useRole } from "./context/RoleContext";
import routes from "./routes";

function TopBar() {
  const { role, setRole } = useRole(); 
  const navigate = useNavigate();

  const handleAuthClick = async () => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; 
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); 
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      setRole("user");
      navigate("/");
    }
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="top-bar">
      <div style={{ marginLeft: "15px" }}>
        <h3>Marketplace</h3>
      </div>
      <div style={{ marginRight: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
        <button onClick={handleAuthClick}>
          {role === "admin" || role === "vendor" ? "Logout" : "Login"}
        </button>
        <img src={cartIcon} alt="Cart" style={{ width: "40px", height: "40px" }} />
      </div>
    </div>
  );
}

function App() {
  return (
    <RoleProvider>
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="content">
          <Sidebar />
          <div className="main-content">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
      <footer>
        <p>©S. M. Tanvir Hassan Anik</p>
      </footer>
    </Router>
    </RoleProvider>
  );
}

export default App;
