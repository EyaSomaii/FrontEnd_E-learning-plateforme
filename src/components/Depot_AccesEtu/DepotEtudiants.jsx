import axios from "axios";
import React, { useEffect } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
//import "./Edit.css";
import { Avatar, Button, ButtonGroup, Collapse, Stack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Badge,
  Form,
  InputLeftElement,
  StarIcon,
  Image,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
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
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const DepotEtudiants = ({ md }) => {
  const { userId } = useParams();
  const { IdFormation } = useParams();
  const [DepotEtudiant, setDepotEtudiant] = useState([]);
  const [nom, setnom] = useState("");
  const [Note, setNote] = useState("");
  const [prenom, setprenom] = useState("");

  const AjouterNote = async (iddplecon, e) => {
    try {
      setNote(e.target.value);
      let info = {
        Note: e.target.value,
      };
      {
        const data = await axios.patch(
          `http://localhost:3001/DepotETU/AjouterNoteDepot/${iddplecon}`,
          info
        );
        getEtuDepots();
        alert("note ajoutee  avec succés ");
      }
    } catch (error) {}
    //onClose();
  };

  const getEtuDepots = async () => {
    let tab = [];
    const data = await axios.get(
      `http://localhost:3001/DepotETU/Getdepotetu/${userId}`,
      {
        params: {
          ModuleId: md,
        },
      }
    );

    setDepotEtudiant(data.data);
  };

  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${userId}`
    );

    setnom(data.data[0].nom);
    setprenom(data.data[0].prenom);
  };

  useEffect(() => {
    getEtuDepots();
    getDataById();
  }, []);

  return (
    <>
      <Table colorScheme="teal">
        <Thead>
          <Tr>
            <Th>
              {nom} {prenom}
            </Th>
            <Th>Leçon</Th>
            <Th>reference depot</Th>
            <Th>DateRemise</Th>
            <Th>Rendu</Th>
            <Th>Note</Th>
            <Th>Statut</Th>
          </Tr>
        </Thead>

        <Tbody>
          {DepotEtudiant.map((item) => (
            <Tr>
              <Td></Td>
              <Td> {item.lessonId.titre}</Td>
              <Td> {item.travailId.Titre}</Td>
              <Td> {item.DateRemise}</Td>
              <Td>
                {" "}
                <a type="button" href={item.Docs} target="_blank">
                  <DownloadIcon color="red" />
                </a>{" "}
              </Td>
              <Td>
                <Select
                  placeholder="Note"
                  value={Note}
                  required
                  onChange={(e) => {
                    AjouterNote(item._id, e);
                  }}
                >
                  <option value="Validé"> Validé</option>
                  <option value="A refaire">A refaire </option>
                </Select>{" "}
              </Td>
              <Td>
                {item.Note == "Validé" ? (
                  <h1 style={{ color: "green" }}>Validé</h1>
                ) : item.Note == "A refaire" ? (
                  <h1 style={{ color: "red" }}>A refaire</h1>
                ) : (
                  <h1 style={{ color: "#DCB233" }}>Pas encore validé</h1>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default DepotEtudiants;
