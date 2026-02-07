import React from "react";
import { Outlet } from "react-router-dom";

export default function Authlayout() {
  return (
    <div>
      <div className="text-5xl text-center text-white "></div>
      <Outlet />
    </div>
  );
}
