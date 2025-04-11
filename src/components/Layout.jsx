import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterNavgationBar from "./FooterNavgationBar";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 md:ml-64 md:pt-10">
          <Outlet />
        </main>
      </div>

      <FooterNavgationBar />
    </div>
  );
};

export default Layout;
