import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBtn,
} from "cdbreact";
import {
  EditIcon,
  SmallAddIcon,
  PlusSquareIcon,
  ArrowForwardIcon,
  LockIcon,
  PhoneIcon,
  DownloadIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import "./SideBarSA.css";
import {
  Badge,
  Button,
  ChakraProvider,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useToast,
  Text,
  useDisclosure,
  VStack,
  Checkbox,
  Stack,
  Box,
} from "@chakra-ui/react";
import validator from "validator";
import { FormGroup, FormLabel } from "react-bootstrap";
import { Select } from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SideBarSA = () => {
  const history = useHistory();
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const [nom, setnom] = useState("");
  const [options, setoptions] = useState([]);
  const [prenom, setprenom] = useState("");
  const [nomSA, setnomSA] = useState("");
  const [prenomSA, setprenomSA] = useState("");
  const [imageSA, setimageSA] = useState("");
  const [selected, setSelected] = useState([]);
  const [numTel, setnumTel] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [email, setemail] = useState("");
  const [occupation, setoccupation] = useState("");
  const [Role, setRole] = useState("");
  const [formation, setformation] = useState([]);
  const [value, setvalue] = useState([]);
  const [Formations, setFormations] = useState([]);
  const [Prix, setPrix] = useState("");
  const [image, setimage] = useState("");
  const [checked, setchecked] = useState(true);
  const [disabled, setdisabled] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" />;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const isError = numTel.length !== 8;
  const ValidMail = !validator.isEmail(email);
  const tab = [];
  const getSupAD = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );
    setnomSA(data.data[0].nom);
    setimageSA(data.data[0].image);

    setprenomSA(data.data[0].prenom);
  };
  const GetFormations = async () => {
    let op = [];
    const data = await axios
      .get("http://localhost:3001/Formation/Formations")
      .then((result) => {
        for (let k of result.data) {
          op.push({ value: k.Titre, label: k.Titre });
        }
        setoptions(op);
        setFormations(result.data);
      });
  };
  const AjouterUtilisateur = async (e) => {
    if (!nom || !prenom || !email || !numTel || !Adresse || !image || !Role) {
      toast.warning(`IL Faut remplir tout les champs`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      if (
        validator.isEmail(email) &&
        numTel.length == 8 &&
        nom.match(/^[a-zA-Z]+$/) &&
        prenom.match(/^[a-zA-Z]+$/)
      ) {
        const formData = new FormData();
        selected.forEach((a) => {
          tab.push(a.value);
        });
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("numTel", numTel);
        formData.append("Adresse", Adresse);
        formData.append("occupation", occupation);
        formData.append("Role", Role);
        formData.append("Prix", Prix);
        formData.append("image", image);
        formData.append("email", email);
        formData.append("formation", tab);
        await axios.post("http://localhost:3001/User/AjouterUti", formData);
        setnom("");
        setprenom("");
        setAdresse("");
        setPrix("");
        setRole("");
        setemail("");
        setSelected([]);
        document.getElementById("image").value = "";
        setoccupation("");
        setnumTel("");
        toast.success(
          `Un nouveau ${Role} est ajouté avec succès et mail envoyé a ${email}`,
          {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          }
        );

        tab = [];
      } else {
        toast.warning(`Verifier vos champs de saisie`, {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {}
    //onClose();
  };
  const [showhide, setShowhide] = useState("");
  useEffect(() => {
    GetFormations();
    getSupAD();
  }, []);

  const FiltreParRole = (e) => {
    setRole(e.target.value);
    const getuser = e.target.value;
    setShowhide(getuser);
  };

  return (
    <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#440A67">
        <div className="d-flex mt-4" style={{ marginTop: "100" }}>
          <img
            alt="panelImage"
            className="panelImage"
            src={imageSA}
            size="xl"
          />
          <div>
            <h6 style={{ fontWeight: "600", marginTop: "2rem" }}>
              {nomSA} {prenomSA}
            </h6>
            <p style={{ fontSize: "0.75em" }}>Super Admin</p>
          </div>
        </div>
        <CDBSidebarMenu>
          <div
            style={{
              backgroundColor: "#93329E",
              width: "fit-content",
              marginLeft: "40px",
            }}
          >
            <CDBBtn
              color="#440A67"
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              Créer un compte
            </CDBBtn>
            <ChakraProvider>
              <Modal id="mymodal" isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                  <SimpleGrid
                    columns={4}
                    marginLeft="20"
                    spacing={20}
                    marginTop="10"
                  >
                    <FormLabel>Choisir type utilisateur</FormLabel>
                    <Select
                      placeholder="Role"
                      value={Role}
                      required
                      onChange={(e) => {
                        FiltreParRole(e);
                        //setRole(e.target.value);
                      }}
                    >
                      <option value="Etudiant"> Etudiant</option>
                      <option value="Formateur">Formateur </option>
                      <option value="Administrateur">Administrateur </option>
                    </Select>

                    <ModalCloseButton />
                  </SimpleGrid>

                  <ModalBody>
                    <SimpleGrid
                      columns={2}
                      spacing={10}
                      marginLeft="5"
                      marginTop="5"
                    >
                      <Box height="80px" spacing={10} p="6">
                        <Input
                          id="nom"
                          placeholder="nom"
                          value={nom}
                          onChange={(e) => setnom(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <Input
                          id="prenom"
                          placeholder="Prénom"
                          value={prenom}
                          onChange={(e) => setprenom(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <Input
                          id="numtel"
                          placeholder="Numéro de télephone"
                          value={numTel}
                          onChange={(e) => setnumTel(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <Input
                          id="Email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                        <br></br>
                        <br></br>

                        {showhide === "Etudiant" && (
                          <Input
                            id="paiement"
                            placeholder="paiement"
                            value={Prix}
                            onChange={(e) => setPrix(e.target.value)}
                          />
                        )}
                      </Box>
                      <Box height="80px" spacing={10} p="6">
                        <Input
                          id="image"
                          placeholder="Image"
                          type="file"
                          name="image"
                          onChange={(e) => setimage(e.target.files[0])}
                        />
                        <br></br>
                        <br></br>
                        <Select
                          id="Adresse"
                          placeholder="Adresse"
                          value={Adresse}
                          required
                          onChange={(e) => setAdresse(e.target.value)}
                        >
                          <option value="Ariana"> Ariana </option>
                          <option value="Beja">Beja</option>
                          <option value="Ben Arous">Ben Arous</option>
                          <option value="Bizete">Bizete</option>
                          <option value="Gabes">Gabes</option>
                          <option value="Gafsa">Gafsa</option>
                          <option value="Jendouba">Jendouba</option>
                          <option value="Kairouan">Kairouan</option>
                          <option value="Kasserine">Kasserine</option>
                          <option value="Kébili">Kébili</option>
                          <option value="Kef">Kef</option>
                          <option value="Mahdia">Mahdia</option>
                          <option value="Manouba">Manouba</option>
                          <option value="Médenine">Médenine</option>
                          <option value="Monastir">Monastir</option>
                          <option value="Nabeul">Nabeul</option>
                          <option value="Sfax">Sfax</option>
                          <option value="Sidi Bouzid">Sidi Bouzid</option>
                          <option value="Siliana">Siliana</option>
                          <option value="Sousse">Sousse</option>
                          <option value="Tataouine">Tataouine</option>
                          <option value="Tunis">Tunis</option>
                          <option value="Zaghouan">Zaghouan</option>
                        </Select>
                        <br></br>
                        <br></br>
                        {showhide === "Etudiant" && (
                          <Select
                            id="statut"
                            placeholder="Statut"
                            value={occupation}
                            onChange={(e) => setoccupation(e.target.value)}
                          >
                            <option value="Embauché"> Embauché</option>
                            <option value="Non embauché"> Non embauché</option>
                          </Select>
                        )}
                        <br></br>
                        <br></br>
                        {showhide === "Etudiant" && (
                          <div>
                            Formations
                            <MultiSelect
                              id="form"
                              options={options}
                              value={selected}
                              onChange={setSelected}
                              labelledBy="Select"
                            ></MultiSelect>
                          </div>
                        )}

                        {showhide === "Formateur" && (
                          <div>
                            {" "}
                            Formations
                            <MultiSelect
                              id="form"
                              options={options}
                              value={selected}
                              onChange={setSelected}
                              labelledBy="Select"
                            ></MultiSelect>
                          </div>
                        )}
                      </Box>
                    </SimpleGrid>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={AjouterUtilisateur}>
                      Créer le compte
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </ChakraProvider>
          </div>
          <NavLink exact to="/EtudiantList" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="users">Etudiants</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/FormateursList" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Formateurs</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/Formations" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="table">Formations</CDBSidebarMenuItem>
          </NavLink>

          <NavLink exact to={"/Dashboard"} activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="AiOutlineBarChart">
              DashBoard
            </CDBSidebarMenuItem>
          </NavLink>
          <hr></hr>
          <NavLink exact to="/Admins" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Admin</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>

        <CDBSidebarMenu></CDBSidebarMenu>
      </CDBSidebar>
    </div>
  );
};

export default SideBarSA;
