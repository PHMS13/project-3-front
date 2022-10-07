import logo from "../../assets/Logo.png";
import hamburguinho from "../../assets/Hamburguinho.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <div>
      <nav className="navbar shadow-md rounded-bottom" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          flexDirection: "column"
      }}>

      <div
        style={{
          width: "80vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          flexDirection: "row",
          marginTop: "18px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
      <Link to="/" style={{display:"flex", alignItems:"flex-start"}}>
        <img src={logo} alt="logo" style={{ width: "70%", maxWidth:"300px", minWidth: "50px", marginTop:"0px"}}/>
      </Link>

        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <img src={hamburguinho} alt="hamburguinho" style={{ width: "100%", marginTop:"0px" }} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown">
      <Link to="/">
        <Dropdown.Item href="#/action-1" className="navSub" >Início</Dropdown.Item>
      </Link>

      <Link to="/profile">
        <Dropdown.Item href="#/action-2" className="navSub" >Meu perfil</Dropdown.Item>
      </Link>
      <Link to="/gardener">
        <Dropdown.Item href="#/action-4" className="navSub" >Outros jardineiros</Dropdown.Item>
      </Link>
      <Link to="/allplants">
        <Dropdown.Item href="#/action-5" className="navSub" >Todas as plantas</Dropdown.Item>
      </Link>
      <Link to="/about">
        <Dropdown.Item href="#/action-6" className="navSub" >Sobre nós</Dropdown.Item>
      </Link>
     
      </Dropdown.Menu>
    </Dropdown>
    
      </div>
      </nav>
    </div>
  );
}

export default NavBar;
