import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Badge,
  StarIcon,
  Image,
  SimpleGrid,
  Container,
  Center,
  useToast,
} from "@chakra-ui/react";
import {
  EditIcon,
  SmallAddIcon,
  PlusSquareIcon,
  CalendarIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import Item from "antd/lib/list/Item";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const CardGrpEtu = ({
  props,
  IdFormation,
  applliste,
  eliminerEtudiant,
  Id,
}) => {
  const [showAD, setshowAD] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const [showAdministrateur, setshowAdministrateur] = useState(false);

  const history = useHistory();
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const { userId } = useParams();
  const getuser = async () => {
    await axios
      .get(`http://localhost:3001/User/AfficherUtilisateur/${aa}`)
      .then((result) => {
        if (result.data[0].Role == "SPAdmin") {
          setshowAD(true);
        } else if (result.data[0].Role == "Formateur") {
          setshowForm(true);
        } else if (result.data[0].Role == "Administrateur") {
          setshowAdministrateur(true);
        }
      });
  };

  useEffect(() => {
    getuser();
  });
  return (
    <div>
      <ChakraProvider>
        <Box
          key={props._id}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={props.image}></Image>

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {props.nom} {props.prenom}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.email}
            </Box>

            <Box>
              {props.numTel}
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>
            <br />
            <hr />
            <br />
            {showForm ? (
              <Stack spacing={2} direction="row">
                <Button
                  leftIcon={<PlusSquareIcon />}
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  size="xs"
                  onClick={() => {
                    history.push(
                      "/DetailFormation/" + props._id + "/" + IdFormation
                    );
                  }}
                >
                  Gérer_dépôt_accès
                </Button>
              </Stack>
            ) : null}

            <br></br>
            {showAD || showAdministrateur ? (
              <>
                <Stack spacing={2} direction="row">
                  <Button
                    leftIcon={<PlusSquareIcon />}
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                    size="xs"
                    onClick={() => {
                      history.push(
                        "/FicheEval_Acces/" + props._id + "/" + IdFormation
                      );
                    }}
                  >
                    Evaluation
                  </Button>
                  <Button
                    leftIcon={<PlusSquareIcon />}
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                    size="xs"
                    onClick={() => {
                      eliminerEtudiant(IdFormation, props._id);
                    }}
                  >
                    Eliminer
                  </Button>
                </Stack>
              </>
            ) : null}
            <br />
          </Box>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default CardGrpEtu;
