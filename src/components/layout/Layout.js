import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./Layout.css";

export const Layout = props => {
  return (
    <div className="Layout">
      <Scrollbars style={{ width: "100%", height: "100%" }}>
        {props.children}
      </Scrollbars>
    </div>
  );
};
