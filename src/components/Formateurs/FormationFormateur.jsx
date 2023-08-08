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

import Liste_Formations from "../Containers/Liste_Formations";
import SideBar from "../SideBar/SideBar";
const FormationsParUser = () => {
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const history = useHistory();
  const [form, setFormations] = useState([]);
  const { userId } = useParams();
  const GetFormations = async () => {
    const data = await axios
      .get(`http://localhost:3001/User/AfficherUtilisateur/${aa}`)
      .then((result) => {
        setFormations(result.data[0].formation);
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
                  <Liste_Formations props={item} />
                ))}
              </SimpleGrid>
            </Center>
          </Container>
        </div>
      </div>
    </ChakraProvider>
  );
};
export default FormationsParUser;
