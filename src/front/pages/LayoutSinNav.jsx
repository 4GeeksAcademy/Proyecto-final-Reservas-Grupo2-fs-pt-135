
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LayoutSinNav = () => {
  return (
    <div className="layout-sin-nav">
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LayoutSinNav;