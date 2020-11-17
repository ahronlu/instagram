import React from "react";
import { ReactComponent as Spinner } from "./spinner.svg";

const AppLoader = () => {
  return (
    <div className="AppLoader">
      <Spinner />
    </div>
  );
};

export default AppLoader;
