import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button
      as={"a"}
      fontSize={"sm"}
      fontWeight={400}
      variant={"link"}
      onClick={handleLogin}
      _hover={{
        cursor: "pointer",
      }}
    >
      Sign in
    </Button>
  );
};

export default LoginButton;
