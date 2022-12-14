import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { Button } from "react-bootstrap";

function CardAllPlants({ plant, handleAddGarden }) {
  const [showDetail, setShowDetail] = useState(false);

  return (


    <Card
      key={plant._id}
      style={{
        width: "60vw",
        margin: "20px",
        alignItems: "center",
        borderColor: "#E7E7E7 1.2px",
        padding: "12px",
        borderRadius:"12px"
      }}>
      <Card.Img
        variant="top"
        src={plant.Imagens}
        style={{ width: "17,5rem" }}
      />
      <Card.Title>{plant.nomePopular}</Card.Title>

      <Card.Body>
        <Card.Subtitle>{plant.nomeCientifico}</Card.Subtitle>

        <ListGroup className="list-group-flush">
          <ListGroup.Item><strong>Origem:</strong>  {plant.origem}</ListGroup.Item>
          <ListGroup.Item><strong>Cuidado:</strong> {plant.cuidado}</ListGroup.Item>
          <ListGroup.Item><strong>Luminosidade:</strong> {plant.luminosidade}</ListGroup.Item>

          {showDetail ? (
            <ListGroup.Item>
              {plant.info}{" "}
              <button className="btnCardAll" onClick={() => setShowDetail(!showDetail)}>
                Esconder
              </button>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item>
              {plant.info.slice(0, 70)}
              <button className="btnCardAll" onClick={() => setShowDetail(!showDetail)}>
                Leia mais
              </button>
            </ListGroup.Item>
          )}

          {window.location.pathname !== "/allplants" && (
            
          <Button
           onClick={(e) => handleAddGarden(e, plant)} className="btnCardAll btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}
        >
        Adicionar no "meu Jardim"
        </Button>

          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default CardAllPlants;
