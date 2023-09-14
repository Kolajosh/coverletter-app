import React from "react";
import Navbar from "../navbar/Navbar";
import ReactSuspenceWrapper from "./ReactSuspenseWrapper";
import Sidebar from "../sidebar/Sidebar";
import NavbarListener from "../navbar/NavbarListener";

const DashboardListenerWrapper = ({ children }) => {
  return (
    <ReactSuspenceWrapper>
      <div className="min-h-screen bg-[#191919] w-full pb-20 overflow-scroll">
        <div className="mx-auto">
          <div className="">
            <NavbarListener />
            {children}
          </div>
        </div>
      </div>
    </ReactSuspenceWrapper>
  );
};

export default DashboardListenerWrapper;
