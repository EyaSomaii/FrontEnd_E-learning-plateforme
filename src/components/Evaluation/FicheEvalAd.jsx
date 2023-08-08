import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Checkbox,
  Flex,
  Radio,
  Heading,
  Input,
  Stack,
  RadioGroup,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBarE from "../Etudiant/SideBarE/SideBarE";
import NavBarSA from "../NavBarSA/NavBarSA";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const FicheEvalAd = () => {
  const [note1, setnote1] = useState("");
  const [note2, setnote2] = useState("");
  const [note3, setnote3] = useState("");
  const [note4, setnote4] = useState("");
  const [note5, setnote5] = useState("");
  const [note6, setnote6] = useState("");
  const [note7, setnote7] = useState("");
  const [note8, setnote8] = useState("");
  const [avis, setavis] = useState("");
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(true);
  const { userId, IdFormation } = useParams();

  const getFicheEtu = async (e) => {
    try {
      {
        const { data } = await axios.get(
          `http://localhost:3001/FicheEvaluationRoute/AfficherByIdEtu/${userId}/${IdFormation}`
        );
        setnote1(data.note1 + "");
        console.log(" " + data.note1);
        console.log(typeof data.note1);
        setnote2(data.note2);
        setnote3(data.note3);
        setnote4(data.note4);
        setnote5(data.note5);
        setnote6(data.note6);
        setnote7(data.note7);
        setnote8(data.note8);
        setavis(data.avis);
      }
    } catch (error) {}
    //onClose();
  };

  const DonnerAccesFiche = async (e) => {
    try {
      {
        const { data } = await axios.post(
          `http://localhost:3001/AcceesFicheRoute/Ajoutercertif/${userId}/${IdFormation}`
        );
        setshow(true);
        setshow1(false);

        toast.success("Accés a la fiche donné avec succées", {
          autoClose: 3000,
        });
        setavis(data.avis);
      }
    } catch (error) {}
    //onClose();
  };
  const RetirerAccesFiche = async (e) => {
    Swal.fire({
      title: "Voulez vous Annuler l'acces a la fiche  !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        const { data } = axios.delete(
          `http://localhost:3001/AcceesFicheRoute/SupprimerAcces/${userId}/${IdFormation}`
        );
        setshow1(true);
        setshow(false);
        setavis(data.avis);
      }
    });

    //onClose();
  };
  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/AcceesFicheRoute/GetUserFicheParFormation/${userId}/${IdFormation}`
    );
    if (data.data[0].accees == true) {
      setshow(true);
      setshow1(false);
    } else {
      setshow1(true);
      setshow(false);
    }
  };
  useEffect(() => {
    getFicheEtu();
    getDataById();
  }, []);
  return (
    <ChakraProvider>
      {show1 ? (
        <>
          {" "}
          <Switch id="isRequired" isRequired onChange={DonnerAccesFiche} />
        </>
      ) : null}
      {show ? (
        <>
          {" "}
          <Switch
            id="isChecked"
            defaultIsChecked
            onChange={RetirerAccesFiche}
          />
        </>
      ) : null}

      <Heading style={{ textAlign: "center" }}> EVALUATION</Heading>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#E2C8E0 ",
          }}
        >
          Chèrs étudiants, nous sommes très contents de vous avoir parmi nous et
          afin de vous proposer de nouvelles sessions et dans de meilleures
          conditions: merci de consacrer quelques minutes pour remplir le
          formulaire de satisfaction.
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          1. Sur une échelle de 1 à 5, quelle est votre impression globale sur
          la "Formation : Web Dev" ?
          <RadioGroup value={note1}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          2. Sur une échelle de 1 à 5, veuillez noter l'aménagement de l'espace
          et le degré de confort :
          <RadioGroup value={note2}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          3. Sur une échelle de 1 à 5, la formation a-t-elle répondu à vos
          attentes?
          <RadioGroup value={note3}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          4. Sur une échelle de 1 à 5, veuillez noter la logistique de la
          formation (logistique, accueil, aménagement, pauses...etc.)
          <RadioGroup value={note4}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          5. Sur une échelle de 1 à 5, Notez la pertinence de l'intervenant?
          <RadioGroup value={note5}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          6. Je souhaite participer à d'autres formations
          <RadioGroup value={note6}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="oui" isDisabled>
                oui
              </Radio>
              <Radio colorScheme="green" value="non" isDisabled>
                nom
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          7. Avant la formation, avez-vous trouvé l'information suffisante à
          propos de cette dernière ?
          <RadioGroup value={note7}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio
                colorScheme="green"
                value=" Les informations nécessaires"
                isDisabled
              >
                Les informations nécessaires
              </Radio>
              <Radio
                colorScheme="green"
                value="  La plupart des informations"
                isDisabled
              >
                La plupart des informations
              </Radio>
              <Radio
                colorScheme="green"
                value=" Certaines des informations"
                isDisabled
              >
                Certaines des informations
              </Radio>
              <Radio
                colorScheme="green"
                value="Un peu d'information"
                isDisabled
              >
                Un peu d'information
              </Radio>
              <Radio
                colorScheme="green"
                value=" Aucune des informations"
                isDisabled
              >
                Aucune des informations
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          8. Quelle est la probabilité que vous recommandiez les formations de
          RedAcademy à un ami ?
          <RadioGroup value={note8}>
            <Stack
              spacing={5}
              direction="column"
              style={{ marginTop: "0.5rem" }}
            >
              <Radio colorScheme="green" value="1" isDisabled>
                1
              </Radio>
              <Radio colorScheme="green" value="2" isDisabled>
                2
              </Radio>
              <Radio colorScheme="green" value="3" isDisabled>
                3
              </Radio>
              <Radio colorScheme="green" value="4" isDisabled>
                4
              </Radio>
              <Radio colorScheme="green" value="5" isDisabled>
                5
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </Center>
      <Center>
        <div
          style={{
            width: "45rem",
            marginTop: "2rem",
            padding: "1rem",
            border: "groove",
          }}
        >
          9. Avez-vous des propositions de thèmes de formation que vous
          souhaitez suivre?
          <Input
            isDisabled
            style={{ marginTop: "0.5rem" }}
            placeholder=" votre réponse"
            value={avis}
          />
        </div>
      </Center>
    </ChakraProvider>
  );
};

export default FicheEvalAd;
