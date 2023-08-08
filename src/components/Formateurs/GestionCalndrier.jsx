import React from "react";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBar from "../SideBar/SideBar";
import Calendrier from "./Calendrier";
const GestionCalndrier = () => {
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
        <div style={{ height: "100%", padding: "1rem" }}>
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <Calendrier></Calendrier>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionCalndrier;
