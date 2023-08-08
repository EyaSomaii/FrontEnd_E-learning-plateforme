import React from "react";
import { DetailFormation } from "../Formations/DetailFormation";
import { DetailLeçon } from "../Formations/ContenuLeçon ";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBar from "../SideBar/SideBar";

export const homeF = () => {
  return (
    <div className="d-flex">
      <div>
        <SideBar />
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
          <DetailFormation />
        </div>
      </div>
    </div>
  );
};
