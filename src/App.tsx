import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import { useEffect } from "react";

const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />} />)
);

const UnauthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Authentication />} />)
);

function App() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    screen.orientation.lock("portrait-primary");
  }, []);

  return isAuthenticated ? (
    <RouterProvider router={AuthenticatedRouter} />
  ) : (
    <RouterProvider router={UnauthenticatedRouter} />
  );
}

export default App;
