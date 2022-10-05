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
  const navigate = useNavigate();
  const [form, setForm] = {
    popularName: "",
  };

  //pegar o ID DO GARDEN da url. http://localhost:4000/my-garden/:idGarden  ==>> useParams
  const { idGarden } = useParams();
  console.log(idGarden);
  //useEffect pra pegar O JARDIM com o id do jardim que veio da url
  //qual rota: /garden/one-garden/:idGarden

  useEffect(() => {
    async function fetchmyGarden() {
      try {
        setIsLoading(true);
        const response = await api.get(`/garden/one-garden/${idGarden}`);
        setOneGarden({ ...response.data });
        //navigate("/my-garden");

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchmyGarden();
  }, []);

  //fazer um map dessa array que voltou da api.
  console.log(form);

  function handleChange(e) {

  }

  async function handleSubmit(e) {

  }
  return (
    <div>
      <p>Aqui vc vai dar um map em todas as plantas do meu jardim</p>
      {!isLoading &&
        oneGarden.plants.map((plant) => {
          return (
            <div>
              {" "}
              card da planta
              <p>nome da planta</p>
              <p>nome cientifico</p>
              <p>care</p>
            </div>
          );
        })}

      <h1>Local: {oneGarden.local}</h1>

      <div>
        <h1>form de adicao de planta</h1>
        <p>pra qual rota: /plant/create</p>

        <form onSubmit={handleSubmit}>
          <input
            name="popularName"
            value={form.popularName}
            onChange={handleChange}
          />
        </form>
        <button type="submit">Adicionar uma planta</button>
      </div>

      <button>Editar Jardim</button>
      <p>form de edicao de jardim</p>
      <p>pra qual rota: /garden/edit/idGarden</p>
    </div>
  );
}

export default MyGarden;
