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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBarSA from "../NavBarSA/NavBarSA";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export const Fiche = () => {
  const history = useHistory();

  const [note1, setnote1] = useState("");
  const [note2, setnote2] = useState("");
  const [note3, setnote3] = useState("");
  const [note4, setnote4] = useState("");
  const [note5, setnote5] = useState("");
  const [note6, setnote6] = useState("");
  const [note7, setnote7] = useState("");
  const [note8, setnote8] = useState("");
  const [avis, setavis] = useState("");
  const { userId, IdFormation } = useParams();

  const AjouterAvis = async (e) => {
    if (
      !note1 ||
      !note2 ||
      !note3 ||
      !note4 ||
      !note5 ||
      !note6 ||
      !note7 ||
      !note8 ||
      !avis
    ) {
      toast.warning("Merci remplir tout les champs ", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    try {
      let info = {
        note1: note1,
        note2: note2,
        note3: note3,
        note4: note4,
        note5: note5,
        note6: note6,
        note7: note7,
        note8: note8,
        avis: avis,
      };
      Swal.fire({
        title:
          "Etes vous sur de vos reponses ! cette évaluation sera rempli une seul fois !",
        icon: "question",
        iconHtml: "?",
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const data = axios.post(
            `http://localhost:3001/FicheEvaluationRoute/AjouterAvis/${userId}/${IdFormation}`,
            info
          );
          const data2 = axios.patch(
            `http://localhost:3001/AcceesFicheRoute/CacherFiche/${userId}/${IdFormation}`
          );
          toast.success("Merci de partager votre avis ", {
            autoClose: 1000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          history.push("/profilEtudiant/" + userId);
          console.log(data);
        } else {
          Swal.fire("Vous allez verefiez vos réponses !", "", "success");
        }
      });
    } catch (error) {}

    //onClose();
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

        <div style={{ height: "100%" }}>
          <div
            style={{
              height: "calc(100% - 64px)",
              overflowY: "scroll",
              width: "auto",
              position: "center",
              marginLeft: "5rem",
              marginRight: "5rem",
            }}
          >
            <ChakraProvider>
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
                  Chèrs étudiants, nous sommes très contents de vous avoir parmi
                  nous et afin de vous proposer de nouvelles sessions et dans de
                  meilleures conditions: merci de consacrer quelques minutes
                  pour remplir le formulaire de satisfaction.
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
                  1. Sur une échelle de 1 à 5, quelle est votre impression
                  globale sur la "Formation : Web Dev" ?
                  <RadioGroup onChange={(e) => setnote1(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote1(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote1(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote1(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote1(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote1(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                  2. Sur une échelle de 1 à 5, veuillez noter l'aménagement de
                  l'espace et le degré de confort :
                  <RadioGroup onChange={(e) => setnote2(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote2(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote2(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote2(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote2(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote2(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                  3. Sur une échelle de 1 à 5, la formation a-t-elle répondu à
                  vos attentes?
                  <RadioGroup onChange={(e) => setnote3(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote3(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote3(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote3(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote3(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote3(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                  4. Sur une échelle de 1 à 5, veuillez noter la logistique de
                  la formation (logistique, accueil, aménagement, pauses...etc.)
                  <RadioGroup onChange={(e) => setnote4(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote4(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote4(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote4(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote4(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote4(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                  5. Sur une échelle de 1 à 5, Notez la pertinence de
                  l'intervenant?
                  <RadioGroup onChange={(e) => setnote5(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote5(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote5(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote5(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote5(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote5(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                  <RadioGroup onChange={(e) => setnote6(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote6("oui")}
                        />
                        <label for="dewey">oui</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote6("non")}
                        />
                        <label for="dewey">non</label>
                      </div>
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
                  7. Avant la formation, avez-vous trouvé l'information
                  suffisante à propos de cette dernière ?
                  <RadioGroup>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) =>
                            setnote7("Les informations nécessaires")
                          }
                        />
                        <label for="dewey"> Les informations nécessaires</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) =>
                            setnote7("La plupart des informations")
                          }
                        />
                        <label for="dewey"> La plupart des informations</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) =>
                            setnote7("Certaines des informations")
                          }
                        />
                        <label for="dewey"> Certaines des informations</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote7("Un peu d'information")}
                        />
                        <label for="dewey"> Un peu d'information</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote7("Aucune des informations")}
                        />
                        <label for="dewey"> Aucune des informations</label>
                      </div>
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
                  8. Quelle est la probabilité que vous recommandiez les
                  formations de RedAcademy à un ami ?
                  <RadioGroup onChange={(e) => setnote8(e)}>
                    <Stack
                      spacing={5}
                      direction="column"
                      style={{ marginTop: "0.5rem" }}
                    >
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote8(1)}
                        />
                        <label for="dewey">1</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote8(2)}
                        />
                        <label for="dewey">2</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote8(3)}
                        />
                        <label for="dewey">3</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote8(4)}
                        />
                        <label for="dewey">4</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="drone"
                          onChange={(e) => setnote8(5)}
                        />
                        <label for="dewey">5</label>
                      </div>
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
                    style={{ marginTop: "0.5rem" }}
                    placeholder=" votre réponse"
                    onChange={(e) => setavis(e.target.value)}
                  />
                </div>
              </Center>

              <Center>
                <div
                  style={{
                    width: "45rem",
                    marginTop: "2rem",
                    marginLeft: "55rem",
                    padding: "1rem",
                  }}
                >
                  <Button size="md" onClick={AjouterAvis}>
                    envoyer
                  </Button>
                </div>
              </Center>
            </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
