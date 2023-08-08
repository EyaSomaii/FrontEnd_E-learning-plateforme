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
import { Player } from "video-react";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBar from "../SideBar/SideBar";

const Listformations = () => {
  const history = useHistory();

  const [form, setFormations] = useState([]);

  const GetFormations = async () => {
    const data = await axios
      .get("http://localhost:3001/Formation/Formations")
      .then((result) => {
        setFormations(result.data);
      });
  };
  useEffect(() => {
    GetFormations();
  });
  return (
    <ChakraProvider>
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
              </Box>
            </Box>
          </Center>
          <Container maxW="container.xl">
            <Center>
              <SimpleGrid columns={[3, null, 4]} spacing="30px">
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
        </div>
      </div>
    </ChakraProvider>
  );
};
export default Listformations;
