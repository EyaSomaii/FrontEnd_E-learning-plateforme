import { Box, Stack, Text } from "@chakra-ui/layout";
import axios from "axios";
import ListUser from "./ListUser";
import { useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/tooltip";
import { useHistory } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Avatar, Button } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
const MyChats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [showmessages, setshowmessages] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [mesUsers, setmesUsers] = useState([]);
  const [IdChat, setIdChat] = useState("");
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const accessChat = async (reciverId) => {
    await axios.post(
      `http://localhost:3001/ChatRoomRoute/AccesChatRoom/${aa}`,
      { reciverId }
    );
    onClose();
    fetchChats();
  };

  const RecupererUtilisateurConnecter = async () => {
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
      history.push("/Formations");
    }
  };

  const filtrer_Utilisateur = async (mesUsers, searchTerm) => {
    const result = mesUsers.filter(
      (mesUsers) =>
        mesUsers.nom.toLowerCase().includes(searchTerm) ||
        mesUsers.prenom.toLowerCase().includes(searchTerm) ||
        mesUsers.email.toLowerCase().includes(searchTerm)
    );
    setmesUsers(result);
  };

  const Recherche_Resultat = async (e) => {
    const searchTerm = e.currentTarget.value;
    axios
      .get(`http://localhost:3001/User/RecupererUsersChats/${aa}`)
      .then((res) => {
        filtrer_Utilisateur(res.data, searchTerm);
      });
  };
  const handRécupererUsersChat = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/User/RecupererUsersChats/${aa}`
    );
    setmesUsers(data);
  };

  const fetchChats = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/ChatRoomRoute/GetUserChatsByIdUser/${aa}`
    );

    setChats(data);
  };
  const OnOpenMessage = async () => {
    if (showmessages == false) {
      setshowmessages(true);
    }
  };
  const OncloseMessage = async () => {
    setshowmessages(false);
  };

  useEffect(() => {
    fetchChats();
    handRécupererUsersChat();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Tooltip
        label="Recherche des utilisateurs pour discuter"
        hasArrow
        placement="bottom-end"
        style={{ marginTop: "4px", padding: "2.5rem" }}
      >
        <Button variant="ghost" onClick={onOpen}>
          <i className="fas fa-search"></i>
          <Text d={{ base: "none", md: "flex" }} px={4}>
            Recherche utilisateur
          </Text>
        </Button>
      </Tooltip>
      <Button variant="ghost" style={{ marginTop: "4px" }}>
        <Text
          d={{ base: "none", md: "flex" }}
          px={4}
          onClick={RecupererUtilisateurConnecter}
        >
          Retour
        </Text>
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <input
              className="form-control"
              style={{ width: "270px" }}
              type="search"
              placeholder="Recherche utilisateur"
              name="searchTerm"
              onChange={Recherche_Resultat}
            ></input>
            <br></br>
            {mesUsers.map((user) => (
              <ListUser
                key={user._id}
                userprops={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <Box
          flexDir="column"
          alignItems="center"
          p={3}
          bg="white"
          w={{ base: "100%", md: "31%" }}
          borderRadius="lg"
          borderWidth="1px"
        >
          <Box
            d="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat) => (
                  <Box
                    onClick={() => {
                      setSelectedChat(chat);
                      OnOpenMessage();
                      setIdChat(chat._id);
                    }}
                    onMouseUp={() => {
                      OncloseMessage();
                    }}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Text>
                      <Box
                        cursor="pointer"
                        bg="#E8E8E8"
                        _hover={{
                          background: "#38B2AC",
                          color: "white",
                        }}
                        w="100%"
                        d="flex"
                        alignItems="center"
                        color="black"
                        px={3}
                        py={2}
                        mb={2}
                        borderRadius="lg"
                      >
                        <Avatar
                          mr={2}
                          size="sm"
                          cursor="pointer"
                          name={
                            chat.users[0]._id == aa
                              ? chat.users[1].nom
                              : chat.users[0].nom
                          }
                          src={
                            chat.users[0]._id == aa
                              ? chat.users[1].image
                              : chat.users[0].image
                          }
                        />
                        <Box>
                          {chat.users[0]._id == aa ? (
                            <Text>
                              {chat.users[1].nom} {chat.users[1].prenom}
                            </Text>
                          ) : (
                            <Text>
                              {chat.users[0].nom} {chat.users[0].prenom}
                            </Text>
                          )}
                        </Box>
                      </Box>
                    </Text>
                  </Box>
                ))}
              </Stack>
            ) : null}
          </Box>
        </Box>

        {showmessages ? <SingleChat idChat={IdChat}></SingleChat> : null}
      </Box>
    </div>
  );
};

export default MyChats;
