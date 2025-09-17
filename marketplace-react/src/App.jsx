import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="top-bar">
          <h3>Marketplace</h3>
          <h3>Cart</h3>
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
    </Router>
  );
}

export default App;
