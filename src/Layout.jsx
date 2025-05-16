// components/layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

const Layout = () => {
  const { pathname } = useLocation();

  // Don’t show navbar/sidebar on login or signup pages
  const hideNav = pathname === "/" || pathname === "/signup";

  return (
    <div className="app-layout">
      {!hideNav && <Navbar />}
      <div className="flex">
        {!hideNav && <Sidebar />}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
