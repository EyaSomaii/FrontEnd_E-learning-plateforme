import React, { useState, useEffect } from "react";
import { CDBSidebar, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";
import "./SideBarE.css";
import user from "../../../images/user.png";
import { useHistory, useParams } from "react-router";

import axios from "axios";
const SideBarE = () => {
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const { userId } = useParams();
  const [cv, setcv] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [numTel, setnumTel] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [email, setemail] = useState("");
  const [occupation, setoccupation] = useState("");
  const [user, setUser] = useState([]);
  const [image, setimage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getDataById = async () => {
      const data = await axios.get(
        `http://localhost:3001/User/AfficherUtilisateur/${userId}`
      );
      setnumTel(data.data[0].numTel);
      setnom(data.data[0].nom);
      setemail(data.data[0].email);
      setAdresse(data.data[0].adresse);
      setprenom(data.data[0].prenom);
      setimage(data.data[0].image);
      setUser(data.data);
      console.log(data);
    };

    getDataById();
  }, []);
  return (
    <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#440A67">
        <div className="d-flex mt-4" style={{ marginTop: "100" }}>
          <img alt="panelImage" className="panelImage" src={image} size="xl" />
          <div>
            <h6 style={{ fontWeight: "600", marginTop: "2rem" }}> {prenom} </h6>
            <p style={{ fontSize: "0.75em" }}> {nom} </p>
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
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Tableau de bord</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to={"/profilEtudiant/" + aa}
            exact
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="table">Profil</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            exact
            to={"/FormationsEtudiants/" + aa}
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="users">Formations</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="text">
              Discussions instantannées
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebar>
    </div>
  );
};

export default SideBarE;
