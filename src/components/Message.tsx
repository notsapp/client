import { User } from "@auth0/auth0-react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import UserModal from "./UserModal";
import { useState } from "react";

export type ContentProps = {
  content: string;
  createdDate: string;
  createdTime: string;
  flip: boolean;
};

export type SenderProps = {
  user: User | undefined;
};

export type MessageProps = ContentProps & SenderProps;

function MessageSender({ user }: SenderProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <GridItem
      display={"flex"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box bgColor={"white"} borderRadius={"50%"} w={"50px"} h={"50px"}>
        <Image
          borderRadius={"2px"}
          src={user?.picture}
          onClick={() => setModalIsOpen(true)}
        />
      </Box>
      <UserModal user={user} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </GridItem>
  );
}

function MessageContent({
  content,
  flip,
  createdDate,
  createdTime,
}: ContentProps) {
  return (
    <GridItem display={"flex"} justifyContent={"center"}>
      <Flex
        bgColor={flip ? "#FFFFFF" : "#E0F6CA"}
        flexDir={"column"}
        justifyContent={"center"}
        pl={"10px"}
        pr={"10px"}
        borderRadius={"10px"}
        w={"85%"}
      >
        <Text
          m={"10px"}
          fontSize={"20px"}
          alignSelf={"flex-start"}
          overflowWrap={"anywhere"}
        >
          {content}
        </Text>
        <Text fontSize={"10px"} alignSelf={"flex-end"}>
          {createdDate}
        </Text>
        <Text fontSize={"10px"} alignSelf={"flex-end"} mb={"5px"}>
          {createdTime}
        </Text>
      </Flex>
    </GridItem>
  );
}

export default function Message({
  content,
  flip,
  user,
  createdDate,
  createdTime,
}: MessageProps) {
  return user && flip ? (
    <Grid gridTemplateColumns={"1fr 3fr"} py={"10px"}>
      <MessageSender user={user} />
      <MessageContent
        content={content}
        flip={flip}
        createdDate={createdDate}
        createdTime={createdTime}
      />
    </Grid>
  ) : (
    <Grid gridTemplateColumns={"3fr 1fr"} py={"10px"}>
      <MessageContent
        content={content}
        flip={flip}
        createdDate={createdDate}
        createdTime={createdTime}
      />
      <MessageSender user={user} />
    </Grid>
  );
}
