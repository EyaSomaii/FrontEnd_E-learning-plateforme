import React, { useState } from "react";
import "./Password.css";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Box, Image, Center, Button, Show, FormLabel } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, isRequired } from "@chakra-ui/form-control";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Password = () => {
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const [showOLD, setShowOLD] = useState(false);
  const [showNV, setShowNV] = useState(false);
  const [showCONFIRM, setShowCONFIRM] = useState(false);
  const [oldpassword, setoldpassword] = useState("");
  const [mot_de_passe, setmot_de_passe] = useState("");
  const [confirm_mdp, setconfirm_mdp] = useState("");
  const history = useHistory();
  const handleClickOLD = () => setShowOLD(!showOLD);
  const handleClickNV = () => setShowNV(!showNV);
  const handleClickCONFIRM = () => setShowCONFIRM(!showCONFIRM);

  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );
    if (data.data[0].Role === "Etudiant") {
      history.push("/profilEtudiant/" + aa);
    } else if (data.data[0].Role === "Formateur") {
      history.push("/profilFormateur/" + aa);
    } else if (data.data[0].Role === "SPAdmin") {
      history.push("/Formations");
    } else if (data.data[0].Role === "Administrateur") {
      history.push("/Administrateur/" + aa);
    }
  };
  const Mofifier_mdp = async (e) => {
    e.preventDefault();
    if (!oldpassword || !mot_de_passe || !confirm_mdp) {
      toast.warning("Il faut remplir tout les champs", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });

      return;
    }
    try {
      const info = {
        oldpassword: oldpassword,
        mot_de_passe: mot_de_passe,
        confirm_mdp: confirm_mdp,
      };
      await axios.put(`http://localhost:3001/User/modierMDP/${aa}`, info);

      localStorage.removeItem("userInfo");
      history.push("/Login");
    } catch (error) {
      toast.error("Verifiez vos données", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  /**<Button
  w="400px"
  margin="1rem"
  color="black"
  marginTop={240}
  onClick={getDataById}
>
  Annuler
</Button>;
*/
  return (
    <div>
      <ChakraProvider>
        <Box
          className="paper"
          p={5}
          shadow="md"
          borderWidth="1px"
          marginTop={50}
          height="600"
        >
          <Center>
            <Image className="logo" w="50px" marginTop={8}></Image>
          </Center>
          <Center>
            <Text fontSize="sm" font-family="Poppins" marginTop={8}>
              <Heading>Changer mot de passe</Heading>
            </Text>
          </Center>
          <Center>
            <Stack spacing={5} w="400px" h="100px" marginTop={50}>
              <FormLabel htmlFor="first-name">Ancien mot de passe : </FormLabel>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    value={oldpassword}
                    type={showOLD ? "text" : "password"}
                    onChange={(e) => setoldpassword(e.target.value)}
                    variant="filled"
                    h="40px"
                    placeholder="Mot de passe"
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickOLD}>
                      {showOLD ? "Cacher" : "voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormLabel htmlFor="first-name">
                Nouveau mot de passe :{" "}
              </FormLabel>
              <FormControl id="password" aria-required="true">
                <InputGroup>
                  <Input
                    value={mot_de_passe}
                    onChange={(e) => setmot_de_passe(e.target.value)}
                    type={showNV ? "text" : "password"}
                    variant="filled"
                    h="40px"
                    placeholder="Mot de passe"
                    isRequired
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickNV}>
                      {showNV ? "Cacher" : "voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormLabel htmlFor="first-name">
                Confirmez nouveau mot de passe :{" "}
              </FormLabel>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    value={confirm_mdp}
                    onChange={(e) => setconfirm_mdp(e.target.value)}
                    type={showCONFIRM ? "text" : "password"}
                    variant="filled"
                    h="40px"
                    placeholder="Mot de passe"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickCONFIRM}>
                      {showCONFIRM ? "Cacher" : "voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </Center>
          <Center>
            <Button
              onClick={Mofifier_mdp}
              bg="#93329E"
              w="400px"
              margin="1rem"
              color="white"
              marginTop={240}
              sx={{
                backgroundColor: "#93329E",
                "&:hover": {
                  backgroundColor: "#93329E",
                },
              }}
            >
              Modifier
            </Button>
          </Center>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Password;
