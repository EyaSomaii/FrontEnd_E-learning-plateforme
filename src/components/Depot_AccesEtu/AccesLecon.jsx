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
  FormLabel,
  Thead,
  Tbody,
  Switch,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AccesLecon = ({ md }) => {
  const { userId } = useParams();
  const { IdFormation } = useParams();
  const history = useHistory();
  const [leçon, setleçon] = useState([]);

  const [showacces, setshowacces] = useState(false);
  const [IdLecon, setIdLecon] = useState("");
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const RetirerAccees = (id) => {
    let info = {
      lecon: id,
    };
    axios.patch(`http://localhost:3001/lecon/SuppAcces/${userId}`, info);
    setleçon(leçon.filter((leçon) => leçon._id !== id));
    setTimeout(() => {}, 1000);
    toast.success("Accés retirer avec sucées", {
      autoClose: 1000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const GetLeconAvecAcces = async () => {
    let tab = [];
    const data = await axios.get(
      `http://localhost:3001/lecon/MyLecons_Formation/${userId}/${IdFormation}`,
      {
        params: {
          formateur: aa,
          module: md,
        },
      }
    );
    setleçon(data.data);
  };

  useEffect(() => {
    GetLeconAvecAcces();
  }, []);
  return (
    <>
      <Table colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Liste des lesson</Th>
            <Th>Acces</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leçon.map((item, indice) => (
            <Tr>
              <Td>{item.titre}</Td>

              <Td>
                {" "}
                <Button
                  onClick={() => {
                    RetirerAccees(item._id);
                  }}
                >
                  {" "}
                  Retirer acces
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default AccesLecon;
