/*  mygarden/:idgarden -> todas as plantas do jardim
botao de add plant/ botao de remover planta
botao de edit jardim => formulario de edicao + excluir jardim
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

function MyGarden() {
  const [oneGarden, setOneGarden] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

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
    } catch (error) {
      console.log(error);
    }
  }

  console.log(oneGarden);
  console.log(form);
  return (
    <div>
      <h1>Local: {oneGarden.local} </h1>
      <h2>nome do jardim: {oneGarden.name}</h2>
      <div>
        Card PLANTAS
        {!isLoading &&
          oneGarden.plants.map((plant) => {
            return (
              <div>
                <h1>{plant.popularName}</h1>
                <p>{plant.scientificName}</p>
                <p>{plant.origin}</p>
                <button onClick={() => handleDeletePlant(plant._id)}>
                  Deletar Planta
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Adicione uma planta</h1>

        <form onSubmit={handleSubmit}>
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
          <input name="origin" value={form.origin} onChange={handleChange} />

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

      <form onSubmit={handleSubmitGarden}>
        <label>Nome do Jardim:</label>
        <input
          name="name"
          value={formGarden.name}
          onChange={handleEdit}
        />
        <label>Local do Jardim:</label>
        <input
          name="local"
          value={formGarden.local}
          onChange={handleEdit}
        />
        <button type="submit">Editar Jardim</button>
      </form>

      <p>pra qual rota: /garden/edit/idGarden</p>
    </div>
  );
}

export default MyGarden;
