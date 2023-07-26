import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SenderProps } from "./Message";

export type UserModalProps = SenderProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function UserModal({ user, isOpen, setIsOpen }: UserModalProps) {
  const { onClose } = useDisclosure();

  return (
    user && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(15deg)" />
        <ModalContent w={"75%"} display={"flex"} alignSelf={"center"}>
          <ModalHeader>User details</ModalHeader>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
          <ModalBody alignItems={"center"}>
            <Flex
              flexDir={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={5}
              p={"20px"}
            >
              <Heading fontSize={"20px"}>{user.nickname}</Heading>
              <Image borderRadius={"5px"} src={user.picture} />
              <Text>{user.email}</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}
