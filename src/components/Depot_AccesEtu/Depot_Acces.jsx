import {
  Box,
  ChakraProvider,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  Table,
  FormLabel,
  Thead,
  Tbody,
  Switch,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBarF from "../Formateurs/SideBarF/SideBarF";
import NavBarSA from "../NavBarSA/NavBarSA";
import AccesLecon from "./AccesLecon";
import DepotEtudiants from "./DepotEtudiants";
import NotMyLecon from "./NotMyLecon";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
const Depot_Acces = () => {
  const [Modules, setModules] = useState([]);
  const [Open, setOpen] = useState(false);
  const [leçon, setleçon] = useState([]);
  const [leçon2, setleçon2] = useState([]);

  const [IdModule, setIdModule] = useState();
  const { IdFormation } = useParams();
  const { userId } = useParams();
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const Accees = (id) => {
    let info = {
      lecon: id,
    };

    console.log(info);
    axios.post(`http://localhost:3001/lecon/AjoutEtu/${userId}`, info);
    GetLeconAvecAcces(IdModule);
    toast.success("Accés donné avec sucées", {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    setleçon2(leçon2.filter((leçon2) => leçon2._id !== id));

    setTimeout(() => {}, 1000);
  };

  const getLeconSansAcces = async (id) => {
    const data = await axios.get(
      `http://localhost:3001/lecon/NotMyLecons_Formation/${userId}/${IdFormation}`,
      {
        params: {
          formateur: aa,
          module: id,
        },
      }
    );

    console.log(data.data);
    setleçon2(data.data);
  };

  const RetirerAccees = (id) => {
    let info = {
      lecon: id,
    };
    axios.patch(`http://localhost:3001/lecon/SuppAcces/${userId}`, info);
    getLeconSansAcces(IdModule);
    setleçon(leçon.filter((leçon) => leçon._id !== id));
    setTimeout(() => {}, 1000);
    toast.success("Accés retirer avec sucées", {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const getCom = async (id) => {
    if (Open == false) {
      setOpen(true);
    }
    setIdModule(id);
    console.log(id);
  };
  const getModuleData = async () => {
    const data = await axios.get(
      `http://localhost:3001/Module/FormateurParModule/${IdFormation}/${aa}`
    );

    setModules(data.data);
    console.log(data.data);
  };
  const handleEvent = () => {
    setOpen(false);
  };
  const GetLeconAvecAcces = async (id) => {
    let tab = [];
    const data = await axios.get(
      `http://localhost:3001/lecon/MyLecons_Formation/${userId}/${IdFormation}`,
      {
        params: {
          formateur: aa,
          module: id,
        },
      }
    );
    console.log(data.data);
    setleçon(data.data);
  };

  useEffect(() => {
    getModuleData();
  }, []);
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
              <Container maxW="l" centerContent>
                <Box
                  d="flex"
                  justifyContent="center"
                  p={3}
                  bg="white"
                  w="100%"
                  m="1px 0 15px 0"
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Text fontSize="4xl" fontFamily="Work sans">
                    Gestion des accès leçons et des dépôts
                  </Text>
                </Box>
                <Box
                  bg="white"
                  w="100%"
                  p={10}
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                      {Modules.map((item, indice) => (
                        <Tab
                          key={item._id}
                          id={item._id}
                          onClick={() => {
                            getCom(item._id);
                            setIdModule(item._id);
                            GetLeconAvecAcces(item._id);
                            getLeconSansAcces(item._id);
                          }}
                          onMouseUp={handleEvent}
                        >
                          {item.nom}{" "}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {Modules.map((c, indice) => (
                        <TabPanel>
                          {" "}
                          {Open ? (
                            <div>
                              <Tabs isFitted variant="soft-rounded">
                                <TabList mb="1em">
                                  <Tab>accès</Tab>
                                  <Tab>Pas d'accès</Tab>
                                  <Tab>dépôts</Tab>
                                </TabList>{" "}
                                <TabPanels>
                                  <TabPanel>
                                    <Table colorScheme="teal">
                                      <Thead>
                                        <Tr>
                                          <Th>Liste des lesson</Th>
                                          <Th>Acces</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        {" "}
                                        {leçon.map((item, indice) => (
                                          <Tr>
                                            <Td>{item.titre}</Td>

                                            <Td>
                                              {" "}
                                              <Button
                                                onClick={() => {
                                                  RetirerAccees(item._id);
                                                }}
                                              >
                                                {" "}
                                                Retirer acces
                                              </Button>
                                            </Td>
                                          </Tr>
                                        ))}
                                      </Tbody>
                                    </Table>
                                  </TabPanel>

                                  <TabPanel>
                                    <Table colorScheme="teal">
                                      <Thead>
                                        <Tr>
                                          <Th>Liste des lesson</Th>
                                          <Th>Accès</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        {" "}
                                        {leçon2.map((item, indice) => (
                                          <Tr>
                                            <Td>{item.titre}</Td>
                                            <Td>
                                              {" "}
                                              <Button
                                                onClick={() => Accees(item._id)}
                                              >
                                                Donner accès
                                              </Button>
                                            </Td>
                                          </Tr>
                                        ))}{" "}
                                      </Tbody>
                                    </Table>
                                  </TabPanel>

                                  <TabPanel>
                                    <DepotEtudiants md={c._id} />
                                  </TabPanel>
                                </TabPanels>
                              </Tabs>
                            </div>
                          ) : null}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </Tabs>
                </Box>
              </Container>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depot_Acces;
