import React from "react";
import Navbarjsx from "../Components/layout/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/layout/footer";

export default function Layout() {
  return (
    <div>
      <Navbarjsx />
      <Outlet />
      <Footer />
    </div>
  );
}
