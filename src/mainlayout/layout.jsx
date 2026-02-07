import React from "react";
import Navbar from "../Components/layout/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/layout/footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
