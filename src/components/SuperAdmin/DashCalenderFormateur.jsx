import { Badge, Box, Center, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import FormateurDashBoard from "../Formations/FormateurDashBoard";
import Calendrier from "../Formateurs/Calendrier";
import SideBarSA from "./SidebarSA/SideBarSA";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBar from "../SideBar/SideBar";
const DashCalenderFormateur = () => {
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
              margin: "auto",
              padding: "5rem",
              position: "center",
            }}
          >
            {" "}
            <ChakraProvider>
              <FormateurDashBoard />
              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="60"
                      bg="#c9c5c5"
                      fontSize="2xl"
                    >
                      Calendrier
                    </Badge>
                  </Box>
                </Box>
              </Center>
              <Calendrier></Calendrier>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCalenderFormateur;
