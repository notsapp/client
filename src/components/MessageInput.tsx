import { User } from "@auth0/auth0-react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Socket } from "socket.io-client";

export type MessageInputProps = {
  socket: Socket;
  user: User;
};

export default function MessageInput({ socket, user }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const onSendMessage = async () => {
    const date = new Date();
    const createdDate = date.toLocaleDateString();
    const createdTime = date.toLocaleTimeString();

    if (message && message !== "") {
      socket.emit("send-message", {
        content: message,
        user,
        createdDate,
        createdTime
      });
      setMessage("");
    }
  };

  return (
    <Flex m={"10px"} w={"100%"} justifyContent={"space-around"}>
      <Input
        bgColor={"#FFFFFF"}
        w={"70%"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSendMessage();
          }
        }}
      />
      <Button bgColor={"#FFFFFF"} w={"20%"} onClick={() => onSendMessage()}>
        Send
      </Button>
    </Flex>
  );
}
