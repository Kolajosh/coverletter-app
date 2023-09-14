import React from "react";
import { ReactComponent as PendingIcon } from "../../assets/svg/error-icon.svg";
import { ReactComponent as Close } from "../../assets/svg/Close.svg";

const CenterModal = ({
  icon = <PendingIcon />,
  title,
  subTitle,
  children,
  info,
  handleClick,
  handleClose,
  handleClick2,
  showCloseIcon,
  width = "90%",
  background = "", // Add a background prop to specify the background image
}) => {
  const modalStyle = {
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover",
  };

  return (
    <div
      onClick={handleClose}
      className="fixed font-jarkata top-0 left-0 flex justify-center items-center w-full h-full bg-black/80 p-5 z-50 overflow-scroll backdrop-filter backdrop-blur-sm"
    >
      <center className="flex justify-center items-center w-full">
        <div
          className={`h-auto w-[80vw] bg-[#191919] fixed border-black border-double border-4 z-5000 rounded-3xl py-2 overflow-y-auto `}
          style={{ maxHeight: "90vh", ...modalStyle }} // Apply the background style here
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-6 my-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-left text-black">
                {title}
              </p>
              <div className="cursor-pointer" onClick={handleClose}>
                <Close />
              </div>
            </div>
            <p className="text-[10px] font-normal text-left pt-0.5 text-nav-item-inactive">
              {subTitle}
            </p>
            <p className="text-xs text-lib-alat-black text-left">{info}</p>
            <div className="mt-6 py-2 text-left">{children}</div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CenterModal;
