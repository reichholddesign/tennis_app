import NavBarButtons from "./nav-bar-buttons";
import NavBarTabs from "./nav-bar-tabs";

import { useUserProfile } from "../../../contexts/ProfileContext";

const NavBar = () => {
  const userProfile = useUserProfile();
  console.log(userProfile);
  return (
    <>
      <div className="nav-bar__container">
        <nav className="nav-bar">
          <NavBarButtons />
          <NavBarTabs />
        </nav>
        <p>{useUserProfile.first_name}</p>
      </div>
    </>
  );
};

export default NavBar;
