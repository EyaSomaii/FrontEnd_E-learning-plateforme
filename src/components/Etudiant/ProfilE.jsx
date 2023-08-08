import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { DownloadIcon, StarIcon } from "@chakra-ui/icons";

import {
  Badge,
  Avatar,
  Image,
  Heading,
  SimpleGrid,
  Container,
  AspectRatio,
  ChakraProvider,
  Tbody,
  Th,
  Tr,
  Td,
  TableContainer,
  Table,
  Thead,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";

import axios from "axios";
import React, { useState, useEffect } from "react";
import NavBarSA from "../NavBarSA/NavBarSA";
import SideBar from "../SideBar/SideBar";
const ProfilE = () => {
  const [cv, setcv] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [numTel, setnumTel] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [email, setemail] = useState("");
  const [user, setUser] = useState([]);
  const [image, setimage] = useState("");
  const [identif, setidentif] = useState();

  const { userId } = useParams();
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const [mescertif, setmescertif] = useState([]);

  const getEtuCertifs = async () => {
    const data = await axios.get(
      `http://localhost:3001/CertificationRoute/GetCertifDetoutFormationByIdETu/${userId}`
    );
    setmescertif(data.data);
    console.log(data);
  };
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
      setidentif(data.data[0]._id);

      setUser(data.data);
      console.log(data);
    };
    getEtuCertifs();
    getDataById();
  }, []);

  const add = async (e) => {
    try {
      {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const formData = new FormData();

        formData.append("cv", cv);

        const data = await axios.post(
          "http://localhost:3001/User/AjouterUti",
          formData
        );
        alert("ajout fait avec succés ");
        console.log(data);
      }
    } catch (error) {}
    //onClose();
  };

  return (
    <ChakraProvider>
      <div className="d-flex">
        <div>
          <SideBar></SideBar>
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

          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
              height: "100vh",
              overflowY: "hidden",
            }}
          >
            <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
              <Flex h="auto" style={{ marginTop: "2rem", padding: "2rem" }}>
                <Box
                  w="50%"
                  borderWidth="3px"
                  borderRadius="xl"
                  overflow="hidden"
                >
                  <Flex>
                    <Box p="6" w="70%">
                      <Box
                        display="flex"
                        alignItems="baseline"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                      >
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          Nom
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {nom}
                        </Box>
                      </Box>
                      <hr></hr>
                      <Box
                        display="flex"
                        alignItems="baseline"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                      >
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          Prenom
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {prenom}
                        </Box>
                      </Box>
                      <hr></hr>
                      <Box
                        display="flex"
                        alignItems="baseline"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                      >
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          E-mail
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {email}
                        </Box>
                      </Box>{" "}
                      <hr></hr>
                      <Box
                        display="flex"
                        alignItems="baseline"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                      >
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          Numéro de Téléphone
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {numTel}
                        </Box>
                      </Box>
                    </Box>
                    <Center w="30%">
                      <Avatar size="2xl" name="Segun Adebayo" src={image} />{" "}
                    </Center>
                  </Flex>
                </Box>
                <Center w="50%" marginLeft="1.5rem">
                  <p>
                    Vous êtes maintenant un membre du yocareer team , vous
                    trouvez des modules à exploiter .<br></br> Un formateur va
                    vous guider tout au long de ce parcours. <br></br>Chaque
                    module se termine par une évaluation et aprés un one to one
                    avec nos experts.
                    <br></br>Yocareer vous souhaite le courage.
                  </p>
                </Center>
              </Flex>
              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="40"
                      colorScheme="purple"
                      fontSize="xl"
                    >
                      Vos certificats
                    </Badge>
                  </Box>
                </Box>
              </Center>
              <TableContainer
                style={{
                  width: "800px",
                  marginLeft: "230px",
                }}
              >
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th scope="col">nom formation</Th>
                      <Th scope="col">Certificat</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mescertif.map((item, index) => (
                      <Tr>
                        <Th>{item.formation.Titre}</Th>
                        <Td>
                          {" "}
                          <a type="button" href={item.certif} target="_blank">
                            <DownloadIcon color="red" />
                          </a>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};
export default ProfilE;
