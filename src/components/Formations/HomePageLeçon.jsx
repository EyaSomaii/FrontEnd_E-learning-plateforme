import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const HomePageLeçon = ({
  nom,
  prenom,
  email,
  numTel,
  image,
  TitreModule,
}) => {
  return (
    <>
      <Box
        style={{ border: "groove", width: "600px", height: "200px" }}
        marginLeft="7rem"
        marginRight="7rem"
      >
        <Box padding="0.5rem">
          <Heading size="md">Enseignant de ce module </Heading>
        </Box>
        <Flex>
          <Center padding="0.5rem" w="50%">
            <Wrap>
              <WrapItem>
                <Avatar size="2xl" src={image} />{" "}
              </WrapItem>
            </Wrap>
          </Center>
          <Box padding="0.5rem" w="50%">
            <Box padding="0.5rem">
              <p>
                Nom : {nom}
                <br />
                Prenom : {prenom}
                <br />
                E-mail : {email}
                <br />
                Numero de telephone : {numTel}
              </p>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
