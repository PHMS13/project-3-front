/*  mygarden/:idgarden -> todas as plantas do jardim
botao de add plant/ botao de remover planta
botao de edit jardim => formulario de edicao + excluir jardim
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { Button } from "react-bootstrap";

function MyGarden() {
  const [oneGarden, setOneGarden] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [showForm, setShowForm] = useState(false);


  const { idGarden } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    popularName: "",
    scientificName: "",
    origin: "",
    luminosity: "", //TIPO NUMBER
    care: "", //TIPE NUMBER
    info: "",
  });

  useEffect(() => {
    async function fetchmyGarden() {
      try {
        setIsLoading(true);
        const response = await api.get(`/garden/one-garden/${idGarden}`);
        setOneGarden(response.data);

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

  return (
    <div>
      <h1>Local: {oneGarden.local} </h1>
      <h2>nome do jardim: {oneGarden.name}</h2>

      <div>
        {!isLoading &&
          oneGarden.plants.map((plant) => {
            return (
              <div>
                {" "}
                CARDS DAS PLANTAS
                <h1>{plant.popularName}</h1>
                
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="btn btn-light btn-outline-dark btn-sm me-2"
                  style={{
                    backgroundColor: "#7C6053",
                    color: "white",
                    borderColor: "#7C6053",
                  }}
                >
                  Editar Planta
                </Button>
              </div>
            );
          })}
      </div>

      <div>
        <h1>adicione uma planta</h1>
        <p>pra qual rota: /plant/create</p>

        <form onSubmit={handleSubmit}>
          <label>Nome popular</label>
          <input
            name="popularName"
            value={form.popularName}
            onChange={handleChange}
          />

          <label>scientificName</label>
          <input
            name="scientificName"
            value={form.scientificName}
            onChange={handleChange}
          />

          <label>origin</label>
          <input name="origin" value={form.origin} onChange={handleChange} />

          <label>care</label>
          <input name="care" value={form.care} onChange={handleChange} />

          <label>luminosity</label>
          <input
            name="luminosity"
            value={form.luminosity}
            onChange={handleChange}
          />

          <label>info</label>
          <input name="info" value={form.info} onChange={handleChange} />
          <button type="submit">Adicionar uma planta</button>
        </form>
      </div>

      <button>Editar Jardim</button>
      <p>form de edicao de jardim</p>
      <p>pra qual rota: /garden/edit/idGarden</p>
    </div>
  );
}

export default MyGarden;
