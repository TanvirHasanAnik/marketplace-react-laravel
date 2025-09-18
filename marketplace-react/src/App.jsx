import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import cartIcon from "../src/assets/shopping-cart.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { RoleProvider, useRole } from "./context/RoleContext";
import routes from "./routes";

function TopBar() {
  const { role, setRole } = useRole(); 
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (role === "admin" || role === "vendor") {
      setRole("user"); 
      localStorage.removeItem("authToken"); 
      navigate("/");
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
