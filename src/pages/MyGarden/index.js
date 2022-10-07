/*  mygarden/:idgarden -> todas as plantas do jardim
botao de add plant/ botao de remover planta
botao de edit jardim => formulario de edicao + excluir jardim
*/
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function MyGarden() {
  const [oneGarden, setOneGarden] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { idGarden } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    popularName: "",
    scientificName: "",
    origin: "",
    luminosity: "", //TIPO NUMBER
    care: "", //TIPE NUMBER
    info: "",
  });

  const [formGarden, setFormGarden] = useState({
    name: oneGarden.name,
    local: oneGarden.local,
  });

  useEffect(() => {
    async function fetchmyGarden() {
      try {
        setIsLoading(true);
        const response = await api.get(`/garden/one-garden/${idGarden}`);
        setOneGarden(response.data);
        setFormGarden({
          name: response.data.name,
          local: response.data.local,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchmyGarden();
  }, [reload]);

  //fazer um map dessa array que voltou da api. oneGarden.plants.map()

  function handleChange(e) {
    if (e.target.name === "luminosity" || e.target.name === "care") {
      setForm({ ...form, [e.target.name]: +e.target.value });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post(`/plant/create/${idGarden}`, form);
      console.log(response);
      setReload(!reload);

      setForm({
        popularName: "",
        scientificName: "",
        origin: "",
        luminosity: "", //TIPO NUMBER
        care: "", //TIPE NUMBER
        info: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePlant(idPlant) {
    await api.delete(`/plant/delete/${idPlant}`);
    setReload(!reload);
  }

  async function handleEdit(e) {
    setFormGarden({ ...formGarden, [e.target.name]: e.target.value });
  }

  async function handleSubmitGarden(e) {
    e.preventDefault();

    try {
      await api.put(`/garden/edit/${idGarden}`, formGarden);
      setReload(!reload);
      setShowForm(!showForm);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleform() {
    setShowForm(!showForm);
  }

  async function handleDeleteGarden(e) {
    try {
      const response = await api.delete(`/garden/delete/${idGarden}`);

      setReload(!reload);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  console.log(oneGarden);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2
        className="AllSub"
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginTop: "30px",
          color: "#507849",
        }}
      >
        {oneGarden.name}
      </h2>

      <h4 className="myGardenTxt">{oneGarden.local}</h4>
      {loggedInUser.user._id == oneGarden.author && (
        <Button
          onClick={toggleform}
          type="submit"
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
            marginTop: "20px",
          }}
        >
          Editar Jardim
        </Button>
      )}

      {showForm && (
        <form onSubmit={handleSubmitGarden}>
          <label>Nome do Jardim:</label>
          <input name="name" value={formGarden.name} onChange={handleEdit} />
          <label>Local do Jardim:</label>
          <input name="local" value={formGarden.local} onChange={handleEdit} />

          <Button
            type="submit"
            className="btn btn-light btn-outline-dark btn-sm me-2"
            style={{
              backgroundColor: "#7C6053",
              color: "white",
              borderColor: "#7C6053",
              marginTop: "20px",
            }}
          >
            Salvar Alterações
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteGarden}
            style={{ fontSize: "14px", marginTop: "20px" }}
          >
            Deletar Jardim
          </Button>
        </form>
      )}
      <div>
        {!isLoading &&
          oneGarden.plants.map((plant) => {
            return (
              <div>
                <Card
                  key={plant._id}
                  style={{
                    width: "60vw",
                    margin: "20px",
                    alignItems: "center",
                    borderColor: "#E7E7E7 1.2px",
                    padding: "12px",
                    borderRadius: "12px",
                  }}
                >
                  <Card.Img variant="top" src={plant.plantImage} />
                  <Card.Body>
                    <Card.Title>{plant.popularName}</Card.Title>
                    <Card.Subtitle>{plant.scientificName}</Card.Subtitle>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <strong>Origem:</strong> {plant.origin}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Cuidado:</strong> {plant.care}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Luminosidade:</strong> {plant.luminosity}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body></Card.Body>
                </Card>

                {oneGarden.author == loggedInUser.user._id && (
                  <Button
                    onClick={() => handleDeletePlant(plant._id)}
                    variant="danger"
                    style={{ fontSize: "14px", marginBottom: "30px" }}
                  >
                    {" "}
                    Deletar Planta
                  </Button>
                )}
              </div>
            );
          })}
      </div>
      {/* mostrar os forms de editar jardim e adicionar plantas so pra quem é o dono do garden */}
      {oneGarden.author == loggedInUser.user._id && (
        <>
          <div>
            <form
              style={{
                display: "flex",
                width: "90vw",
                height: "380px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <h2
                className="AllSub"
                style={{ marginTop: "230px", width: "180px" }}
              >
                Adicione uma planta nova ao seu Jardim!
              </h2>

              <label className="myGardenAdd">Nome popular:</label>
              <input
                name="popularName"
                value={form.popularName}
                onChange={handleChange}
                id="inscreverInfo"
              />

              <label className="myGardenAdd">Nome científico:</label>
              <input
                name="scientificName"
                value={form.scientificName}
                onChange={handleChange}
                id="inscreverInfo"
              />

              <label className="myGardenAdd">Origem:</label>
              <input
                name="origin"
                value={form.origin}
                onChange={handleChange}
                id="inscreverInfo"
              />

              <label className="myGardenAdd">Nível de Cuidado:</label>
              <select
                required
                id="formSelect"
                name="care"
                onChange={handleChange}
                defaultValue={formGarden.care}
              >
                <option value=""></option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <label className="myGardenAdd">Nível de Luminosidade:</label>
              <select
                required
                id="formSelect"
                name="luminosity"
                onChange={handleChange}
                defaultValue={formGarden.luminosity}
              >
                <option value=""></option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <label className="myGardenAdd">Informações:</label>
              <input
                name="info"
                value={form.info}
                onChange={handleChange}
                style={{ marginBottom: "30px" }}
                id="inscreverInfo"
              />

              <Button
                type="submit"
                className="btn btn-light btn-outline-dark btn-sm me-2"
                style={{
                  backgroundColor: "#7C6053",
                  color: "white",
                  borderColor: "#7C6053",
                  padding: "10px",
                }}
              >
                Adicionar uma planta
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default MyGarden;
