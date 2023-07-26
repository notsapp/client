import { Flex } from "@chakra-ui/react";
import LoginButton from "../components/LoginButton";

export default function Authentication() {
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LoginButton />
    </Flex>
  );
}
