import { useAuth0 } from "@auth0/auth0-react";
import { MenuItem } from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
};

export default LogoutButton;
