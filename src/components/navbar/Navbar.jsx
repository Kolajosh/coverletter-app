import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { ReactComponent as Icon } from "../../assets/svg/navbarIcon.svg";
import { ReactComponent as Notification } from "../../assets/svg/Notification.svg";
import { ReactComponent as Home } from "../../assets/svg/Home.svg";
import { CustomButton } from "../buttons/CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstName = localStorage?.getItem("firstName");

  return (
    <>
      <div className="bg-[#191919] pt-5 flex text-white font-jarkata flex-wrap justify-between mx-20 pb-3 items-center">
        <div
          onClick={() => navigate("/")}
          className="font-poppins cursor-pointer text-xl text-[#45464E] font-medium"
        >
          <div>
            <Logo />
          </div>
        </div>
        <div className="flex text-[#939393] p-5 border border-[#2F2F2F] rounded-full gap-5 items-center">
          <div
            className={`${
              location?.pathname === "/dashboard/overview" && "text-[#FF0202]"
            }`}
            onClick={() => navigate("/dashboard/overview")}
          >
            Overview
          </div>
          {/* <div
            className={`${
              location?.pathname === "/dashboard/music" && "text-[#FF0202]"
            }`}
            onClick={() => navigate("/dashboard/music")}
          >
            Music
          </div> */}
          <div
            className={`${
              location?.pathname === "/dashboard/analytics" && "text-[#FF0202]"
            }`}
            onClick={() => navigate("/dashboard/analytics")}
          >
            Analytics
          </div>
          <div
            className={`${
              location?.pathname === "/dashboard/earnings" && "text-[#FF0202]"
            }`}
            onClick={() => navigate("/dashboard/earnings")}
          >
            Earnings
          </div>
          <div
            className={`${
              location?.pathname === "/dashboard/profile" && "text-[#FF0202]"
            }`}
            onClick={() => navigate("/dashboard/profile")}
          >
            Profile
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <Icon />
          </div>
          <div>{firstName}</div>
          <div className="rotate-180">^</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
