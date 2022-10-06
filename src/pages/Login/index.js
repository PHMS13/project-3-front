import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import loginImg from '../../assets/08 - Criadores.png'

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center",marginTop:"30px", backgroundColor:"#f6ebeb"}}>
    <h1 className="loginTitle">Faça seu Login</h1>
    <div style={{width:"80vw", maxWidth:"700px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around", borderRadius:"16px", padding:"30px"}}>
    <img src={loginImg} className="loginImg" alt="loginImg" /> 
    <form className="loginForm" onSubmit={handleSumit}>
      <label className="loginLabel">Email:</label>
      <input
      className="loginInput"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <label className="loginLabel">Senha:</label>
      <input
      className="loginInput"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <button className="loginBtn" type="submit">Entrar!</button>
    </form>
    </div>
  </div>
  );
}

export default Login