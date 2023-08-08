import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
const ListUser = ({ handleFunction, userprops }) => {
  return (
    <ChakraProvider>
      <Box
        onClick={handleFunction}
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
          name={userprops.nom}
          src={userprops.image}
        />
        <Box>
          <Text>
            {userprops.nom} {userprops.prenom}
          </Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {userprops.email}
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default ListUser;
