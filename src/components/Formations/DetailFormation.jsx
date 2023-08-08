import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  StackDivider,
  Container,
  Text,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import {
  Accordion,
  Badge,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";

import NavBarSA from "../NavBarSA/NavBarSA";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CardGrpEtu from "../Containers/CardGrpEtu";
import Depot_Acces from "../Depot_AccesEtu/Depot_Acces";
import { Fiche } from "../Evaluation/Fiche";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import SideBar from "../SideBar/SideBar";
import Swal from "sweetalert2";

//import "~video-react/dist/video-react.css";
export const DetailFormation = () => {
  const [form, setform] = useState([]);
  const { userId } = useParams();
  const [Titre, setTitre] = useState("");
  const [description_courte, setdescription_courte] = useState("");
  const [Ce_que_vous_apprendez, setCe_que_vous_apprendrez] = useState("");
  const [Prerequis, setPrérequis] = useState("");
  const [description, setdescription] = useState("");
  var [video, setvideo] = useState("");
  const [poster, setposter] = useState("");

  const [etudiants, setEtudiants] = useState([]);
  const [Modules, setModules] = useState([]);
  const [FormationId, setFormationId] = useState();
  const [isShownAD, setIsShownAD] = useState(false);
  const [isShownET, setIsShownET] = useState(false);
  const [isShownFO, setIsShownFO] = useState(false);
  const [ShowGrpEtu, setShowGrpEtu] = useState(false);
  const [GrpFOrAdmin, setGrpFOrAdmin] = useState(false);
  const [opencompetu, setopencompetu] = useState(false);
  const [showEvaluation, setshowEvaluation] = useState(false);
  const [showAdministrateur, setshowAdministrateur] = useState(false);
  const [test, settest] = useState(false);

  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const history = useHistory();

  const Module_par_formation = async () => {
    const ss = await axios.get(
      `http://localhost:3001/Formation/Module_par_formation/${userId}`
    );
    console.log(ss.data.Module[0].chapitres);
    setModules(ss.data.Module);
    console.log(Modules);
  };

  const getFicheEvaluation = async () => {
    const data = await axios.get(
      `http://localhost:3001/AcceesFicheRoute/GetUserFicheParFormation/${aa}/${userId}`
    );
    if (data.data[0].accees == true && data.data[0].ficheRempli == false) {
      setshowEvaluation(true);
    }
  };
  const ElimerEtudiant = async (IdFormation, id) => {
    Swal.fire({
      title: "Voulez vous elimener cet étudiant !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Elimination Fait Avec Succees", "", "success");
        axios.patch(
          `http://localhost:3001/User/eliminerEtud/${IdFormation}/${id}`
        );
        setEtudiants(etudiants.filter((etudiants) => etudiants._id !== id));
        setTimeout(() => {}, 1000);
      }
    });
  };
  /**groupEtu */
  const GrpEtu = async () => {
    const etu = await axios.get(
      `http://localhost:3001/User/AfficherLesEtuParIDFormation/${userId}`
    );

    setEtudiants(etu.data);
  };
  const getDataById2 = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );

    if (data.data[0].Role === "Formateur") {
      setShowGrpEtu(true);
    } else if (data.data[0].Role === "SPAdmin") {
      setGrpFOrAdmin(true);
    } else if (data.data[0].Role === "Administrateur") {
      setshowAdministrateur(true);
    }
  };

  const Detail_formation = async () => {
    const data = await axios.get(
      `http://localhost:3001/Formation/formation/${userId}`
    );
    setform(data.data);
    setTitre(data.data.Titre);
    setFormationId(data.data._id);
    setdescription_courte(data.data.description_courte);
    setCe_que_vous_apprendrez(data.data.Ce_que_vous_apprendez);
    setPrérequis(data.data.Prerequis);
    setdescription(data.data.description);
    setvideo(data.data.video);

    setposter(data.data.poster);
    console.log(data.data.video);
    settest(true);
  };
  useEffect(() => {
    getDataById2();
    GrpEtu();
    Module_par_formation();
    Detail_formation();
    getFicheEvaluation();
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
              position: "center",
              marginLeft: "5rem",
              marginRight: "5rem",
            }}
          >
            <ChakraProvider>
              <Flex style={{ padding: "1rem" }}>
                <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch"
                >
                  <Center>
                    <Heading size="xl">
                      <Box padding="1rem">{Titre}</Box>
                    </Heading>
                  </Center>
                  <Center>
                    {test ? (
                      <div
                        style={{
                          maxWidth: "500px",
                        }}
                      >
                        <video
                          id="my_video_2"
                          controls
                          preload="none"
                          poster={poster}
                        >
                          <source src={video} type="video/mp4" />
                        </video>
                      </div>
                    ) : null}
                  </Center>
                  <Box style={{ border: "groove" }}>
                    <Box>
                      {" "}
                      <Box padding="1rem">{description_courte}</Box>
                    </Box>

                    <Box>
                      {" "}
                      <Box padding="1rem">{description}</Box>
                    </Box>
                    <Box>
                      {" "}
                      <Box padding="1rem">{Ce_que_vous_apprendez}</Box>{" "}
                    </Box>
                    <Box>
                      {" "}
                      <Box padding="1rem">{Prerequis}</Box>
                    </Box>
                  </Box>
                </VStack>
              </Flex>
              <Box bg="#ead8d8" style={{ margin: "1rem", padding: "1rem" }}>
                <Heading size="md" style={{ marginBottom: "1rem" }}>
                  Contenu de la Formation
                </Heading>

                <Accordion>
                  {Modules.map((item, index) => (
                    <AccordionItem>
                      <AccordionButton
                        onClick={() => {
                          history.push(
                            "/DetailFormation/" +
                              { FormationId } +
                              "/DetailLeçon/" +
                              item._id
                          );
                        }}
                      >
                        <Heading size="xs">
                          <Box flex="1" textAlign="left">
                            {item.nom}
                          </Box>
                        </Heading>
                      </AccordionButton>
                    </AccordionItem>
                  ))}
                  {showEvaluation ? (
                    <>
                      {" "}
                      <AccordionItem>
                        <h2>
                          <AccordionButton
                            onClick={() => {
                              history.push("/Fiche/" + aa + "/" + FormationId);
                            }}
                          >
                            <Heading as="h4" size="md">
                              <Box flex="1" textAlign="left">
                                Evaluation
                              </Box>
                            </Heading>
                          </AccordionButton>
                        </h2>
                      </AccordionItem>
                    </>
                  ) : null}
                </Accordion>
              </Box>
              {ShowGrpEtu ? (
                <div>
                  <Center>
                    <Box p="6">
                      <Box display="flex" alignItems="baseline">
                        <Badge
                          borderRadius="full"
                          px="60"
                          colorScheme="purple"
                          fontSize="2xl"
                        >
                          Liste des Etudiants
                        </Badge>
                      </Box>
                    </Box>
                  </Center>
                  <Container maxW="container.xl">
                    <SimpleGrid columns={[3, null, 4]} spacing="30px">
                      {etudiants.map((item, index) => (
                        <CardGrpEtu
                          props={item}
                          IdFormation={FormationId}
                          applliste={GrpEtu}
                        />
                      ))}
                    </SimpleGrid>
                  </Container>
                </div>
              ) : null}
              {GrpFOrAdmin || showAdministrateur ? (
                <div>
                  <Center>
                    <Box p="6">
                      <Box display="flex" alignItems="baseline">
                        <Badge
                          borderRadius="full"
                          px="60"
                          bg="#c9c5c5"
                          fontSize="2xl"
                        >
                          Liste des Etudiants
                        </Badge>
                      </Box>
                    </Box>
                  </Center>
                  <Container maxW="container.xl">
                    <SimpleGrid columns={[3, null, 4]} spacing="30px">
                      {etudiants.map((item, index) => (
                        <CardGrpEtu
                          props={item}
                          IdFormation={FormationId}
                          eliminerEtudiant={() => {
                            ElimerEtudiant(FormationId, item._id);
                          }}
                          //applliste={GrpEtu}
                        />
                      ))}
                    </SimpleGrid>
                  </Container>
                </div>
              ) : null}
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
