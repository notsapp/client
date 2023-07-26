import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import LoginButton from "../components/LoginButton";
import { useWindowSize } from "../hooks/hooks";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

function Subtitle() {
  return (
    <Center bgColor={"#E0F6CA"} p={"10px"} borderRadius={"10px"} h={"50px"}>
      <TypeAnimation
        sequence={[
          "Welcome to NotsApp!",
          1000,
          "This message was deleted.",
          1000,
        ]}
        speed={50}
        style={{ fontSize: "1em", fontStyle: "italic" }}
        cursor={false}
      />
    </Center>
  );
}

export type TemplateProps = {
  children: JSX.Element | JSX.Element[];
};

function Template({ children }: TemplateProps) {
  const { width, height } = useWindowSize();
  return (
    <Flex
      w={width}
      h={height}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"#FFFFFF"}
      flexDir={"column"}
      color={"#215C54"}
      gap={"5px"}
    >
      {children}
    </Flex>
  );
}

function Loading() {
  return <Text>Loading...</Text>;
}

export default function Authentication() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Template>
      <Loading />
    </Template>
  ) : (
    <Template>
      <Heading>NotsApp</Heading>
      <Subtitle />
      <LoginButton setLoading={setLoading} />
    </Template>
  );
}
