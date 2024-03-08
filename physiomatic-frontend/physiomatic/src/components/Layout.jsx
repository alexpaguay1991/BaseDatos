import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 p-2 gap-2">
      <div className=" flex-shrink-0  ">
        <SideBar />
      </div>
      <div className="flex-grow flex flex-col gap-5">
        <NavBar />
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
