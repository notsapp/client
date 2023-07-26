import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button m={"10px"} w={"100px"} onClick={() => logout()}>
      Log Out
    </Button>
  );
}
