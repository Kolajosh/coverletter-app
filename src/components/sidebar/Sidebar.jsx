import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { ReactComponent as Logo2 } from "../../assets/svg/smallLogo.svg";
import { ReactComponent as Headphones } from "../../assets/svg/headphones.svg";
import { ReactComponent as Gift } from "../../assets/svg/gift.svg";
import { ReactComponent as Logout } from "../../assets/svg/Logout.svg";
import { menu } from "./constants";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  console.log(selectedMenu);
  console.log(window.location.pathname);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(window.location.pathname);

  //   useEffect(() => {
  //     if (window.location.pathname === "/conversation") {
  //       setSelectedMenu("conversation");
  //     }
  //   }, [selectedMenu]);

  return (
    <>
      <div className="px-5 pt-5 bg-white text-center h-full lg:w-full">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <div className="lg:hidden">
          <Logo2 style={{ height: "50px", width: "50px" }} />
        </div>

        <div className="mt-10 block">
          {menu?.map(({ icon: Icon, title, key }) => (
            <div
              key={key}
              className={`${
                selectedMenu === key
                  ? "bg-[#5570F1] text-white"
                  : "text-[#45464E]"
              } ${
                activeTab === key ? "bg-[#5570F1] text-white" : "text-[#45464E]"
              } flex justify-center lg:justify-normal gap-5 mb-2 cursor-pointer text-sm font-poppins items-center py-5 px-3 rounded-xl hover:bg-[#5570F1] hover:text-white`}
              onClick={() => {
                setSelectedMenu(key);
                setActiveTab(key);
                navigate(key);
              }}
            >
              <Icon style={{ height: "20px", width: "20px" }} />
              {/* Conditionally render the title based on screen size */}
              <div className="hidden lg:block">{title}</div>
            </div>
          ))}
        </div>

        <div className="flex items-end text-sm bg-[#5E6366] bg-opacity-[10%] rounded-xl px-4 py-3 mb-5">
          <div className="flex gap-3">
            <div>
              <Headphones />
            </div>
            <div className="hidden lg:block">Contact Support</div>
          </div>
        </div>

        <div className="items-end text-sm bg-[#FFCC91] bg-opacity-[20%] rounded-xl px-4 py-3">
          <div className="flex gap-3">
            <div>
              <Gift />
            </div>
            <div className="hidden lg:block">Free Gift Awaits you!</div>
          </div>
          <div className="mt-3 text-sm text-[#6E7079] hidden lg:block">
            Upgrade your Account {">"}
          </div>
        </div>

        <div className="flex justify-center lg:justify-normal gap-3 mt-10 text-[#CC5F5F]">
          <Logout style={{ height: "30px", width: "30px" }} />
          <span className="text-xs hidden lg:block">Logout</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
