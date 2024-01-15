import  NavBar  from "./navigation/desktop/nav-bar";

 const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <div className="page-layout__content">{children}</div>
    </div>
  );
};

export default PageLayout