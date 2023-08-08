import {
  CDBBContainerBtn,
  CDBBox,
  CDBBtn,
  CDBBtnGrp,
  CDBCard,
  CDBCardBody,
  CDBContainer,
  CDBInput,
  CDBLink,
  CDBSelect,
  CDBSidebarMenuItem,
} from "cdbreact";
import { CDBIcon } from "cdbreact";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  IconButton,
  Tooltip,
  SimpleGrid,
  MenuItem,
  Select,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Image,
  Center,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { message, Upload } from "antd";

const ModifierForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTitreChap("");
  };
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
    setNom("");
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [x, setx] = useState(0);
  const [y, setY] = useState(0);
  const history = useHistory();
  const [Titre, setTitre] = useState("");
  const [TitreChap, setTitreChap] = useState("");
  const [description_courte, setdescription_courte] = useState("");
  const [Ce_que_vous_apprendez, setCe_que_vous_apprendrez] = useState("");
  const [Prerequis, setPrérequis] = useState("");
  const [description, setdescription] = useState("");
  const [video, setvideo] = useState("");
  const [nom, setNom] = useState("");
  const [formateur, setFormateur] = useState("");
  const [poster, setposter] = useState("");
  const [prenomFormateur, setprenomFormateur] = useState("");
  const [nomFormateur, setnomFormateur] = useState("");
  const [Modules, setModules] = useState([]);
  const [Formations, setFormations] = useState([]);
  const [Formateurs, setFormateurs] = useState([]);
  const [Chapitres, setChapitres] = useState([]);
  const [lecon, setlecon] = useState([]);
  const [value, setvalue] = useState("");
  const [ShowDetailvidImage, setShowDetailvidImage] = React.useState(false);
  const [getvid, setgetvid] = useState("");
  const [getposter, setgetposter] = useState("");

  /**----------------------------------------------------Mdifier_Formation ----------------------- */
  const Modifier_Formation = async (e) => {
    e.preventDefault();
    const id = document.getElementById("opt").value;
    let newformation = {
      Titre: document.getElementById("input1").value,
      description_courte: document.getElementById("input2").value,
      Ce_que_vous_apprendez: document.getElementById("input3").value,
      Prerequis: document.getElementById("input4").value,
      description: document.getElementById("input5").value,
    };
    if (video) {
      const data = new FormData();
      const fileName = Date.now() + video.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("video", video);
      newformation.video = fileName;

      try {
        await axios.post("http://localhost:3001/api/video", data);
      } catch (err) {}
    }
    if (poster) {
      const data = new FormData();
      const fileName = Date.now() + poster.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("poster", poster);
      newformation.poster = fileName;

      try {
        await axios.post("http://localhost:3001/api/video", data);
      } catch (err) {}
    }
    console.log(newformation);
    await axios.put(
      `http://localhost:3001/Formation/Modifierform/${id}`,
      newformation
    );
    /** 
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input5").value = "";
    const Selectedoption = document.getElementById("opt").options.selectedIndex;
    document.getElementById("opt").options[Selectedoption].innerText = Titre;
    setTitre("");
    setCe_que_vous_apprendrez("");
    setdescription("");
    setdescription_courte("");
    setPrérequis("");*/
    toast.success(`Modification de la formation fait avec succés`, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(window.location.reload(false), 5000);
    /**const Selectedoption = document.getElementById("opt").options.selectedIndex;
    document.getElementById("opt").options[Selectedoption].innerText =
      document.getElementById("input1").value;
    //document.getElementById("select").name = "dddd";
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input5").value = "";*/
  };

  /**----------------------------------------------------Supprimer_Formation ----------------------- */

  const Supprimer_Formation = async () => {
    const id = document.getElementById("opt").value;
    Swal.fire({
      title: "Voulez vous supprimer cette formation !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios.delete(`http://localhost:3001/Formation/Supprimerform/${id}`);
        //GetFormations();
        document.getElementById("input1").value = "";
        document.getElementById("input2").value = "";
        document.getElementById("input3").value = "";
        document.getElementById("input4").value = "";
        document.getElementById("input5").value = "";
        //document.getElementById("select").remove();
        const Selectedoption =
          document.getElementById("opt").options.selectedIndex;
        document.getElementById("opt").options[Selectedoption].remove();
        setShowDetailvidImage(false);
      }
    });
    /**if (window.confirm("êtes sûr de vouloir supprimer")) {
      await axios.delete(`http://localhost:3001/Formation/Supprimerform/${id}`);
      document.getElementById("input1").value = "";
      document.getElementById("input2").value = "";
      document.getElementById("input3").value = "";
      document.getElementById("input4").value = "";
      document.getElementById("input5").value = "";
      document.getElementById("select").remove();
    }*/
  };
  /**----------------------------------------------------Afficher_Module ----------------------- */

  const Module_par_formation = async () => {
    const id = document.getElementById("opt").value;

    const ss = await axios.get(
      `http://localhost:3001/Formation/Module_par_formation/${id}`
    );
    /**console.log(ss.data.Module.length);
    for (var i = 0; i < ss.data.Module.length; i++) {
      //nombres[i] *= 2;
      setNom(ss.data.Module[i].nom);
    }*/

    //console.log(ss.data.Module.nom);
    setModules(ss.data.Module);
  };
  /**----------------------------------------------------Afficher_les_lecon_by_IdChap ----------------------- */

  const Afficher_les_lecon_by_IdChap = async (id) => {
    const data = await axios.get(`http://localhost:3001/Chapitre/lecon/${id}`);

    setlecon(data.data.lecon);
  };
  /**----------------------------------------------------Afficher_Chapite_parModule ----------------------- */

  const Chapitre_par_Modules = async (id) => {
    setChapitres([]);
    const ss = await axios.get(
      `http://localhost:3001/Chapitre/AfficherChpLeconAvecIdModule/${id}`
    );
    const ssa = await axios.get(`http://localhost:3001/Module/module/${id}`);
    setNom(ssa.data.nom);
    setnomFormateur(ssa.data.formateur.nom);
    setprenomFormateur(ssa.data.formateur.prenom);
    /**setFormateur(ssa.data.formateur.nom);
    document.getElementById("select2").innerText = ssa.data.formateur.nom;
    console.log(document.getElementById("select2").innerText);*/
    setx(id);
    setChapitres(ss.data);
  };
  /**----------------------------------------------------GetChapID ----------------------- */

  const GetChapID = async (id) => {
    const ssa = await axios.get(
      `http://localhost:3001/Chapitre/chapitre/${id}`
    );
    setTitreChap(ssa.data[0].TitreChap);
    setY(id);
  };
  /**----------------------------------------------------AfficherDetails + Modules ----------------------- */
  const Detail_formation = async (event) => {
    event.preventDefault();

    const id = document.getElementById("opt").value;
    Module_par_formation();
    // Chapitre_par_Modules();
    const formation = await axios.get(
      `http://localhost:3001/Formation/formation/${id}`
    );
    document.getElementById("input1").value = formation.data.Titre;
    document.getElementById("input2").value = formation.data.description_courte;
    document.getElementById("input3").value =
      formation.data.Ce_que_vous_apprendez;
    document.getElementById("input4").value = formation.data.Prerequis;
    document.getElementById("input5").value = formation.data.description;
    setgetposter(formation.data.poster);
    setgetvid(formation.data.video);
    document.getElementById("btn1").hidden = false;
    document.getElementById("btn2").hidden = false;
    document.getElementById("btn3").hidden = true;
    setShowDetailvidImage(true);
  };
  /**----------------Affichet_tt_formateurs------------------------------ */
  const ListeFormateurs = async (e) => {
    const data = await axios.get("http://localhost:3001/User/Formateurs");
    setFormateurs(data.data);
  };

  /**----------------AjouterModule------------------------------ */
  const AjouterModule = async (e) => {
    const id = document.getElementById("opt").value;
    const id2 = document.getElementById("opt2").value;

    let module = {
      nom: nom,
      formateur: id2,
    };
    if (!nom) {
      toast.warning("Il faut remplir tout les champs", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    await axios.post(
      `http://localhost:3001/Module/Ajoutermodule/${id}`,
      module
    );
    toast.success(`${nom} est ajouté avec succés`, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    //window.location.reload(true);
    handleClose2();
    Module_par_formation();
  };
  /**-------------------------------Modifier_Module------------------------------------------------------ */

  const Modifier_Module = async () => {
    //const id = document.getElementById("module").value;
    const id2 = document.getElementById("opt2").value;
    console.log(id2);
    let info = {
      nom: nom,
      formateur: id2,
    };

    const data = await axios.put(
      `http://localhost:3001/Module/Modifiermodule/${x}`,
      info
    );
    toast.success(`Modification de ${nom} fait avec succés`, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    Module_par_formation();
    //document.getElementById("nom").innerText = nom;
    handleClose4();
    //Chapitre_par_Modules(x);
  };
  /**-------------------------------Modifier_Chap------------------------------------------------------ */

  const Modifier_Chapitre = async () => {
    //const id = document.getElementById("module").value;
    let info = {
      TitreChap: TitreChap,
    };

    const data = await axios.put(
      `http://localhost:3001/Chapitre/ModifChap/${y}`,
      info
    );
    toast.success(`Modification fait avec succés`, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    Chapitre_par_Modules(x);
    handleClose5();
  };
  /**-------------------------------Ajou_Chapitre------------------------------------------------------ */

  const AjouterChapitre = async (id) => {
    //const id = document.getElementById("module").value;
    const data = await axios.get(`http://localhost:3001/Module/module/${id}`);
    //console.log(data.data);
    let chap = {
      TitreChap: TitreChap,
    };
    if (!TitreChap) {
      toast.warning("Il faut remplir le champ ", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    await axios.post(`http://localhost:3001/Chapitre/Ajouterchap/${id}`, chap);
    console.log("ajouter " + id);
    console.log("ajouter " + x);

    handleClose();
    toast.success(`${TitreChap} est ajouté avec succés`, {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
    Chapitre_par_Modules(id);
    //window.location.reload(true);
  };
  /**-------------------------------Afficher tt formations------------------------------------------------------ */
  const GetFormations = async () => {
    const data = await axios
      .get("http://localhost:3001/Formation/Formations")
      .then((result) => {
        setFormations(result.data);
        console.log(result.data.Titre);
        console.log(result.data);
      });
    //console.log(data.data);
  };

  /**----------------------------------------------------Ajouter_Formation ----------------------- */
  const AjouterFormation = async (e) => {
    e.preventDefault();
    if (!Titre || !description_courte || !Prerequis || !description || !video) {
      toast.warning("Il faut remplir tout les champs", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    let info = {
      Titre: Titre,
      description_courte: description_courte,
      Ce_que_vous_apprendez: Ce_que_vous_apprendez,
      Prerequis: Prerequis,
      description: description,
    };
    if (video) {
      const data = new FormData();
      const fileName = Date.now() + video.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("video", video);
      info.video = fileName;

      try {
        await axios.post("http://localhost:3001/api/video", data);
      } catch (err) {}
    }
    if (poster) {
      const data = new FormData();
      const fileName = Date.now() + poster.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("poster", poster);
      info.poster = fileName;

      try {
        await axios.post("http://localhost:3001/api/video", data);
      } catch (err) {}
    }
    await axios.post("http://localhost:3001/Formation/Ajouterform", info);
    toast.success(`Formation ${Titre} est ajoutée avec succès`, {
      autoClose: 1000,
    });
    history.push("/Formations");
    //setTimeout(window.location.reload(false), 5000);
  };
  /**-------------------------------Supp_Chapitre------------------------------------------------------ */

  const SuppChapitre = async (id, idmodule) => {
    Swal.fire({
      title: "Voulez vous supprimer ce chapitre !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression effectuée avec succès", "", "success");

        axios.delete(
          `http://localhost:3001/Chapitre/suppChap/${id}/${idmodule}`
        );
        setChapitres(Chapitres.filter((Chapitres) => Chapitres._id !== id));
        setTimeout(() => {}, 1000);
      }
    });

    //Chapitre_par_Modules(idmodule);
  };
  /** -----------------------Supprimer_leçon----------------------------- */
  const Supplecon = async (id, idchap) => {
    Swal.fire({
      title: "Voulez vous supprimer cette leçon !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression effectuée avec succès", "", "success");

        axios.delete(`http://localhost:3001/lecon/supplecon/${id}/${idchap}`);
        console.log();
        setlecon(lecon.filter((lecon) => lecon._id !== id));
        setTimeout(() => {}, 1000);
      }
    });

    //Chapitre_par_Modules(idmodule);
  };
  /**-------------------------------Supp_Module------------------------------------------------------ */

  const SuppModule = async (id) => {
    const idform = document.getElementById("opt").value;

    Swal.fire({
      title: "Voulez vous supprimer ce module !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression effectuée avec succès", "", "success");

        axios.delete(
          `http://localhost:3001/Module/Supprimermodule/${id}/${idform}`
        );
        setModules(Modules.filter((Modules) => Modules._id !== id));
        setTimeout(() => {}, 1000);
      }
    });
  };
  /**-------------ccccccccccccccccc------*/
  const Ajouter = () => {
    setShowDetailvidImage(false);
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input5").value = "";
    document.getElementById("btn1").hidden = true;
    document.getElementById("btn2").hidden = true;
    document.getElementById("btn3").hidden = false;
  };
  const masquer = () => {
    document.getElementById("ou").hidden = true;
    document.getElementById("ajouterForm").hidden = true;
  };
  const afficher = () => {
    document.getElementById("ou").hidden = false;
    document.getElementById("ajouterForm").hidden = false;
  };
  useEffect(() => {
    GetFormations();
    ListeFormateurs();
    document.getElementById("btn1").hidden = true;
    document.getElementById("btn2").hidden = true;
  }, []);

  return (
    <div className="d-flex">
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%" }}>
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <CDBContainer style={{ background: "white" }}>
              <CDBBox>
                <CDBBox
                  display="flex"
                  alignItems="center"
                  style={{ margin: "10px", padding: "15px" }}
                >
                  <CDBContainer>
                    <CDBBtnGrp>
                      <span>Formations :</span>
                    </CDBBtnGrp>
                    <form onSubmit={Detail_formation}>
                      <CDBBtnGrp>
                        <select
                          value={value}
                          id="opt"
                          onChange={(e) => setvalue(e.target.value)}
                        >
                          {Formations.map((item, index) => (
                            <option
                              id="select"
                              value={item._id}
                              className={item.Titre}
                            >
                              {item.Titre}
                            </option>
                          ))}
                        </select>
                      </CDBBtnGrp>
                      <CDBBtnGrp>
                        <CDBBtn
                          type="submit"
                          style={{
                            backgroundColor: "#440A67",
                            marginLeft: "50px",
                          }}
                        >
                          Selectionner
                        </CDBBtn>
                      </CDBBtnGrp>
                    </form>{" "}
                  </CDBContainer>

                  <CDBBtn
                    id="ajouterForm"
                    onClick={Ajouter}
                    style={{
                      backgroundColor: "#440A67",
                      marginRight: "50px",
                      width: "250px",
                      height: "35px",
                    }}
                  >
                    Ajouter une formation{" "}
                  </CDBBtn>
                </CDBBox>
              </CDBBox>
              <CDBBox>
                <ChakraProvider>
                  <Tabs variant="enclosed">
                    <TabList>
                      <Tab onClick={afficher}>Aperçu</Tab>
                      <Tab onClick={masquer}>Contenu</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <div>
                          <form id="form" enctype="multipart/form-data">
                            <CDBCard>
                              <CDBCardBody>
                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "40px",
                                      marginRight: "95px",
                                    }}
                                  >
                                    Titre
                                  </span>
                                  <CDBInput
                                    id="input1"
                                    value={Titre}
                                    onChange={(e) => setTitre(e.target.value)}
                                    style={{ width: "900px" }}
                                  />
                                </CDBBox>

                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "40px",
                                    }}
                                  >
                                    Déscription courte
                                  </span>
                                  <CDBInput
                                    id="input2"
                                    value={description_courte}
                                    onChange={(e) =>
                                      setdescription_courte(e.target.value)
                                    }
                                    style={{ width: "900px" }}
                                    type="textarea"
                                  />
                                </CDBBox>

                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "40px",
                                    }}
                                  >
                                    Ce que vous apprendrez
                                  </span>
                                  <CDBInput
                                    id="input3"
                                    value={Ce_que_vous_apprendez}
                                    onChange={(e) =>
                                      setCe_que_vous_apprendrez(e.target.value)
                                    }
                                    style={{ width: "900px" }}
                                    type="textarea"
                                  />
                                </CDBBox>

                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "50px",
                                    }}
                                  >
                                    prérequis
                                  </span>
                                  <CDBInput
                                    id="input4"
                                    value={Prerequis}
                                    onChange={(e) =>
                                      setPrérequis(e.target.value)
                                    }
                                    style={{
                                      width: "900px",
                                      marginLeft: "50px",
                                    }}
                                  />
                                </CDBBox>

                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "40px",
                                    }}
                                  >
                                    Déscription
                                  </span>
                                  <CDBInput
                                    id="input5"
                                    value={description}
                                    onChange={(e) =>
                                      setdescription(e.target.value)
                                    }
                                    style={{
                                      width: "900px",
                                      marginLeft: "50px",
                                    }}
                                    type="textarea"
                                  />
                                </CDBBox>
                                {ShowDetailvidImage ? (
                                  <div
                                    style={{
                                      maxWidth: "500px",
                                      marginLeft: "320px",
                                    }}
                                  >
                                    <video
                                      poster={getposter}
                                      controls
                                      preload="metadata"
                                      onClick={() => {
                                        console.log(getvid);
                                      }}
                                    >
                                      <source src={getvid} type="video/mp4" />
                                    </video>
                                  </div>
                                ) : null}

                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "50px",
                                    }}
                                  >
                                    vidéo
                                  </span>

                                  <CDBInput
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    onChange={(e) =>
                                      setvideo(e.target.files[0])
                                    }
                                    style={{
                                      width: "900px",
                                      marginLeft: "80px",
                                    }}
                                  />
                                </CDBBox>
                                {ShowDetailvidImage ? (
                                  <ChakraProvider>
                                    <Center>
                                      <Image
                                        size="xs"
                                        marginTop="0.5rem"
                                        marginBottom="0.5rem"
                                        src={getposter}
                                        alt="Poster"
                                        maxWidth={500}
                                        style={{
                                          marginLeft: "5px",
                                          marginRight: "150px",
                                        }}
                                      />
                                    </Center>
                                  </ChakraProvider>
                                ) : null}
                                <CDBBox
                                  display="flex"
                                  alignItems="center"
                                  style={{ margin: "10px" }}
                                >
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "50px",
                                    }}
                                  >
                                    Poster
                                  </span>

                                  <CDBInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setposter(e.target.files[0])
                                    }
                                    style={{
                                      width: "900px",
                                      marginLeft: "80px",
                                    }}
                                  />
                                </CDBBox>
                              </CDBCardBody>
                            </CDBCard>
                            <CDBBox
                              display="flex"
                              alignItems="center"
                              style={{ margin: "10px", padding: "15px" }}
                            >
                              <CDBBtn
                                type="Reset"
                                id="btn2"
                                onClick={Supprimer_Formation}
                                style={{
                                  backgroundColor: "#440A67",
                                  marginRight: "50px",
                                }}
                              >
                                Supprimer la formation{" "}
                              </CDBBtn>
                              <CDBBtn
                                onClick={Modifier_Formation}
                                id="btn1"
                                style={{
                                  backgroundColor: "#440A67",
                                  marginLeft: "700px",
                                }}
                              >
                                Enregister les modifications{" "}
                              </CDBBtn>
                              <CDBBtn
                                type="Reset"
                                id="btn3"
                                onClick={AjouterFormation}
                                style={{
                                  backgroundColor: "#440A67",
                                  marginLeft: "700px",
                                }}
                              >
                                Ajouter{" "}
                              </CDBBtn>
                            </CDBBox>
                          </form>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        {" "}
                        <Accordion allowToggle>
                          {Modules.map((item, index) => (
                            <AccordionItem key={item._id}>
                              <div>
                                <AccordionButton
                                  _expanded={{ bg: "#c8c2cc" }}
                                  key={item._id}
                                  onClick={() => Chapitre_par_Modules(item._id)}
                                >
                                  <Box flex="1" textAlign="left">
                                    {item.nom}
                                  </Box>
                                  <Box>
                                    <Tooltip
                                      label="Ajouter Chapitre!"
                                      aria-label="A tooltip"
                                    >
                                      <IconButton
                                        id="module"
                                        key={item._id}
                                        value={item._id}
                                        size="sm"
                                        marginRight="0.2rem"
                                        iconSpacing="30px"
                                        icon={<PlusSquareIcon />}
                                        onClick={() => {
                                          handleOpen();
                                        }}
                                      ></IconButton>
                                    </Tooltip>
                                    <Tooltip
                                      label="Modifier Module!"
                                      aria-label="A tooltip"
                                    >
                                      <IconButton
                                        size="sm"
                                        marginRight="0.2rem"
                                        icon={<EditIcon />}
                                        onClick={() => {
                                          handleOpen4();
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip
                                      label="Supprimer Module!"
                                      aria-label="A tooltip"
                                    >
                                      <IconButton
                                        size="sm"
                                        marginRight="0.2rem"
                                        onClick={() => {
                                          SuppModule(item._id);
                                          //AffecterX(item._id);
                                        }}
                                        icon={<DeleteIcon />}
                                      />
                                    </Tooltip>
                                    <Modal
                                      isCentered
                                      isOpen={open4}
                                      onClose={handleClose4}
                                    >
                                      <ModalContent>
                                        <ModalHeader>
                                          Modifier Module
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                          <FormControl>
                                            <FormLabel>Titre</FormLabel>
                                            <Input
                                              value={nom}
                                              onChange={(e) =>
                                                setNom(e.target.value)
                                              }
                                              //placeholder="titre module"
                                            />
                                          </FormControl>
                                          <FormControl
                                            variant="standard"
                                            sx={{ m: 1, minWidth: 120 }}
                                          >
                                            <h1>
                                              Formateur : {nomFormateur}{" "}
                                              {prenomFormateur}
                                            </h1>
                                            <Select
                                              value={formateur}
                                              id="opt2"
                                              onChange={(e) =>
                                                setFormateur(e.target.value)
                                              }
                                            >
                                              {Formateurs.map((item, index) => (
                                                <option
                                                  id="select2"
                                                  value={item._id}
                                                  className={item.nom}
                                                >
                                                  {item.nom} {item.prenom}
                                                </option>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </ModalBody>

                                        <ModalFooter>
                                          <Button
                                            colorScheme="blue"
                                            mr={3}
                                            onClick={Modifier_Module}
                                          >
                                            Modifier
                                          </Button>
                                          <Button onClick={handleClose4}>
                                            Close
                                          </Button>
                                        </ModalFooter>
                                      </ModalContent>
                                    </Modal>

                                    <Modal
                                      isCentered
                                      isOpen={open}
                                      onClose={handleClose}
                                    >
                                      <ModalContent>
                                        <ModalHeader>
                                          Ajouter Chapitre dans {nom}
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                          <Input
                                            value={TitreChap}
                                            onChange={(e) =>
                                              setTitreChap(e.target.value)
                                            }
                                          />
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button
                                            colorScheme="blue"
                                            mr={3}
                                            key={item._id}
                                            onClick={() => AjouterChapitre(x)}
                                          >
                                            Ajouter
                                          </Button>
                                          <Button onClick={handleClose}>
                                            Close
                                          </Button>
                                        </ModalFooter>
                                      </ModalContent>
                                    </Modal>
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </div>
                              {Chapitres.map((it, index) => (
                                <AccordionPanel pb={4}>
                                  <Accordion allowToggle>
                                    <AccordionItem>
                                      <h2>
                                        <AccordionButton
                                          _expanded={{ bg: "#c8c2cc" }}
                                          key={it._id}
                                          onClick={() => {
                                            GetChapID(it._id);
                                            Afficher_les_lecon_by_IdChap(
                                              it._id
                                            );
                                          }}
                                        >
                                          <Box flex="1" textAlign="left">
                                            {it.TitreChap}
                                          </Box>
                                          <Box>
                                            <IconButton
                                              size="sm"
                                              marginRight="0.2rem"
                                              icon={<PlusSquareIcon />}
                                              onClick={() => {
                                                history.push(
                                                  "/AjouterLeçon/" + it._id
                                                );
                                              }}
                                            ></IconButton>{" "}
                                            <IconButton
                                              marginRight="0.2rem"
                                              size="sm"
                                              icon={<EditIcon />}
                                              onClick={() => {
                                                handleOpen5();
                                                //AffecterX(item._id);
                                              }}
                                            />
                                            <IconButton
                                              marginRight="0.2rem"
                                              size="sm"
                                              icon={<DeleteIcon />}
                                              onClick={() => {
                                                SuppChapitre(it._id, item._id);
                                                //AffecterX(item._id);
                                              }}
                                            />
                                            <Modal
                                              isCentered
                                              isOpen={open5}
                                              onClose={handleClose5}
                                            >
                                              <ModalContent>
                                                <ModalHeader>
                                                  Modifier Chapitre
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody pb={6}>
                                                  <FormControl>
                                                    <FormLabel>Titre</FormLabel>
                                                    <Input
                                                      value={TitreChap}
                                                      onChange={(e) =>
                                                        setTitreChap(
                                                          e.target.value
                                                        )
                                                      }
                                                      placeholder="titre module"
                                                    />
                                                  </FormControl>
                                                </ModalBody>

                                                <ModalFooter>
                                                  <Button
                                                    colorScheme="blue"
                                                    mr={3}
                                                    onClick={Modifier_Chapitre}
                                                  >
                                                    Modifier
                                                  </Button>
                                                  <Button
                                                    onClick={handleClose5}
                                                  >
                                                    Close
                                                  </Button>
                                                </ModalFooter>
                                              </ModalContent>
                                            </Modal>
                                            <Modal
                                              isCentered
                                              isOpen={open3}
                                              onClose={handleClose3}
                                            >
                                              <ModalContent>
                                                <ModalHeader>sss</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                  <Input />
                                                </ModalBody>
                                                <ModalFooter>
                                                  <Button
                                                    onClick={handleClose3}
                                                  >
                                                    Close
                                                  </Button>
                                                </ModalFooter>
                                              </ModalContent>
                                            </Modal>
                                          </Box>
                                          <AccordionIcon />
                                        </AccordionButton>
                                      </h2>
                                      {lecon.map((nomLecon) => (
                                        <AccordionPanel pb={4}>
                                          <Accordion allowToggle>
                                            <AccordionItem>
                                              <h2>
                                                <AccordionButton>
                                                  <Box
                                                    flex="1"
                                                    textAlign="left"
                                                  >
                                                    {nomLecon.titre}
                                                  </Box>
                                                  <IconButton
                                                    size="sm"
                                                    onClick={() => {
                                                      history.push(
                                                        "/ModifierLeçon/" +
                                                          nomLecon._id
                                                      );
                                                    }}
                                                    icon={<EditIcon />}
                                                  />
                                                  <IconButton
                                                    size="sm"
                                                    onClick={() => {
                                                      Supplecon(
                                                        nomLecon._id,
                                                        it._id
                                                      );
                                                    }}
                                                    icon={<DeleteIcon />}
                                                  />
                                                </AccordionButton>
                                              </h2>
                                            </AccordionItem>
                                          </Accordion>
                                        </AccordionPanel>
                                      ))}
                                    </AccordionItem>
                                  </Accordion>
                                </AccordionPanel>
                              ))}
                            </AccordionItem>
                          ))}
                        </Accordion>
                        <Button
                          onClick={() => {
                            handleOpen2();
                            //onOpen();
                          }}
                        >
                          Ajouter Module
                        </Button>
                        <Modal isCentered isOpen={open2} onClose={handleClose2}>
                          <ModalContent>
                            <ModalHeader>Ajouter Module</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>Titre</FormLabel>
                                <Input
                                  id="idmodule"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value)}
                                  placeholder="Titre"
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Formateur</FormLabel>
                                <select
                                  value={formateur}
                                  id="opt2"
                                  onChange={(e) => setFormateur(e.target.value)}
                                >
                                  {Formateurs.map((item, index) => (
                                    <option
                                      id="select2"
                                      value={item._id}
                                      className={item.nom}
                                    >
                                      {item.nom} {item.prenom}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={AjouterModule}
                              >
                                Ajouter
                              </Button>
                              <Button onClick={handleClose2}>Close</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </ChakraProvider>
              </CDBBox>
            </CDBContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModifierForm;
