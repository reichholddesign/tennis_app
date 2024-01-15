import NavBarButtons from "./nav-bar-buttons";
import NavBarTabs  from "./nav-bar-tabs";


const NavBar = () =>{

  return (
    <>
        <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarButtons />
        <NavBarTabs />
      </nav>
    </div>
    </>
  )
}

export default NavBar