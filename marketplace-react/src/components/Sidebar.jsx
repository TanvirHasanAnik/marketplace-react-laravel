import { Link, useLocation } from "react-router-dom";
import routes from "../routes";
import { useRole } from "../context/RoleContext";

export default function Sidebar() {
  const location = useLocation();
  const { role } = useRole(); 
  const pathname = location.pathname;

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/product");
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className="sidebar">
      {routes
        .filter((route) => {
          if (route.hidden || !route.label) return false;
          if (route.path.startsWith("/manage") && role === "user") return false;
          return true;
        })
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
