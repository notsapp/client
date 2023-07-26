import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import LogoutButton from "../components/LogoutButton";
import MessageInput from "../components/MessageInput";
import Message from "../components/Message";
import { User, useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useWindowSize } from "../hooks/hooks";

const SERVER_URL =
  import.meta.env.mode === "development"
    ? import.meta.env.VITE_DEV_SERVER_URL
    : import.meta.env.VITE_PROD_SERVER_URL;

const API_KEY = import.meta.env.VITE_SERVER_API_KEY;

const socket = io(SERVER_URL);

type SocketMessage = {
  content: string;
  createdDate: string;
  createdTime: string;
  user: User;
  createdDateTime?: Date;
};

export default function Home() {
  const [messages, setMessages] = useState([] as SocketMessage[]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth0();
  const messagesContainerRef = useRef(null);
  const { width, height } = useWindowSize();

  function sortMessagesByDateTime(messages: SocketMessage[]) {
    messages.forEach((message) => {
      const dateTimeString = `${message.createdDate} ${message.createdTime}`;
      message.createdDateTime = new Date(dateTimeString);
    });
    messages.sort((a: SocketMessage, b: SocketMessage) => {
      if (a?.createdDateTime && b?.createdDateTime) {
        return a.createdDateTime!.getTime() - b.createdDateTime!.getTime();
      } else {
        return 0;
      }
    });
    messages.forEach((message) => delete message.createdDateTime);
    return messages;
  }

  useEffect(() => {
    if (messagesContainerRef?.current) {
      messagesContainerRef.current["scrollTop"] =
        messagesContainerRef.current["scrollHeight"];
    }
  }, [messages.length]);

  useEffect(() => {
    const URI = `${SERVER_URL}/messages`;
    try {
      axios
        .get(URI, {
          headers: {
            "x-api-key": API_KEY,
          },
        })
        .then((response) => {
          const { data: fetchedMessages } = response;
          const sortedMessages = sortMessagesByDateTime(fetchedMessages);
          setMessages(sortedMessages);
          setLoading(false);
        });
    } catch (err) {
      console.error("unable to fetch messages");
    }
    socket.on("receive-message", (message: SocketMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("receive-message");
    };
  }, []);

  const mappedMessages = messages.map((message, index) => {
    const { content, user, createdDate, createdTime } = message;

    return (
      <Message
        key={index}
        content={content}
        user={user}
        flip={message.user.email !== currentUser?.email}
        createdDate={createdDate}
        createdTime={createdTime}
      />
    );
  });

  return (
    currentUser && (
      <Grid gridTemplateRows={"50px 75px 1fr 75px 50px"} w={width} h={height}>
        <GridItem bgColor={"#215C54"} />
        <GridItem
          bgColor={"#EBE5DE"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <LogoutButton />
        </GridItem>
        <GridItem
          overflowY={"auto"}
          bgColor={"#EBE5DE"}
          ref={messagesContainerRef}
        >
          {loading ? (
            <Center h={"100%"}>
              <Text>Loading...</Text>
            </Center>
          ) : (
            mappedMessages
          )}
        </GridItem>
        <GridItem bgColor={"#EBE5DE"} display={"flex"} alignItems={"flex-end"}>
          <MessageInput socket={socket} user={currentUser} />
        </GridItem>
        <GridItem bgColor={"#215C54"} />
      </Grid>
    )
  );
}
