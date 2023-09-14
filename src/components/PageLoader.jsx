import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Circle from "../assets/svg/circle.svg";
// import Kaizoku from "../assets/img/kaizoku.png";

const PageLoader = ({ message }) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add("overflow-hidden");
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, []);

  const getLoadingDots = () => {
    const dots = ".".repeat(dotCount);
    return <span className="text-white text-base">{dots}</span>;
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-95 p-5 z-[9999999] overflow-hidden backdrop-filter backdrop-blur-sm">
      <center className="z-10">
        <div className="flex justify-center items-center w-42 h-42 relative mb-6">
          {/* <img
            src={Kaizoku}
            className="w-20 animate-bounce absolute max-w-full"
            alt="logo"
          /> */}
          {/* {getLoadingDots()} */}
        </div>
        <p className="text-white text-base loading-dot">
          {message}
          {getLoadingDots()}
        </p>
      </center>
    </div>
  );
};

PageLoader.defaultProps = {
  message: "Please wait",
};

PageLoader.propTypes = {
  message: PropTypes.string,
};

export default PageLoader;
