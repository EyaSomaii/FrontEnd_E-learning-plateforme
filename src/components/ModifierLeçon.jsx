import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

import {
  ChakraProvider,
  Input,
  Button,
  Box,
  Text,
  Image,
  Textarea,
} from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarSA from "./NavBarSA/NavBarSA";
import SideBar from "./SideBar/SideBar";
const ModifierLeçon = () => {
  const history = useHistory();

  const [oldtexte, setoldtexte] = useState([]);
  const [texte, setexte] = useState([]);
  const [TitreLec, setTitreLec] = useState("");

  //const [file, setFile] = useState("");
  const { userId } = useParams();
  const handlechange = async (e, index) => {
    //console.log(typeof e.target);
    if (typeof e.target == "object") {
      let file = e.target.files[0];
      const data = new FormData();
      const fileName = Date.now() + e.target.files[0].name;
      data.append("name", fileName);
      data.append("file", file);
      const a = await axios.post("http://localhost:3001/api/upload", data);
      texte.splice(index, 1, "image," + fileName);
      console.log(e.target.files[0].lastModified + e.target.files[0].name);
    } else {
      texte.splice(index, 1, "Texte," + e);
    }
  };
  const RecupereLecon = async () => {
    const data = await axios.get(
      `http://localhost:3001/lecon/AffleconById/${userId}`
    );
    setoldtexte(data.data[0].texte);
    setexte(data.data[0].texte);
    setTitreLec(data.data[0].titre);
  };
  const modifierlec = async () => {
    let info = {
      titre: TitreLec,
      texte: oldtexte,
    };
    const data = await axios.patch(
      `http://localhost:3001/lecon/modifierlecon/${userId}`,
      info
    );
    toast.success("Modification fait avec succées", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    });
    history.push("/AjoutFormation");
  };
  useEffect(() => {
    RecupereLecon();
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
              <Input
                width="100%"
                placeholder={TitreLec}
                OnChange={(e) => setTitreLec(e.target.value)}
              ></Input>
              {oldtexte.map((item, indice) => {
                if (item.startsWith("Texte") && item.split(",")[1] !== null) {
                  return (
                    <Editable
                      padding="1rem"
                      defaultValue={oldtexte[indice].slice(6)}
                      onChange={(e) => handlechange(e, indice)}
                      fontSize="xl"
                      size="xl"
                    >
                      <EditablePreview size="xl" />

                      <EditableTextarea size="xl" />
                    </Editable>
                  );
                } else if (
                  item.startsWith("image") &&
                  item.split(",")[1] != "NaN"
                ) {
                  let img = item.slice(6);

                  return (
                    <>
                      <Image
                        display="block"
                        marginLeft="auto"
                        marginRight="auto"
                        size="md"
                        marginTop="0.5rem"
                        marginBottom="0.5rem"
                        width="40rem"
                        src={"http://localhost:3001/Uploads/" + img}
                      ></Image>
                      <input
                        type="file"
                        className="shareImage"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => {
                          handlechange(e, indice);
                        }}
                      />
                    </>
                  );
                }
                return null;
              })}{" "}
              <Button onClick={modifierlec}>modifier</Button>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierLeçon;
