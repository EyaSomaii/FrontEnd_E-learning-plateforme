import React from "react";
import NavBarSA from "../../NavBarSA/NavBarSA";
import SideBar from "../../SideBar/SideBar";
import ModifierForm from "../Formations/FormationsSA/ModifierForm";
import SideBarSA from "../SidebarSA/SideBarSA";

export const AjoutFormation = () => {
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
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <ModifierForm> </ModifierForm>
          </div>
        </div>
      </div>
    </div>
  );
};
