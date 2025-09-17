import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="top-bar">
          <div style={{marginLeft: "15px"}}>
            <h3>Marketplace</h3>
          </div>
          <div style={{marginRight: "15px"}}>
            <h3>Cart</h3>
          </div>
        </div>

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
  );
}

export default App;
