import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
  Switch,
} from "@chakra-ui/react";
import SideBarF from "../Formateurs/SideBarF/SideBarF";
import NavBarSA from "../NavBarSA/NavBarSA";
import FicheEvalAd from "./FicheEvalAd";
import SideBar from "../SideBar/SideBar";
import AjoutCertif from "../Certification/AjoutCertif";
import "./ficheEval.css";
const FicheEval_Acces = () => {
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
          <div
            style={{
              height: "calc(100% - 64px)",
              overflowY: "scroll",
              width: "auto",
              position: "center",
              marginLeft: "5rem",
              marginRight: "5rem",
            }}
          >
            <ChakraProvider>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Certificat</Tab>
                  <Tab>Avis </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <AjoutCertif></AjoutCertif>
                  </TabPanel>
                  <TabPanel>
                    <FicheEvalAd />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheEval_Acces;
