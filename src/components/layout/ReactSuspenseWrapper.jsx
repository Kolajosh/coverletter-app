import React from "react";
import PageLoader from "../PageLoader";

const ReactSuspenceWrapper = ({ children }) => {
  return (
    <React.Suspense fallback={<PageLoader message="Please wait" />}>
      {children}
    </React.Suspense>
  );
};

export default ReactSuspenceWrapper;
