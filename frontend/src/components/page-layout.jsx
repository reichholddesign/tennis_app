import NavBar from "./navigation/desktop/nav-bar";
import { UserProfileProvider } from "../contexts/ProfileContext";

const PageLayout = ({ children }) => {
  return (
    <UserProfileProvider>
      <div className="page-layout">
        <NavBar />
        <div className="page-layout__content">{children}</div>
      </div>
    </UserProfileProvider>
  );
};

export default PageLayout;
