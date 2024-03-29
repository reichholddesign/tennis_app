import { useAuth0 } from "@auth0/auth0-react";
import NavBarTab from "./nav-bar-tab";

const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/public" label="Public" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/profile" label="Profile" />
          <NavBarTab path="/activity" label="Activity" />
          <NavBarTab path="/players" label="Players" />
          <NavBarTab path="/protected" label="Protected" />
          <NavBarTab path="/admin" label="Admin" />
        </>
      )}
    </div>
  );
};

export default NavBarTabs;
