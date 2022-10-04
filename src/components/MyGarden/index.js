import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function MyGarden({ user, id, reload, setReload, isLoading }) {
  async function handleDeletePlant(e, index) {
    e.preventDefault();

    const clone = { ...user };
    delete clone._id;

    clone.garden.splice(index, 1);

    await axios.put(
      `https://ironrest.herokuapp.com/jungle-wd-85-profile/${id}`,
      clone
    );

    setReload(!reload);

    //fazer o SPLICE

    //.slice(0, 60)
  }

  return (
    <div>
      {!isLoading && (
        <div>
          {user.garden.map((plant, index) => {
            return (
              <div
                key={plant._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Card
                  style={{
                    width: "55vw",
                    margin: "20px",
                    marginTop: "30px",
                    alignItems: "center",
                    borderColor: "#E7E7E7 1.5px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={plant.Imagens}
                    style={{ width: "17,5rem" }}
                  />
                  <Card.Title
                    style={{ marginTop: "10px", marginBottom: "0px" }}
                  >
                    {plant.nomePopular}
                  </Card.Title>

                  <Card.Body>
                    <Card.Subtitle>{plant.nomeCientifico}</Card.Subtitle>

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
                      <ListGroup.Item style={{ textAlign: "justify" }}>
                        {plant.info}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    <button
                      className="retirarJar"
                      onClick={(e) => handleDeletePlant(e, index)}
                    >
                      Retirar do meu Jardim
                    </button>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </div>
      )}
      ;
    </div>
  );
}

export default MyGarden;
