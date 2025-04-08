import PendingIcon from "../../assets/svg/error-icon.svg?react";
import CloseIcon from "../../assets/svg/Close.svg?react";
import { ReactNode } from "react";

type CenterModalProps = {
  icon?: ReactNode;
  title: string;
  subTitle?: string;
  children: ReactNode;
  info?: string;
  handleClick?: () => void;
  handleClose: () => void;
  handleClick2?: () => void;
  showCloseIcon?: boolean;
  width?: string;
  background?: string; // Background image URL
};

const CenterModal = ({
  icon = <PendingIcon />, // Default icon
  title,
  subTitle,
  children,
  info,
  handleClick,
  handleClose,
  handleClick2,
  showCloseIcon,
}: CenterModalProps) => {
  return (
    <div
      onClick={handleClose}
      className="fixed font-jarkata top-0 left-0 flex justify-center items-center w-full h-full bg-black/0 p-5 z-50 overflow-scroll backdrop-filter backdrop-blur-sm"
    >
      <center className="flex justify-center text-white items-center w-full">
        <div
          className="h-auto w-[80vw] bg-[#252525] fixed border-[#6b6b6b] border z-5000 rounded-lg py-2 overflow-y-auto"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-6 my-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-left text-white">
                {title}
              </p>
              {showCloseIcon && (
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              )}
            </div>
            {subTitle && (
              <p className="text-[10px] font-normal text-left pt-0.5 text-nav-item-inactive">
                {subTitle}
              </p>
            )}
            {info && (
              <p className="text-xs text-lib-alat-black text-left">{info}</p>
            )}
            <div className="mt-6 py-2 text-left">{children}</div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CenterModal;
