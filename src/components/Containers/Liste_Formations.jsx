import React, { useState, useEffect } from "react";
import { Card } from "antd";
import {
  Badge,
  Box,
  Image,
  SimpleGrid,
  Container,
  AspectRatio,
  ChakraProvider,
  Center,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
//import "antd/dist/antd.css";
//import Meta from "antd/lib/card/Meta";
import { Player } from "video-react";

const Liste_Formations = ({ props }) => {
  const history = useHistory();

  return (
    <div>
      {" "}
      <Box maxW="2xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <video id="my_video_1" controls preload="none" poster={props.poster}>
          <source src={props.video} type="video/mp4" />
        </video>
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="purple"
              onClick={() => {
                history.push("/DetailFormation/" + props._id);
              }}
            >
              {" "}
              Rejoindre
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {props.Titre}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Liste_Formations;
