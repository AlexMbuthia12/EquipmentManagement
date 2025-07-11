// components/layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Sidebar from "../shared/Sidebar";

const Layout = () => {
  const { pathname } = useLocation();

  // Don’t show navbar/sidebar on login or signup pages
  const hideNav = pathname === "/" || pathname === "/signup";

  return (
    <div className="">
      {!hideNav && <Navbar />}
        <Outlet />
      </div>
  );
};

export default Layout;
