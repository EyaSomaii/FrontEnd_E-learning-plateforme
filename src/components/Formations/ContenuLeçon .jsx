import { useHistory, useParams } from "react-router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  AspectRatio,
  Badge,
  Box,
  Center,
  ChakraProvider,
  Container,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Upload, message } from "antd";

import { InboxOutlined } from "@ant-design/icons";

import {
  ChevronRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
const { Dragger } = Upload;

export const ContenuLeçon = ({ propss }) => {
  const [form, setform] = useState([]);
  const [vid, setvid] = useState([]);
  const [docx, setdocx] = useState([]);

  const { userId } = useParams();
  const [Modules, setModules] = useState([]);

  useEffect(() => {
    console.log(propss);
    const Lecon = () => {
      const data = axios
        .get(`http://localhost:3001/lecon/AffleconById/${propss}`)
        .then((result) => {
          console.log(result.data);
          setform(result.data[0].texte);
          setvid(result.data[0].video);
          setdocx(result.data[0].Quiz);
          console.log(result.data[0].Quiz);
        });
    };

    Lecon();
  }, []);
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn.startsWith("Texte") && isLoggedIn.length > 6) {
      let ss = isLoggedIn.slice(6);
      return (
        <ChakraProvider>
          <Text size="sm">
            <Box>
              {" "}
              <Box padding="1rem" style={{ border: "groove" }}>
                {ss}
              </Box>
            </Box>
          </Text>
        </ChakraProvider>
      );
    } else if (
      isLoggedIn.startsWith("image") &&
      isLoggedIn.split(",")[1] != "NaN"
    ) {
      let kk = isLoggedIn.slice(6);
      return (
        <Image
          display="block"
          bg="#E2C8E0"
          marginLeft="auto"
          marginRight="auto"
          size="md"
          marginTop="0.5rem"
          marginBottom="0.5rem"
          src={`http://localhost:3001/Uploads/${kk}`}
          alt="Dan Abramov"
        />
      );
    } else return null;
  }
  return (
    <div>
      {form.map((item, index) => (
        <Greeting isLoggedIn={item} />
      ))}
      <Box bg="#ead1dc" marginTop="1rem">
        <Center>
          <Heading color="#5b5b5b" size="md" w="fit-content" isTruncated>
            <Box padding="1rem">Vidéos de la leçon</Box>
          </Heading>
        </Center>
      </Box>
      <Container maxW="container.xl">
        <Center marginTop="1rem">
          <SimpleGrid columns={[3, null, 4]} spacing="30px">
            {vid.map((videp) => (
              <Box
                maxW="2xl"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <video
                  id="my_video_1"
                  controls
                  preload="none"
                  //poster="https://img.freepik.com/vecteurs-libre/illustration-du-planeur-reunion-quotidien_82574-6939.jpg?w=2000"
                >
                  <source
                    src={`http://localhost:3001/Uploads/${videp}`}
                    type="video/mp4"
                  />
                </video>
              </Box>
            ))}
          </SimpleGrid>
        </Center>
      </Container>
      <Box>
        <Box bg="#ead1dc" marginTop="1rem">
          <Center>
            <Heading color="#5b5b5b" size="md" w="fit-content" isTruncated>
              <Box padding="1rem">Autres ressources</Box>
            </Heading>
          </Center>
        </Box>
        <Center marginTop="1rem">
          <SimpleGrid columns={[3, null, 4]} spacing="30px">
            {docx.map((docs) => (
              <List spacing={3}>
                <a href={`http://localhost:3001/Uploads/${docs}`}>
                  <ListItem>
                    <ListIcon as={DownloadIcon} color="#93329E" />
                    {docs.split(".")[0]}
                  </ListItem>
                </a>
              </List>
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    </div>
  );
};
