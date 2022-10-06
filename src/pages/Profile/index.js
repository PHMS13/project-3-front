import { useEffect, useState } from "react";

import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { getDefaultNormalizer } from "@testing-library/react";
import EditUser from "../../components/EditUser";
import MyGarden from "../../components/MyGarden";

import profileImage from "../../assets/05 - Imagem.png";
import Quiz from "../Quiz";
import AllPlants from "../Allplants";

import { Button, Accordion } from "react-bootstrap";

function Profile() {
  //const decoratedOnClick = useAccordionButton(eventKey, onClick);

  const [user, setUser] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);

  const [img, setImg] = useState("");
  const [reload, setReload] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const [formGarden, setFormGarden] = useState({
    name: "",
    local: "",
  });

  function handleChange(e) {
    setFormGarden({ ...formGarden, [e.target.name]: e.target.value });
  }

  console.log(formGarden);

  //states das perguntas
  const [luminosidade, setLuminosidade] = useState(0);
  const [cuidado, setCuidado] = useState(0);

  const [form, setForm] = useState({
    profileImage: "",
    username: "",
    age: "",
    country: "",
    city: "",
    residence: "",
    garden: [],
  });

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/profile");
        setUser(response.data);

        setForm(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [reload]);

  /*   function handleAccordion() {
    console.log("dentro da funcao");
    setReload(!reload);
  } */
  console.log(user);

  function handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }
  console.log(user);

  async function handleSubmitGarden(e) {
    e.preventDefault();
    try {
      const response = await api.post(`/garden/create`, formGarden);

      setReload(!reload);
      setFormGarden({
        name: "",
        local: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="AllSub">Meu Perfil</h1>
        <img src={profileImage} alt="plantinha" className="profileImg" />
      </div>
      <div className="barraSup">
        <span className="username">{user.username}</span>
        <span>
          <strong>Ambiente:</strong> {user.residence} |
        </span>
        <span style={{ marginRight: "12px" }}>{user.age} anos</span>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}
        >
          Editar Perfil
        </Button>

        <Button
          onClick={handleLogOut}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}> Sair </Button>
     </div>

      {showForm === true && (
        <EditUser
          form={form}
          id={user._id}
          setShowForm={setShowForm}
          setForm={setForm}
          reload={reload}
          setReload={setReload}
          showForm={showForm}
        />
      )}

      <div className="mt-3">
        <Accordion>
          {!isLoading && (
            <>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Quiz de Plantas</Accordion.Header>
                <Accordion.Body>
                  <Quiz
                    luminosidade={luminosidade}
                    cuidado={cuidado}
                    setCuidado={setCuidado}
                    setLuminosidade={setLuminosidade}
                    id={user._id}
                    user={user}
                    reload={reload}
                    setReload={setReload}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
        </Accordion>
        <div style={{display: "flex", flexDirection: "column",
    alignItems: "stretch",
    flexWrap: "nowrap"}}>
          <div>
            <h2 className="AllSub">Crie um Jardim</h2>
            <form onSubmit={handleSubmitGarden}>
              <label>Nome do jardim</label>
              <input
                name="name"
                value={formGarden.name}
                onChange={handleChange}
              />

              <label>Local do Jardim</label>
              <input
                name="local"
                value={formGarden.local}
                onChange={handleChange}
              />
               <Button
             type="submit"
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}> Salvar Jardim </Button>
             
            </form>
          </div>

          <h1 className="AllSub">Meus Jardins</h1>
          {!isLoading &&
            user.garden.map((garden) => {
              const date = new Date(garden.createdAt);

              const dd = date.getDate();
              const mm = date.getMonth() + 1; //janeiro = 0, então precisamos adicionar +1. Isso é só com o mês mesmo.
              const aa = date.getFullYear();

              const hh = date.getHours();
              const min = date.getMinutes();
              console.log(garden);
              return (
                <div>
                  <p>
                    nome: {garden.name} - local: {garden.local}- postado em:{" "}
                    {dd}/{mm}/{aa} - {hh}:{min}{" "}
                  </p>
                  <Link to={`/mygarden/${garden._id}`}>Vá para o jardim</Link>
                  {garden.comments.length > 0 && <h2>Comentários:</h2>}
                  {garden.comments.map((comments) => {
                    return comments;
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Profile;

//info user -> /users/profile+edit+delete
/* Criar jardim -> /gardens/create
meus jardins (card)
quiz
*/

/* <Accordion.Item eventKey="0">
<Accordion.Header onClick={handleAccordion}>
  Meu Jardim
</Accordion.Header>
<Accordion.Body>
  <MyGarden
    user={user}
    id={user._id}
    showForm={showForm}
    setShowForm={setShowForm}
    reload={reload}
    setReload={setReload}
    isLoading={isLoading}
  />
</Accordion.Body>
</Accordion.Item> 

              <Accordion.Item eventKey="1">
                <Accordion.Header>Todas as Plantas</Accordion.Header>
                <Accordion.Body>
                  <AllPlants
                    id={user._id}
                    user={user}
                    reload={reload}
                    setReload={setReload}
                    showForm={showForm}
                    setShowForm={setShowForm}
                  />
                </Accordion.Body>
              </Accordion.Item>
            */
