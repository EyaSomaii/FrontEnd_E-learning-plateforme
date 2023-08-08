import React, { useState, useEffect } from "react";
import { Card } from "antd";
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Container,
  AspectRatio,
  ChakraProvider,
  Center,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
//import "antd/dist/antd.css";
//import Meta from "antd/lib/card/Meta";
import SideBarSA from "../SidebarSA/SideBarSA";
import NavBarSA from "../../NavBarSA/NavBarSA";
import { CDBBtn } from "cdbreact";
import { Link } from "react-router-dom";
import { Player } from "video-react";
import SideBar from "../../SideBar/SideBar";
export default function HomePageSA() {
  const history = useHistory();

  const [form, setFormations] = useState([]);

  const GetFormations = async () => {
    const data = await axios
      .get("http://localhost:3001/Formation/Formations")
      .then((result) => {
        setFormations(result.data);
        console.log(result.data[0].video);
      });
  };
  useEffect(() => {
    GetFormations();
  }, [false]);
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
            <ChakraProvider>
              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="60"
                      colorScheme="purple"
                      fontSize="2xl"
                    >
                      Liste des formations
                    </Badge>
                    <Link to="/AjoutFormation">
                      <CDBBtn
                        style={{
                          backgroundColor: "#440A67",
                          marginLeft: "150px",
                        }}
                      >
                        {" "}
                        Gerer les formations{" "}
                      </CDBBtn>
                    </Link>
                  </Box>
                </Box>
              </Center>
              <Container maxW="container.xl">
                <Center>
                  <SimpleGrid columns={[3, null, 3]} spacing="30px">
                    {form.map((item, index) => (
                      <Box
                        maxW="2xl"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <video
                          id="my_video_1"
                          controls
                          preload="none"
                          poster={item.poster}
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                        <Box p="6">
                          <Box display="flex" alignItems="baseline">
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="purple"
                              onClick={() => {
                                history.push("/DetailFormation/" + item._id);
                              }}
                            >
                              {" "}
                              Rejoindre
                            </Badge>
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {item.Titre}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Center>
              </Container>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
