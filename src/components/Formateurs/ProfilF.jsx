import React, { useState, useEffect } from "react";
import FormateurDashBoard from "../Formations/FormateurDashBoard";
import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import NavBarSA from "../NavBarSA/NavBarSA";
import { DownloadIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../SideBar/SideBar";
const ProfilF = () => {
  const [cv, setcv] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [numTel, setnumTel] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [email, setemail] = useState("");
  const [user, setUser] = useState([]);
  const [image, setimage] = useState("");
  const [identif, setidentif] = useState();
  const [fileCV, setfileCV] = useState("");
  const [Nbr, SetNbr] = useState(0);
  const [NbrEtudiant, SetNbrEtudiant] = useState(0);
  const [NbrModule, SetNbrModule] = useState(0);
  const [Nbrchapitre, SetNbrchapitre] = useState(0);
  const [Nbrlecon, SetNbrlecon] = useState(0);
  const [DashCourbe, setDashCourbe] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const { userId } = useParams();
  const cvName = cv.name;

  const getFormateurRooms = async () => {
    const data = await axios.get(
      `http://localhost:3001/RoomMeetRoute/getFormateursRooms/${userId}`
    );
    setRooms(data.data);
  };
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
    setfileCV(data.data[0].cv);
    setUser(data.data);
  };
  function CVFormateur() {
    if (fileCV != null) {
      return (
        <a href={fileCV} target="_Blank">
          <Button colorScheme="teal" variant="link" size="xs">
            Télécharger votre Curriculum Vitae
          </Button>
        </a>
      );
    } else {
      return <h1>Non disponible</h1>;
    }
  }
  useEffect(() => {
    const detnbrEtu_ParFormation = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/User/GetLesFormationsAvecNbrEtuDeChacune/${userId}`
      );

      setDashCourbe(data);
    };
    const getNbrModules = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/GetNombreModulesAssocierAuFormateur/${userId}`
      );

      SetNbrModule(data);
    };
    const getNbrChapitres = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/Nombres_chap_DeChaqueFormateur/${userId}`
      );

      SetNbrchapitre(data);
    };
    const getNbrlecon = async () => {
      const { data } = await axios.get(
        ` http://localhost:3001/Module/Nombres_Deslecon_DeChaqueFormateur/${userId}`
      );

      SetNbrlecon(data);
    };
    const getNbrFormation = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/User/GetNombreFormationAssocierAuFormateur/${userId}`
      );
      SetNbr(data);
    };
    const getNbrEtudiants = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/User/GetNombreEtuDiantAssocierAuFormateur/${userId}`
      );
      SetNbrEtudiant(data);
    };

    getDataById();
    getNbrFormation();
    getNbrEtudiants();
    getNbrModules();
    getNbrChapitres();
    getNbrlecon();
    getFormateurRooms();
    detnbrEtu_ParFormation();
  }, []);
  const addcv = async (e) => {
    try {
      const formData = new FormData();
      formData.append("cv", cv);
      const data = await axios.patch(
        `http://localhost:3001/User/ajoutCV/${userId}`,
        formData
      );
      getDataById();
      toast.success("Votre Curriculum Vitae a été ajouté avec sucés", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {}
  };
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
              <Flex
                color="white"
                style={{ marginTop: "2rem", padding: "1rem" }}
              >
                <Box w="60%">
                  <Flex color="white">
                    <Center w="50%">
                      <Wrap>
                        <WrapItem>
                          <Avatar size="2xl" name="Segun Adebayo" src={image} />{" "}
                        </WrapItem>
                      </Wrap>
                    </Center>
                    <div flex="1" style={{ marginTop: "3rem" }}>
                      <Text color={"black"}>
                        {nom} {prenom}
                      </Text>
                    </div>
                  </Flex>
                </Box>
                <Center flex="1" w="40%">
                  {" "}
                  <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                      <DownloadForOfflineIcon
                        htmlColor="purple"
                        className="shareIcon"
                      ></DownloadForOfflineIcon>

                      <span className="shareOptionText">Photo or Video</span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        accept=".png,.jpeg,.jpg,.pdf,.docx"
                        onChange={(e) => setcv(e.target.files[0])}
                      ></input>
                      <h1>{cvName}</h1>
                    </label>
                  </div>
                  <Button bg="purple" onClick={addcv}>
                    Ajouter cv
                  </Button>
                </Center>
              </Flex>
              <Flex style={{ marginTop: "2rem", padding: "1rem" }}>
                <Box w="100%" style={{ padding: "1rem", border: "groove" }}>
                  infos
                  <hr></hr>
                  <EmailIcon color="purple" marginRight="0.5rem" /> E-mail :{" "}
                  {email}
                  <br />
                  <PhoneIcon color="purple" marginRight="0.5rem" />
                  Numéro télephone : {numTel}
                  <br />
                  <DownloadIcon color="purple" marginRight="0.5rem" />
                  Curriculum vitae : <CVFormateur></CVFormateur>
                </Box>
              </Flex>
              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="60"
                      bg="#c9c5c5"
                      fontSize="2xl"
                    >
                      Dashboard
                    </Badge>
                  </Box>
                </Box>
              </Center>
              <FormateurDashBoard></FormateurDashBoard>

              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="60"
                      bg="#c9c5c5"
                      fontSize="2xl"
                    >
                      Salons
                    </Badge>
                  </Box>
                </Box>
              </Center>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Nom du salon</Th>
                      <Th>Date début</Th>
                      <Th>Date fin </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Rooms.map((item) => (
                      <Tr>
                        <Td>{item.TitreRoom}</Td>

                        <Td>
                          <Moment format="MMMM Do YYYY, h:mm:ss a">
                            {item.start}
                          </Moment>
                        </Td>
                        <Td>
                          {" "}
                          <Moment format="MMMM Do YYYY, h:mm:ss a">
                            {item.end}
                          </Moment>
                        </Td>
                        <Td>
                          {" "}
                          <a href={item.lien} target="_Blank">
                            <Button>rejoindre</Button>
                          </a>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilF;
