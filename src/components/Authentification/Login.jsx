import React from "react";
import "./Login.css";
import logo from "../../images/logo.png";
import { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Box, Image, Center, Button } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [mot_de_passe, setmot_de_passe] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !mot_de_passe) {
      toast.warning("Il faut remplir tout les champs", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });

      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3001/User/Login",
        { email, mot_de_passe },
        config
      );

      const datusera = await axios.get(
        "http://localhost:3001/User/AfficherUtilisateur/" + data.userId
      );

      toast.success("Login fait avec succées", { autoClose: 2000 });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      if (datusera.data[0].TestConnection == false) {
        history.push("/ChangerMotDePasse");
      } else if (datusera.data[0].TestConnection == true) {
        if (datusera.data[0].Role === "Etudiant") {
          history.push("/profilEtudiant/" + data.userId);
        } else if (datusera.data[0].Role === "Formateur") {
          history.push("/profilFormateur/" + data.userId);
        } else if (datusera.data[0].Role === "SPAdmin") {
          history.push("/Formations");
        } else if (datusera.data[0].Role === "Administrateur") {
          history.push("/Formations");
        }
      }
    } catch (error) {
      toast.error("Verifiez vos données", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <ChakraProvider>
        <Box
          className="paper"
          p={5}
          shadow="md"
          borderWidth="1px"
          marginTop={100}
        >
          <Center>
            <Image className="logo" w="50px" src={logo} marginTop={8}></Image>
          </Center>
          <Center>
            <Text fontSize="sm" font-family="Poppins" marginTop={8}>
              <Heading>S'identifier</Heading>
            </Text>
          </Center>
          <Center>
            <Stack spacing={5} w="400px" h="100px" marginTop={50}>
              <FormControl id="email" isRequired>
                <Input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  h="40px"
                />
              </FormControl>
              <br></br>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    value={mot_de_passe}
                    onChange={(e) => setmot_de_passe(e.target.value)}
                    type={show ? "text" : "password"}
                    variant="filled"
                    h="40px"
                    placeholder="Mot de passe"
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Cacher" : "Voir"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </Center>
          <Center>
            <Button
              bg="#93329E"
              w="400px"
              color="white"
              marginTop={50}
              onClick={submitHandler}
              isLoading={loading}
              sx={{
                backgroundColor: "#93329E",
                "&:hover": {
                  backgroundColor: "#93329E",
                },
              }}
            >
              Se connecter
            </Button>
          </Center>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Login;
