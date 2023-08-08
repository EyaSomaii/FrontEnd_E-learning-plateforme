import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ContenuLeçon } from "./ContenuLeçon ";
import {
  AddIcon,
  ChevronRightIcon,
  DownloadIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import NavBarSA from "../NavBarSA/NavBarSA";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Home } from "@mui/icons-material";
import DropFileInput from "../DropFileInput/DropFileInput";
import { ImageConfig } from "../DropFileInput/config/ImageConfig.js";
import { HomePageLeçon } from "./HomePageLeçon";
import { DetailFormation } from "../Formations/DetailFormation";
import Forum from "../Forum/Forum";
import SideBar from "../SideBar/SideBar";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/Logo-YoCareer.jpg";
import Moment from "react-moment";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
export function DetailLeçon() {
  const [chap, setchap] = useState([]);
  const [chapitre, setchapitre] = useState([]);
  const [leçon, setleçon] = useState([]);
  const [valeur, setvaleur] = useState("");
  const [module, setmodule] = useState([]);
  const [TitreModule, setTitreModule] = useState("");
  const [lecon, setlecon] = useState([]);
  const [Id, setId] = useState();
  const [Idchap, setIdchap] = useState();
  const [isShown, setIsShown] = useState(false);
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const { userId } = useParams();
  const [open, setopen] = useState(false);
  const [isShownAD, setIsShownAD] = useState(false);
  const [isShownET, setIsShownET] = useState(false);
  const [isShownFO, setIsShownFO] = useState(false);
  const [isShownadministrateur, setisShownadministrateur] = useState(false);

  const [depot, setDepot] = useState([]);
  const [Titre, setTitre] = useState("");
  const [Datedebut, setDatedebut] = useState("");
  const [Docs, setDocs] = useState("");
  const [Datefin, setDatefin] = useState("");
  const [lessonId, setlessonId] = useState("");
  const [fileList, setFileList] = useState([]);
  const [Docx, setDocx] = useState();
  const [message, setMessage] = useState("");
  const [openHP, setopenHP] = useState(true);
  const [Mydepot, setMydepot] = useState([]);
  const [show, setShow] = useState(false);
  const [size, setSize] = React.useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mylecon, setmylecon] = useState([]);
  const [nomformateur, setnomformateur] = useState("");
  const [prenomformateur, setprenomformateur] = useState("");
  const [numtelformateur, setnumtelformateur] = useState("");
  const [emailformateur, setemailformateur] = useState("");
  const [imageformateur, setimageformateur] = useState("");
  const [PrgmModule, setPrgmModule] = useState([]);
  const [showespacedp, setshowespacedp] = useState(false);
  const [IddepotFormateur, setIddepotFormateur] = useState("");
  const [accesDonnerAcces, setaccesDonnerAcces] = useState(false);

  const afficherespacedepot = (id) => {
    setshowespacedp(true);
    setIddepotFormateur(id);
  };
  const openHomePage = () => {
    if (openHP == false) setopenHP(true);
    setopen(false);
  };
  const monDepot = (id) => {
    const data = axios
      .get(`http://localhost:3001/DepotETU/GetDepots/${aa}`, {
        params: {
          lessonId: id,
        },
      })
      .then((result) => {
        setMydepot(result.data);
        console.log(result);
      });
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    setDocx(e.target.files[0]);
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
    console.log(fileList);
  };
  const add = (id) => {
    console.log(id);
    const formdata = new FormData();

    formdata.append("Docs", Docx);
    formdata.append("lessonId", lessonId);

    axios.post(
      `http://localhost:3001/DepotETU/AjouterDepot/${aa}/${userId}/${id}`,
      formdata
    );
    monDepot(Id);
  };
  const handleClick = () => {
    onOpen();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!Titre || !Datedebut || !Datefin || !Docs) {
      toast.warning("Il faut remplir tout les champs!", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("Titre", Titre);
      formData.append("Datedebut", Datedebut);
      formData.append("Datefin", Datefin);
      formData.append("Docs", Docs);
      formData.append("lessonId", lessonId);
      await axios.post(
        `http://localhost:3001/Depot/AjouterDepot/${Id}`,
        formData
      );

      GetdepotFormateur(Id);
    } catch (error) {}

    //onClose();
  };
  const SuppDepotFormateur = async (id) => {
    Swal.fire({
      title: "Voulez vous supprimer ce travail !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios
          .delete(`http://localhost:3001/Depot/Retirer/${id}`)
          .then((res) => {
            setDepot(depot.filter((depot) => depot._id !== id));
            setTimeout(() => {}, 1000);
          });
      }
    });
  };
  const SuppDepotEtud = (id) => {
    Swal.fire({
      title: "Voulez vous supprimer votre travail !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios
          .delete(`http://localhost:3001/DepotETU/ReirerMonDepot/${id}`)
          .then((res) => {
            setMydepot(Mydepot.filter((Mydepot) => Mydepot._id !== id));
            setTimeout(() => {}, 1000);
          });
      }
    });
  };
  const GetdepotFormateur = async (id) => {
    await axios
      .get(`http://localhost:3001/Depot/GetDepots/${id}`)
      .then((res) => {
        setDepot(res.data);
      });
  };
  /**  useEffect(async () => {
    await axios
      .get(`http://localhost:3001/Depot/GetDepots/${Id}`)
      .then((res) => {
        setDepot(res.data);
      });
  });*/
  const handleLoginClick = (id, id2) => {
    if (open == false) setopen(true);
    const data = axios
      .get(`http://localhost:3001/Chapitre/chapitre/${id}`)
      .then((result) => {
        console.log(result.data[0]);
        setchapitre(result.data[0]);
        setleçon(result.data[0].lecon);
        console.log(result.data);
      });
  };

  const handleEvent = () => {
    setopen(false);
  };
  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );

    if (data.data[0].Role === "Etudiant") {
      setIsShownET(true);
    } else if (data.data[0].Role === "Formateur") {
      setIsShownFO(true);
    } else if (data.data[0].Role === "SPAdmin") {
      setIsShownAD(true);
    } else if (data.data[0].Role === "Administrateur") {
      setisShownadministrateur(true);
    }
  };
  useEffect(() => {
    const Detail_formation = () => {
      const data = axios
        .get(`http://localhost:3001/Module/chapitre/${userId}`)
        .then((result) => {
          setmodule(result.data);
          setchap(result.data.chapitres);
          setlecon(result.data.chapitres[0].lecon);
          console.log(result.data.chapitres[0].lecon);
        });
    };
    const GetProgrammeModule = () => {
      const data = axios
        .get(
          `http://localhost:3001/Chapitre/AfficherChpLeconAvecIdModule/${userId}`
        )
        .then((result) => {
          setPrgmModule(result.data);
        });
    };
    const GetTitreModule = () => {
      const data = axios
        .get(`http://localhost:3001/Module/module/${userId}`)
        .then((result) => {
          console.log(result.data);
          setTitreModule(result.data.nom);
          setnomformateur(result.data.formateur.nom);
          console.log(result.data.formateur._id);
          console.log(aa);
          if (result.data.formateur._id == aa) {
            setaccesDonnerAcces(true);
          }
          setprenomformateur(result.data.formateur.prenom);
          setemailformateur(result.data.formateur.email);
          setimageformateur(result.data.formateur.image);
          setnumtelformateur(result.data.formateur.numTel);
        });
    };
    const getMyLecon = () => {
      axios
        .get(`http://localhost:3001/lecon/getMyLecon/${userId}`, {
          params: {
            idEtud: aa,
          },
        })
        .then((res) => {
          setmylecon(res.data);
        });
    };
    getDataById();
    GetTitreModule();
    Detail_formation();
    getMyLecon();
    GetProgrammeModule();
    //monDepot();
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
        <div style={{ height: "100%", padding: "1rem" }}>
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <ChakraProvider>
              <Box bg="#93329E" h="10%">
                <Center>
                  <Heading color="white" as="h2" size="xl" isTruncated>
                    <Box style={{ textAlign: "center", marginTop: "15px" }}>
                      {TitreModule}
                    </Box>
                  </Heading>
                </Center>
              </Box>
              <Grid
                templateColumns="repeat(5, 1fr)"
                gap={6}
                marginTop="1.5rem"
                marginLeft="3rem"
              >
                <IconButton
                  size="sm"
                  bg="#acc7e2"
                  icon={<Home />}
                  h="6"
                  onClick={() => {
                    openHomePage();
                  }}
                />

                {PrgmModule.map((item, index) => (
                  <GridItem w="100%" h="8">
                    <Grid templateColumns="repeat(8, 1fr)" key={index}>
                      {" "}
                      {isShownET ? (
                        <>
                          {mylecon.map((x, indice) => {
                            if (x.ChapId == item._id) {
                              return (
                                <Tooltip label={x.titre}>
                                  <Button
                                    style={{ marginRight: "0.25rem" }}
                                    w="40%"
                                    bg="#acc7e2"
                                    h="6"
                                    key={indice}
                                    id={indice}
                                    onClick={() => {
                                      setId(x._id);
                                      setlessonId(x._id);
                                      setIdchap(item._id);
                                      handleLoginClick(item._id, x._id);
                                      monDepot(x._id);
                                      GetdepotFormateur(x._id);
                                      setopenHP(false);
                                    }}
                                    onMouseUp={handleEvent}
                                  />
                                </Tooltip>
                              );
                            }
                            return null;
                          })}{" "}
                        </>
                      ) : null}
                      {isShownFO ? (
                        <>
                          {item.lecon.map((x, indice) => {
                            return (
                              <Tooltip label={x.titre}>
                                <Button
                                  style={{ marginRight: "0.25rem" }}
                                  w="40%"
                                  bg="#acc7e2"
                                  h="6"
                                  key={indice}
                                  id={indice}
                                  onClick={() => {
                                    setId(x._id);
                                    setlessonId(x._id);
                                    setIdchap(item._id);
                                    handleLoginClick(item._id, x._id);
                                    monDepot(x._id);
                                    GetdepotFormateur(x._id);
                                    setopenHP(false);
                                  }}
                                  onMouseUp={handleEvent}
                                />
                              </Tooltip>
                            );
                          })}{" "}
                        </>
                      ) : null}
                      {isShownAD || isShownadministrateur ? (
                        <>
                          {item.lecon.map((x, indice) => {
                            return (
                              <Tooltip label={x.titre}>
                                <Button
                                  style={{ marginRight: "0.25rem" }}
                                  w="40%"
                                  bg="#acc7e2"
                                  h="6"
                                  key={indice}
                                  id={indice}
                                  onClick={() => {
                                    setId(x._id);
                                    setlessonId(x._id);
                                    setIdchap(item._id);
                                    handleLoginClick(item._id, x._id);
                                    monDepot(x._id);
                                    GetdepotFormateur(x._id);
                                    setopenHP(false);
                                  }}
                                  onMouseUp={handleEvent}
                                />
                              </Tooltip>
                            );
                          })}{" "}
                        </>
                      ) : null}
                    </Grid>
                  </GridItem>
                ))}
              </Grid>
              <Center marginTop="0.5rem">
                <Select
                  isReadOnly="true"
                  placeholder={chapitre.TitreChap}
                  width="fit-content"
                >
                  {leçon.map((le) => (
                    <option> Leçon: {le.titre}</option>
                  ))}
                </Select>
              </Center>

              {open ? (
                <>
                  <Box
                    bg="white"
                    marginTop="2rem"
                    marginLeft="5rem"
                    marginRight="5rem"
                  >
                    {isShownET ? (
                      <>
                        {" "}
                        <ContenuLeçon propss={Id} />
                      </>
                    ) : null}
                    {isShownFO ? (
                      <>
                        {" "}
                        <ContenuLeçon propss={Id} />
                      </>
                    ) : null}
                    {isShownAD || isShownadministrateur ? (
                      <>
                        {" "}
                        <ContenuLeçon propss={Id} />
                      </>
                    ) : null}
                    <Flex bg="#ead1dc" marginTop="1rem">
                      <Box w="80%">
                        <Heading
                          color="#5b5b5b"
                          size="md"
                          padding="1rem"
                          isTruncated
                        >
                          A faire
                        </Heading>
                      </Box>
                      {isShownFO && accesDonnerAcces ? (
                        <>
                          <Center w="20%">
                            <Button
                              onClick={() => handleClick(size)}
                              key={size}
                              m={4}
                            >
                              Ajouter Depot
                            </Button>
                          </Center>
                        </>
                      ) : null}
                    </Flex>

                    <TableContainer marginTop="0.5rem">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th scope="col">Titre</Th>
                            <Th scope="col">Date Début</Th>
                            <Th scope="col">Date Fin</Th>
                            <Th scope="col">A faire</Th>

                            {isShownFO ? <Th scope="col">Action</Th> : null}
                            {isShownET ? (
                              <Th scope="col">Dépôt etudiant</Th>
                            ) : null}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {depot.map((item) => (
                            <Tr>
                              <Th>{item.Titre}</Th>
                              <Td>
                                {" "}
                                <Moment format="MMMM Do YYYY, h:mm:ss a">
                                  {item.Datefin}
                                </Moment>
                              </Td>
                              <Td>
                                <Moment format="MMMM Do YYYY, h:mm:ss a">
                                  {item.Datedebut}
                                </Moment>
                              </Td>
                              <Td>
                                {" "}
                                <a
                                  type="button"
                                  href={item.Docs}
                                  target="_blank"
                                >
                                  <DownloadIcon color="red" />
                                </a>
                              </Td>
                              {isShownFO ? (
                                <Td>
                                  <Button
                                    onClick={() => SuppDepotFormateur(item._id)}
                                    leftIcon={<DeleteIcon />}
                                    px="2"
                                    size="xs"
                                  ></Button>
                                </Td>
                              ) : null}
                              {isShownET ? (
                                <Td>
                                  <Button
                                    leftIcon={<AddIcon />}
                                    px="2"
                                    size="xs"
                                    onClick={() => {
                                      afficherespacedepot(item._id);
                                    }}
                                  >
                                    Déposer
                                  </Button>
                                </Td>
                              ) : null}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>

                    {isShownET ? (
                      <>
                        <Flex bg="#ead1dc" marginTop="1rem">
                          <Box w="80%">
                            <Heading
                              color="#5b5b5b"
                              size="md"
                              padding="1rem"
                              isTruncated
                            >
                              Depot:{" "}
                            </Heading>
                          </Box>
                        </Flex>
                        {showespacedp ? (
                          <Center>
                            <DropFileInput
                              fileName={Docx}
                              ajouterdepot={() => {
                                add(IddepotFormateur);
                              }}
                              list={fileList}
                              onFileDrop={onFileDrop}
                            />
                          </Center>
                        ) : null}

                        <TableContainer>
                          <Table>
                            <Thead>
                              <Tr>
                                <Th scope="col">Reference depot</Th>
                                <Th scope="col">Date Remise</Th>
                                <Th scope="col">Travail</Th>
                                <Th scope="col">Action</Th>
                                <Th scope="col">Note</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {Mydepot.map((item, i) => (
                                <Tr>
                                  <Td>
                                    <h1>{item.travailId.Titre}</h1>
                                  </Td>
                                  <Th>{item.DateRemise}</Th>
                                  <Td>
                                    {" "}
                                    <a
                                      type="button"
                                      href={item.Docs}
                                      target="_blank"
                                    >
                                      <DownloadIcon color="red" />
                                    </a>
                                  </Td>
                                  <Td>
                                    <Button
                                      onClick={() => SuppDepotEtud(item._id)}
                                      leftIcon={<DeleteIcon />}
                                      px="2"
                                      size="xs"
                                    ></Button>
                                  </Td>
                                  <Td>
                                    <h1>{item.Note}</h1>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </>
                    ) : null}
                  </Box>
                </>
              ) : null}

              {openHP ? (
                <div style={{ height: "100%", padding: "2rem" }}>
                  <HomePageLeçon
                    nom={nomformateur}
                    prenom={prenomformateur}
                    numTel={numtelformateur}
                    email={emailformateur}
                    image={imageformateur}
                    TitreModule={TitreModule}
                  ></HomePageLeçon>
                  <Box
                    style={{ border: "groove", marginTop: "-205px" }}
                    padding="0.5rem"
                    marginTop="1rem"
                    marginLeft="7rem"
                    marginRight="7rem"
                    float="right"
                  >
                    <Heading marginBottom="0.5rem" size="md">
                      <img
                        src={logo}
                        style={{
                          maxWidth: "80px",
                          marginLeft: "50px",
                          marginTop: "10px",
                        }}
                      ></img>
                      <br />
                      Contenu du module
                    </Heading>
                    <Heading marginLeft="1rem" marginBottom="0.5rem" size="md">
                      {TitreModule}
                    </Heading>
                    {PrgmModule.map((item, s) => (
                      <List spacing={3} style={{ marginLeft: "30px" }}>
                        <ListItem>
                          <>
                            {" "}
                            <ListIcon as={ChevronRightIcon} color="#93329E" />
                            {item.TitreChap}
                            {item.lecon.map((le) => (
                              <List spacing={3} style={{ marginLeft: "1rem" }}>
                                <ListItem>
                                  <>
                                    {" "}
                                    <ListIcon
                                      as={ChevronRightIcon}
                                      color="#93329E"
                                    />
                                    {le.titre}
                                    <br></br>
                                  </>
                                </ListItem>
                              </List>
                            ))}
                          </>
                        </ListItem>
                      </List>
                    ))}
                  </Box>
                  <Forum md={userId}></Forum>
                </div>
              ) : null}

              <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>Ajouter Depot de travail</DrawerHeader>
                  <DrawerBody>
                    <form onSubmit={onSubmitHandler}>
                      <Input
                        placeholder="Titre"
                        type="text"
                        onChange={(e) => setTitre(e.target.value)}
                      />
                      <br></br> <br></br>
                      <Input
                        label="Datedebut"
                        type="Date"
                        onChange={(e) => setDatefin(e.target.value)}
                      />
                      <br></br> <br></br>
                      <Input
                        label="Datefin"
                        type="Date"
                        onChange={(e) => setDatedebut(e.target.value)}
                      />
                      <br></br> <br></br>
                      <Input
                        label="Datefin"
                        type="file"
                        onChange={(e) => setDocs(e.target.files[0])}
                      />
                      <br></br> <br></br>
                      <button className="btn btn-primary" type="submit">
                        Ajouter depot
                      </button>
                    </form>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
