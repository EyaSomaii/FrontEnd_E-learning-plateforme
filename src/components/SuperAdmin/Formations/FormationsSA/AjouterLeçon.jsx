import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
//import "./Essai.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Center,
  ChakraProvider,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import SideBarSA from "../../SidebarSA/SideBarSA";
import NavBarSA from "../../../NavBarSA/NavBarSA";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router";

import SideBar from "../../../SideBar/SideBar";
const AjouterLeçon = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [video, setvideo] = useState("");
  const [Quiz, setQuiz] = useState("");
  const [Docs, setDocs] = useState("");
  const [texte, setTexte] = useState([]);
  const [desc, setdesc] = useState("");
  const [titre, settitre] = useState("");
  const [nomChap, setnomChap] = useState("");
  const { userId } = useParams();
  const history = useHistory();

  const GetTitreChapitre = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/Chapitre/chapitre/${userId}`
    );
    setnomChap(data[0].TitreChap);
  };
  const fileSelectedHandler = (e) => {
    setvideo(e.target.files);
  };
  const fileSelectedHandler3 = (e) => {
    setDocs(e.target.files);
  };
  const fileSelectedHandler2 = (e) => {
    setQuiz(e.target.files);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let i = 0; i < video.length; i++) {
      formdata.append("video", video[i]);
    }
    for (let i = 0; i < Quiz.length; i++) {
      formdata.append("Quiz", Quiz[i]);
    }
    for (let i = 0; i < Docs.length; i++) {
      formdata.append("Docs", Docs[i]);
    }
    for (let i = 0; i < texte.length; i++) {
      formdata.append("texte", texte[i]);
    }
    formdata.append("titre", titre);
    //formdata.append("texte", JSON.stringify(texte));
    /**const newPost = {
      texte: texte,
      desc: desc,
    };*/
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      formdata.append("img", "image," + fileName);
      //texte.push(fileName);
      //texte.push(desc.current.value);
      console.log(texte);
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }

    try {
      await axios.post(
        `http://localhost:3001/lecon/AjoutLecon/${userId}`,

        formdata
      );
      document.getElementById("form").reset();
      document.getElementById("BtnAjout").hidden = true;
      document.getElementById("BtnConfirm").hidden = false;
      history.push("/AjoutFormation");
      toast.success("Leçon ajouté avec succes", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(texte);
      //window.location.reload();
    } catch (err) {}
  };
  const ConfirmerAjout = () => {
    const a = document.getElementsByClassName("shareInput")[0];
    const img = document.getElementsByClassName("shareImage")[0];
    console.log(a.value);
    const b = document.getElementsByClassName("shareImage")[0].value;
    const imagee = b.split("\\")[2];
    texte.push("Texte," + a.value);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + imagee;
      data.append("name", fileName);
      data.append("file", file);
      texte.push("image," + fileName);
      try {
        axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    document.getElementById("BtnAjout").hidden = false;
    document.getElementById("BtnConfirm").hidden = true;
  };
  const myFunction = () => {
    var elem = document.querySelector("#elem1");
    var clone = elem.cloneNode(true);
    const a = document.getElementsByClassName("shareInput")[0];
    const img = document.getElementsByClassName("shareImage")[0];
    console.log(a.value);
    const b = document.getElementsByClassName("shareImage")[0].value;
    const imagee = b.split("\\")[2];
    //setTexte([...texte, { cle: "texte", valeur: a.value }]);
    texte.push("Texte," + a.value);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + imagee;
      data.append("name", fileName);
      data.append("file", file);
      texte.push("image," + fileName);
      //setTexte([...texte, { cle: "image", valeur: fileName }]);
      //texte.cle.push("image");
      //texte.push(a.value);
      console.log(texte);
      try {
        axios.post("http://localhost:3001/api/upload", data);
      } catch (err) {}
    }
    // Update the ID and add a class
    clone.id = "elem2";
    clone.classList.add("text-large");
    a.value = "";
    img.value = "";
    // Inject it into the DOM
    elem.after(clone);
  };
  useEffect(() => {
    document.getElementById("BtnAjout").hidden = true;
    document.getElementById("BtnConfirm").hidden = false;
    GetTitreChapitre();
  }, []);
  //<hr className="shareHr" />;
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
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <ChakraProvider>
              <Center>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge
                      borderRadius="full"
                      px="60"
                      bg="#c9c5c5"
                      fontSize="2xl"
                    >
                      Ajouter un nouveau leçon dans {nomChap}
                    </Badge>
                  </Box>
                </Box>
              </Center>
              <Center>
                <br></br>
                <br></br>
                <form
                  style={{ marginLeft: "1rem" }}
                  id="form"
                  className="shareBottom"
                  onSubmit={submitHandler}
                >
                  <br></br>

                  <Input
                    placeholder="Titre de la leçon"
                    width="900px"
                    onChange={(e) => settitre(e.target.value)}
                  ></Input>
                  <br></br>
                  <br></br>

                  <Grid>
                    <form
                      action="file-upload.php"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <GridItem>
                        <label style={{ fontWeight: "bold" }}>
                          Ajouter des videos :{" "}
                        </label>
                        <input
                          name="video"
                          type="file"
                          multiple
                          onChange={fileSelectedHandler}
                          style={{ padding: "1rem" }}
                        />
                      </GridItem>
                      <GridItem>
                        <label style={{ fontWeight: "bold" }}>
                          Ajouter autre ressources:{" "}
                        </label>
                        <input
                          name="video"
                          type="file"
                          multiple
                          onChange={fileSelectedHandler2}
                          style={{ padding: "1rem" }}
                        />
                      </GridItem>
                    </form>
                  </Grid>
                  <div className="shareOptions">
                    {" "}
                    <Button onClick={myFunction}>
                      Ajouter une autre section
                    </Button>
                  </div>
                  <div className="share" id="elem1">
                    <div className="shareWrapper">
                      <div className="shareTop">
                        <br></br>
                        <br></br>
                        <Textarea
                          className="shareInput"
                          placeholder="Contenu de la section"
                          height="400px"
                          onChange={(e) => setdesc(e.target.value)}
                        />
                      </div>
                      <label style={{ fontWeight: "bold" }}>
                        Ajouter une image à la section :{" "}
                      </label>
                      <input
                        type="file"
                        //id="file"
                        className="shareImage"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ padding: "1rem" }}
                      />
                    </div>
                  </div>
                  <br></br>
                  <Button onClick={ConfirmerAjout} id="BtnConfirm">
                    Confirmer l'ajout
                  </Button>
                  <Button className="shareButton" type="submit" id="BtnAjout">
                    Ajouter la leçon
                  </Button>
                </form>
              </Center>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterLeçon;
