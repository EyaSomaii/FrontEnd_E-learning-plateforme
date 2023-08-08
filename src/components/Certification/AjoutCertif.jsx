import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  ChakraProvider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AjoutCertif = () => {
  const [certif, setcertif] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [certificat, setcertificat] = useState("");
  const [certifEtu, setcertifEtu] = useState([]);
  const { userId, IdFormation } = useParams();

  const Ajouter_Certif = async (e) => {
    try {
      if (!certif) {
        toast.warning("Vous n'avez pas encore télécharger la certificat !", {
          autoClose: 1000,
          position: toast.POSITION.BOTTOM_CENTER,
        });

        return;
      }
      {
        const formData = new FormData();
        formData.append("certif", certif);
        const data = await axios.post(
          `http://localhost:3001/CertificationRoute/Ajoutercertif/${userId}/${IdFormation}`,
          formData
        );
        document.getElementById("file").value = "";
        getEtuCertif();
        toast.success("La certificat est envoyé avec succées", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(data);
      }
    } catch (error) {}
  };
  const getEtuCertif = async () => {
    const certif = await axios.get(
      `http://localhost:3001/CertificationRoute/GetCertifUser/${userId}/${IdFormation}`
    );
    console.log(certif.data);
    setcertifEtu(certif.data);
    setcertificat(certif.data[0].certif);
  };
  const retirerCerif = async (id) => {
    Swal.fire({
      title: "Voulez vous supprimer cette certificat !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        axios.delete(
          `http://localhost:3001/CertificationRoute/Supprimer_Certif/${id}`
        );
        setcertifEtu(certifEtu.filter((certifEtu) => certifEtu._id !== id));
        setTimeout(() => {}, 1000);
      }
    });
  };
  useEffect(() => {
    const getDataById = async () => {
      const data = await axios.get(
        `http://localhost:3001/User/AfficherUtilisateur/${userId}`
      );

      setnom(data.data[0].nom);
      setprenom(data.data[0].prenom);
    };

    getDataById();
    getEtuCertif();
    console.log(certificat);
  }, []);
  return (
    <ChakraProvider>
      <label> Télécharger certifat</label>
      <br></br>
      <br></br>
      <Input
        type="file"
        id="file"
        onChange={(e) => setcertif(e.target.files[0])}
      />
      <br></br>
      <br></br>
      <Button onClick={Ajouter_Certif}> Envoyer </Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">
                {nom} {prenom}
              </Th>
              <Th scope="col">Certifat</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {certifEtu.map((item, i) => (
              <Tr>
                <Td></Td>
                <Td>
                  {" "}
                  <a type="button" href={item.certif} target="_blank">
                    <DownloadIcon color="red" />
                  </a>
                </Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    px="2"
                    size="xs"
                    onClick={() => retirerCerif(item._id)}
                  ></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ChakraProvider>
  );
};

export default AjoutCertif;
