import { ChakraProvider } from "@chakra-ui/react";
import MyChats from "../MyChats";

const Chatpage = () => {
  return (
    <ChakraProvider>
      <MyChats />
    </ChakraProvider>
  );
};

export default Chatpage;
