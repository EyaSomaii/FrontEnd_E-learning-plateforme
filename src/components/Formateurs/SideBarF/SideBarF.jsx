import React, { useState, useEffect } from "react";
import { CDBSidebar, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
import "./SideBarF.css";
import user from "../../../images/user.png";

const SideBarF = () => {
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  return (
    <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#440A67">
        <div className="d-flex mt-4" style={{ marginTop: "100" }}>
          <img alt="panelImage" className="panelImage" src={user} size="xl" />
          <div>
            <h6 style={{ fontWeight: "600", marginTop: "2rem" }}> F1 </h6>
            <p style={{ fontSize: "0.75em" }}> Formateur </p>
          </div>
        </div>
        <CDBSidebarMenu>
          <div
            style={{
              backgroundColor: "#93329E",
              width: "fit-content",
              marginLeft: "40px",
            }}
          ></div>
          <NavLink
            exact
            to={"/profilFormateur/" + aa}
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="user">Profil</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            exact
            to="/FormationFormateur"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="table">Formation</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="users">Etudiants</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="text">
              Discussions instantannées
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            exact
            to={"/Calendrier/" + aa}
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="certificate">
              Calendrier
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebar>
    </div>
  );
};

export default SideBarF;
