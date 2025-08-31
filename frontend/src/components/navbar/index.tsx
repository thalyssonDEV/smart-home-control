// import { useLocation } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="fixed bottom-4 bg-gray-100 p-3 rounded-2xl left-1/2 -translate-x-1/2 flex gap-3">
        <Link to="/comodos">
          <div
            className={`p-5 rounded-full bg-gray-200 ${
              currentPath.startsWith("/comodos") || currentPath === "/"
                ? "bg-primary"
                : ""
            }`}
          >
            <i className="fa-solid fa-house"></i>
          </div>
        </Link>
        <Link to="/dispositivos">
          <div
            className={`p-5 bg-gray-200 rounded-full ${
              currentPath.startsWith("/dispositivos") ? "bg-primary" : ""
            }`}
          >
            <i className="fa-solid fa-mobile"></i>
          </div>
        </Link>
        <Link to="/cenas">
          <div
            className={`p-5 bg-gray-200 rounded-full ${
              currentPath.startsWith("/cenas") ? "bg-primary" : ""
            }`}
          >
            <i className="fa-solid fa-clock"></i>
          </div>
        </Link>
      </div>
    </>
  );
};
