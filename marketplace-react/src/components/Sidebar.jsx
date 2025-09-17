import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  // function to check if a route is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/product");
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className="sidebar">
      {routes
        .filter((route) => !route.hidden && route.label) // only visible routes
        .map((route) => {
          const active = isActive(route.path);
          return (
            <Link
              key={route.path}
              to={route.path}
              style={{
                display: "block",
                padding: "10px 20px",
                marginBottom: "10px",
                textDecoration: "none",
                backgroundColor: active ? "#ddd" : "#3a3a3aff",
                color: active ? "#000" : "#fff",
                borderRadius: "5px",
                textAlign: "left",
              }}
            >
              {route.label}
            </Link>
          );
        })}
    </div>
  );
}
