import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export type LoginButtonProps = {
  setLoading: (loading: boolean) => void;
};

export default function LoginButton({ setLoading }: LoginButtonProps) {
  const { loginWithRedirect } = useAuth0();

  const onClick = async () => {
    setLoading(true);
    await loginWithRedirect();
  };

  return (
    <Button color={"#215C54"} m={"10px"} w={"100px"} onClick={onClick}>
      Log In
    </Button>
  );
}
