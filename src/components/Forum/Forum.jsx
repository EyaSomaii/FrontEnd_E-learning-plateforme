import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Cancel, Delete, PermMedia } from "@mui/icons-material";
import Swal from "sweetalert2";
import io from "socket.io-client";
import {
  Avatar,
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Stack,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Moment from "react-moment";
import { DeleteIcon } from "@chakra-ui/icons";
const ENDPOINT = "http://localhost:3001";
var socket;
export default function Feed({ md, user }) {
  const [file, setFile] = useState(null);
  const [contenu, setcontenu] = useState("");
  const [image, setimage] = useState("");
  const [posts, setPosts] = useState([]);
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const [socketConnected, setSocketConnected] = useState(false);
  const [superAdmin, setsuperAdmin] = useState(false);
  const [Administrateur, setAdministrateur] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(
      `http://localhost:3001/ForumRoute/AffForum/${md}`
    );

    setPosts(res.data);

    const msg = res.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    socket.emit("join Forum", md);
    /**socket.on("comment recieved", (msg) => {
      setPosts([...posts, msg]);
    });*/
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const RetirerCommentaire = async (id) => {
    Swal.fire({
      title: "Voulez vous retirer ce commentaire !",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression Fait Avec Succees", "", "success");
        console.log(id);
        console.log("supp");
        axios.delete(`http://localhost:3001/ForumRoute/suppCommentaire/${id}`);
        setPosts(posts.filter((posts) => posts._id !== id));
        setTimeout(() => {}, 1000);
      }
    });
  };
  const AjouterCommentaire = async (e) => {
    const newPost = {
      content: contenu,
      Module: md,
    };
    console.log(file);
    if (file != null) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:3001/api/upload", data);

        document.getElementById("input").value = " ";
        //document.getElementById("image").value = "";
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        `http://localhost:3001/ForumRoute/${aa}`,
        newPost
      );

      socket.emit("new comment", res.data);

      fetchPosts();
    } catch (err) {}
    setcontenu("");
  };
  const getDataById = async () => {
    const data = await axios.get(
      `http://localhost:3001/User/AfficherUtilisateur/${aa}`
    );
    setimage(data.data[0].image);
    if (data.data[0].Role == "SPAdmin") {
      setsuperAdmin(true);
    } else if ((data.data[0].Role = "Administrateur")) {
      setAdministrateur(true);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", aa);
    socket.on("connected", () => setSocketConnected(true));
  }, [false]);
  useEffect(() => {
    socket.on("comment recieved", (newComment) => {
      setPosts([...posts, newComment]);
    });
  });

  return (
    <ChakraProvider>
      <br /> <br /> <br />
      <hr></hr>
      <Heading size="lg" margin="1rem">
        {" "}
        Espace de forum{" "}
      </Heading>
      <Box
        style={{ border: "groove" }}
        marginRight="3rem"
        marginLeft="3rem"
        marginTop="0.5rem"
        marginBottom="0.5rem"
        padding="0.5rem"
      >
        <Flex>
          <Center w="10%" padding="0.5rem">
            <Wrap>
              <WrapItem>
                <Avatar size="lg" name="Prosper Otemuyiwa" src={image} />{" "}
              </WrapItem>
            </Wrap>
          </Center>
          <Center w="90%" padding="0.5rem">
            <Textarea
              id="forum"
              placeholder="Ajouter un commentaire ou poser une question"
              value={contenu}
              onChange={(e) => setcontenu(e.target.value)}
            />
          </Center>
        </Flex>
        <hr />
        <Center padding="0.5rem">
          <Input
            placeholder="Ajouter une image"
            type="file"
            name="image"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Center>
        <Flex>
          <Center marginLeft="50rem" padding="0.5rem">
            <Button
              bg="green"
              color="white"
              type="Reset"
              onClick={AjouterCommentaire}
            >
              {" "}
              Ajouter{" "}
            </Button>
          </Center>
        </Flex>
      </Box>
      <Heading size="md" margin="1rem">
        {" "}
        Commentaires disponibles
      </Heading>
      {posts
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
        .map((p, i) => (
          <Box
            style={{ border: "groove" }}
            marginRight="3rem"
            marginLeft="3rem"
            marginTop="0.5rem"
            marginBottom="0.5rem"
            padding="0.5rem"
          >
            <Grid templateColumns="repeat(5, 1fr)" gap={5}>
              <GridItem colSpan={2} h="10">
                {" "}
                <Avatar size="sm" name="Kent Dodds" src={p.sender.image} />{" "}
                {p.sender.nom} {p.sender.prenom}
              </GridItem>
              <GridItem colStart={4} colEnd={6} h="10">
                {" "}
                <Moment format="MMMM Do YYYY, h:mm:ss a">{p.updatedAt}</Moment>
              </GridItem>
              <GridItem colStart={6} colEnd={6} h="10">
                {" "}
                {p.sender._id == aa ? (
                  <DeleteIcon
                    onClick={() => {
                      RetirerCommentaire(p._id);
                    }}
                  />
                ) : superAdmin || Administrateur ? (
                  <DeleteIcon
                    onClick={() => {
                      RetirerCommentaire(p._id);
                    }}
                  />
                ) : null}
              </GridItem>
            </Grid>
            {p.image != undefined ? (
              <>
                <Box padding="0.5rem">{p.content}</Box>

                <Box padding="0.5rem">
                  <Center>
                    <Image id="image" boxSize="400px" src={p.image} alt="" />
                  </Center>
                </Box>
              </>
            ) : (
              <>
                <Box padding="0.5rem">{p.content}</Box>
              </>
            )}
          </Box>
        ))}
    </ChakraProvider>
  );
}
