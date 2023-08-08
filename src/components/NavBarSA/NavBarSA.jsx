import {
  CDBBtn,
  CDBCloseIcon,
  CDBCollapse,
  CDBContainer,
  CDBDropDown,
  CDBDropDownItem,
  CDBDropDownMenu,
  CDBDropDownToggle,
  CDBNavbar,
  CDBNavbarNav,
  CDBNavBrand,
  CDBNavItem,
  CDBNavLink,
  CDBNavToggle,
} from "cdbreact";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
const NavBarSA = () => {
  const [collapse, setCollapse] = useState(false);
  const history = useHistory();

  const bgWhite = {
    backgroundColor: "white",
    borderBottom: " 1px solid black",
    color: "#f4f4f4",
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    history.push("/Login");
  };
  return (
    <CDBContainer>
      <CDBNavbar style={bgWhite} dark expand="md" scrolling>
        <CDBNavToggle
          onClick={() => {
            setCollapse(!collapse);
          }}
        />
        <CDBCollapse id="navbarCollapse1" isOpen={collapse} navbar>
          <CDBNavbarNav
            style={{ marginLeft: "84%" }}
            className="align-items-center"
          >
            <CDBNavItem>
              <CDBDropDown>
                <CDBDropDownToggle color="white">
                  <div class="row">
                    <div class="col-3">
                      {" "}
                      <i class="fa fa-cog" aria-hidden="true"></i>
                    </div>
                    <div class="col-9">
                      <p style={{ marginRight: "2px" }}>Paramétres</p>
                    </div>
                  </div>
                </CDBDropDownToggle>
                <CDBDropDownMenu dropdown>
                  <Link to="/ChangerMotDePasse">
                    <CDBDropDownItem>Changer mot de passe</CDBDropDownItem>
                  </Link>
                  <CDBDropDownItem onClick={logout}>
                    Se déconnecter
                  </CDBDropDownItem>
                </CDBDropDownMenu>
              </CDBDropDown>
            </CDBNavItem>
          </CDBNavbarNav>
        </CDBCollapse>
      </CDBNavbar>
    </CDBContainer>
  );
};
export default NavBarSA;
