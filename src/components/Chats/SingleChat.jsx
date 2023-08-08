import { Avatar, ChakraProvider, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import "./Style.css";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
var socket;
const SingleChat = ({ idChat }) => {
  const [messages, setmessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bb = localStorage.getItem("userInfo");
  const aa = bb.split(",")[0].split(":")[1].split('"')[1];
  const [socketConnected, setSocketConnected] = useState(false);

  const Recuperer_messages = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/MessageRoute/message/${idChat}`
      );

      setmessages(data);

      socket.emit("join chat", idChat);

      //
    } catch (error) {
      alert("erreur");
    }
  };
  const Envoi_Message = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `http://localhost:3001/MessageRoute/${aa}`,
          {
            content: newMessage,
            chatId: idChat,
          }
        );

        socket.emit("new message", data);
        setmessages([...messages, data]);
      } catch (error) {
        alert("erreur message envoie");
      }
    }
  };
  useEffect(() => {
    Recuperer_messages();
    socket = io(ENDPOINT);
    socket.emit("setup", aa);
    socket.on("connected", () => setSocketConnected(true));
  }, [false]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setmessages([...messages, newMessageRecieved]);
    });
  });
  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  return (
    <ChakraProvider>
      <Box
        d="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <div className="messages">
          <ScrollableFeed>
            {messages.map((m, i) => (
              <div style={{ display: "flex" }} key={m._id}>
                {(isSameSender(messages, m, i, aa) ||
                  isLastMessage(messages, i, aa)) && (
                  <Tooltip
                    label={m.sender.prenom}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.nom}
                      src={m.sender.image}
                    />
                  </Tooltip>
                )}
                <span
                  style={{
                    backgroundColor: `${
                      m.sender._id === aa ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    marginLeft: isSameSenderMargin(messages, m, i, aa),
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    marginTop: "10px",
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </ScrollableFeed>
        </div>

        <FormControl
          id="first-name"
          isRequired
          mt={3}
          onKeyDown={Envoi_Message}
        >
          <Input
            variant="filled"
            bg="#E0E0E0"
            placeholder="Entrer un message.."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
        </FormControl>
      </Box>
    </ChakraProvider>
  );
};

export default SingleChat;
