import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import imgAllPlants from "../../assets/06 - Plantas.png";

import CardAllPlants from "../../components/CardAllPlants";

function AllPlants({ user, id }) {
  const [allPlants, setAllPlants] = useState([{ nomePopular: "" }]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [plantsFilter, setPlantsFilter] = useState([{ nomePopular: "" }]);

  async function handleAddGarden(e, plant) {
    e.preventDefault();
    const clone = { ...user };
    console.log(clone);
    clone.garden.push(plant); //planta adicionada na array de garden
    delete clone._id;

    await axios.put(
      `https://ironrest.herokuapp.com/jungle-wd-85-profile/${id}`,
      clone
    );

    //enviar o clone para a API. como PUT
    //setReload(!reload)
  }

  useEffect(() => {
    async function fetchPlants() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/jungle-wd-85`
        );

        setAllPlants(response.data);
        setPlantsFilter(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlants();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);

    const plantsFiltered = allPlants.filter((plant) => {
      return plant.nomePopular
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    setPlantsFilter(plantsFiltered);
  }

  console.log(user);
  return (
    <>
      {!isLoading && (
        <div>
          <div>
            <div
              class=""
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: "30px",
              }}
            >
              <h1 className="SubAll">Todas as Plantas</h1>
              <img src={imgAllPlants} alt="planta" className="imgAllPlants" />
            </div>

            <Col
              className="align-items-center"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "16px",
              }}
            >
              <Form.Control
                style={{ width: "90vw", height: "46px", borderRadius: "12px" }}
                value={search}
                onChange={handleSearch}
                placeholder="Encontre a sua planta"
              />
            </Col>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "#D1B3AE",
            }}
          >
            {plantsFilter.map((plant) => {
              return (
                <CardAllPlants
                  className="cardAll"
                  plant={plant}
                  handleAddGarden={handleAddGarden}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AllPlants;