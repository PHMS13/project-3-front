import { useEffect, useState, useParams } from "react";

import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import EditUser from "../../components/EditUser";
import Card from "react-bootstrap/Card";

import profileImage from "../../assets/05 - Imagem.png";


function UserProfile() {
  //const decoratedOnClick = useAccordionButton(eventKey, onClick);

  const [user, setUser] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useParams();

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
        const response = await api.get(`/users/user/${idUser}`);
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
  console.log(isLoading);

  return (
    <div style={{ backgroundColor: "#EDDDD6" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="AllSub">Perfil do Jardineiro</h1>

        <img src={profileImage} alt="plantinha" className="profileImg" />
      </div>

      <div className="barraSup">
        <span className="username">{user.username}</span>
        <span>
          <strong>Ambiente:</strong> {user.residence} |
        </span>
        <span style={{ marginRight: "12px" }}>{user.age} anos</span>

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
       
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >
        <h1 className="AllSub" style={{color:"#507849"}} >Meus Jardins</h1>
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
                <Card style={{ width: "18rem", marginTop: "16px" }}>
                  <Card.Body>
                    <Card.Title>
                      <p className="profileCardTitle">
                        <strong>{garden.name}</strong>
                      </p>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p className="profileCardSub">
                        <strong>local:</strong> {garden.local}
                      </p>
                    </Card.Subtitle>
                    <Card.Text>
                      <p className="profileCardText">
                        <strong>postado em:</strong> {dd}/{mm}/{aa} - {hh}:{min}{" "}
                      </p>
                    </Card.Text>
                    <Card.Link>
                      <Link
                        to={`/mygarden/${garden._id}`}
                        className="profileCardLink"
                      >
                        Explore estes jardins
                      </Link>
                    </Card.Link>
                    {garden.comments.length > 0 && <h2>Comentários:</h2>}
                    {garden.comments.map((comments) => {
                      return <p>{comments.content}</p>;
                    })}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserProfile;