import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button
      as={"a"}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      onClick={handleSignUp}
      _hover={{
        bg: "pink.300",
        cursor: "pointer",
      }}
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;
