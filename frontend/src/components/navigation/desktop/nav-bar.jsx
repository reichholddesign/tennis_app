import NavBarButtons from "./nav-bar-buttons";
import NavBarTabs from "./nav-bar-tabs";
import Profile from "../../profile";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="nav-bar__container"
      >
        <nav className="nav-bar">
          <NavBarButtons />
          <NavBarTabs />
        </nav>
        {isAuthenticated && <Profile />}
      </div>
    </>
  );
};

export default NavBar;
