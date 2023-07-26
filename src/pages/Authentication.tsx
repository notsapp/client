import { Flex } from "@chakra-ui/react";
import LoginButton from "../components/LoginButton";
import { useWindowSize } from "../hooks/hooks";

export default function Authentication() {
  const { width, height } = useWindowSize();

  return (
    <Flex
      w={width}
      h={height}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LoginButton />
    </Flex>
  );
}
