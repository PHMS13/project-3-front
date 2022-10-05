import logo from "../../assets/Logo.png";
import hamburguinho from "../../assets/Hamburguinho.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <div>
      <nav className="navbar shadow-md rounded-bottom">

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
      <Link to="/" style={{marginLeft:"0px", width:"48%"}}>
        <img src={logo} alt="logo" style={{ width: "100%", maxWidth:"300px", minWidth:"160px", marginTop:"0px" }}/>
      </Link>

        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <img src={hamburguinho} alt="hamburguinho" style={{ width: "100%", marginTop:"0px" }} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown">
      <Link to="/">
        <Dropdown.Item href="#/action-1">Início</Dropdown.Item>
      </Link>

      <Link to="/profile">
        <Dropdown.Item href="#/action-2">Meu perfil</Dropdown.Item>
      </Link>
      <Link to="/gardener">
        <Dropdown.Item href="#/action-4">Outros jardineiros</Dropdown.Item>
      </Link>
      <Link to="/allplants">
        <Dropdown.Item href="#/action-5">Todas as plantas</Dropdown.Item>
      </Link>
      <Link to="/about">
        <Dropdown.Item href="#/action-6">Sobre nós</Dropdown.Item>
      </Link>
      <Link to="/profile">
        <Dropdown.Item href="#/action-5">Meu perfil</Dropdown.Item>
      </Link>
      
      </Dropdown.Menu>
    </Dropdown>
    
      </div>

      
      </nav>
    </div>
  );
}

export default NavBar;
