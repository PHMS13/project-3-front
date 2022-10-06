/*  mygarden/:idgarden -> todas as plantas do jardim
botao de add plant/ botao de remover planta
botao de edit jardim => formulario de edicao + excluir jardim
*/

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

  console.log(oneGarden);
  console.log(form);
  return (
    <div>
      <h2>Nome do Jardim: {oneGarden.name}</h2>
      <h3>Local: {oneGarden.local} </h3>
      {showForm && (
        <form onSubmit={handleSubmitGarden}>
          <label>Nome do Jardim:</label>
          <input name="name" value={formGarden.name} onChange={handleEdit} />
          <label>Local do Jardim:</label>
          <input name="local" value={formGarden.local} onChange={handleEdit} />
          <button type="submit">Salvar Alterações</button>
        </form>
      )}
      <button onClick={toggleform} type="submit">
        Editar Jardim
      </button>
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
                        <Card.Subtitle>{plant.nomeCientifico}</Card.Subtitle>
                      </Card.Body>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          <strong>Origem:</strong> {plant.origem}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Cuidado:</strong> {plant.cuidado}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Luminosidade:</strong> {plant.luminosidade}
                        </ListGroup.Item>
            
                      </ListGroup>
                      <Card.Body>
                       
                      </Card.Body>
                    </Card>
                
                {oneGarden.author === loggedInUser.user._id && (
                  <button onClick={() => handleDeletePlant(plant._id)}>
                    Deletar Planta
                  </button>
                )}
              </div>
            );
          })}
      </div>

      {/* mostrar os forms de editar jardim e adicionar plantas so pra quem é o dono do garden */}


      {oneGarden.author === loggedInUser.user._id && (
        <>
          <div style={{ display: "flex", width: "90vw",
    height: "380px", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            
            <form onSubmit={handleSubmit}>
              <h2>Adicione uma planta</h2>
              <label>Nome popular</label>
              <input
                name="popularName"
                value={form.popularName}
                onChange={handleChange}
              />

              <label>Nome Científico</label>
              <input
                name="scientificName"
                value={form.scientificName}
                onChange={handleChange}
              />

              <label>Origem</label>
              <input
                name="origin"
                value={form.origin}
                onChange={handleChange}
                min={1}
                max={5}
              />

              <label>Nível de Cuidado</label>
              <input
                type="number"
                min={1}
                max={5}
                name="care"
                value={form.care}
                onChange={handleChange}
              />

              <label>Nível de Luminosidade</label>
              <input
                type="number"
                min={1}
                max={5}
                name="luminosity"
                value={form.luminosity}
                onChange={handleChange}
              />

              <label>Informações</label>
              <input name="info" value={form.info} onChange={handleChange} />
              <button type="submit">Adicionar uma planta</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default MyGarden;
