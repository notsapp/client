import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { isMobile } from "react-device-detect";
import { Flex, Text } from "@chakra-ui/react";
import { useWindowSize } from "./hooks/hooks";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />} />)
);

const UnauthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Authentication />} />)
);

function Unavailable() {
  const { width, height } = useWindowSize();

  return (
    <Flex
      w={width}
      h={height}
      overflowWrap={"anywhere"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      bgColor={"#E0F6CA"}
    >
      <Text color={"#215C54"}>
        This web application is only available on mobile devices.
      </Text>
    </Flex>
  );
}

function App() {
  const { isAuthenticated } = useAuth0();

  return !isMobile ? (
    <Unavailable />
  ) : isAuthenticated ? (
    <RouterProvider router={AuthenticatedRouter} />
  ) : (
    <RouterProvider router={UnauthenticatedRouter} />
  );
}

export default App;
