import React from "react";
import { Listformations } from "../Formations/Listformations";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBarSA from "./SidebarSA/SideBarSA";

export const home = () => {
  return (
    <div className="d-flex">
      <div>
        <SideBarSA />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <NavBarSA> </NavBarSA>
        <div style={{ height: "100%" }}>
        </div>
      </div>
    </div>
  );
};
