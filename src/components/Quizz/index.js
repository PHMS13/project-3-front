// QUIZZ - 5 PERGUNTAS COM OPCOES DE RESPOSTAS DE 1 À 5 PARA MOSTRAR AS PLANTAS QUE SE ENCAIXAM MELHOR COM O USUARIO
import { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

function Quizz({ id, user }) {
  const [resultQuizz, setResultQuizz] = useState([]);

  const allquestions = [
    {
      pergunta: "Você possui plantas em casa?",
      min: "Nenhuma",
      max: "Algumas",
      res: "",
    },
    {
      pergunta: "Você cuida das suas plantas?",
      min: "Quase nunca",
      max: "Frequentemente",
      res: "",
    },
    {
      pergunta: "Com que frequência você rega as suas plantas?",
      min: "Pouca",
      max: "Muita",
      res: "",
    },
    {
      pergunta: "Normalmente, como é o clima do ambiente?",
      min: "Frio",
      max: "Quente",
      res: "",
    },
    {
      pergunta: "O quanto a sua casa é arejada?",
      min: "Pouco",
      max: "Muito",
      res: "",
    },
    {
      pergunta:
        "De 0 a 5, qual nota você dá para a luminosidade tem na sua casa?",
      min: "0",
      max: "5",
      res: "",
    },
  ];

  function handleRange(e, index) {
    console.log(e.target.value);
    console.log(index);

    allquestions[index].res = e.target.value;
  }

  async function handleSubmitQuiz() {
    // pegar os valores das res, fazer a média

    const avgCare = Math.round(
      (+allquestions[0].res + +allquestions[1].res + +allquestions[2].res) / 3
    );

    const avgLum = Math.round(
      (+allquestions[3].res + +allquestions[4].res + +allquestions[5].res) / 3
    );

    const allPlants = await axios.get(
      `https://ironrest.herokuapp.com/jungle-wd-85`
    );

    const filteredArray = allPlants.data.filter((plant) => {
      console.log(plant.luminosidade <= avgLum);
      console.log(plant.cuidado <= avgCare);
      return plant.luminosidade <= avgLum && plant.cuidado <= avgCare;
    });

    setResultQuizz(filteredArray);
  }

  async function handleAddGarden(e, plant) {
    e.preventDefault();
    const clone = { ...user };
    clone.garden.push(plant); //planta adicionada na array de garden
    delete clone._id;

    await axios.put(
      `https://ironrest.herokuapp.com/jungle-wd-85-profile/${id}`,
      clone
    );

    //enviar o clone para a API. como PUT
  }

  return (
    <div>
      {allquestions.map((element, index) => {
        return (
          <div key={element.pergunta} style={{ marginBottom: "30px" }}>
            <p className="quizPergunta">
              <strong>{element.pergunta}</strong>
            </p>
            <span className="quizElemento">{element.min} </span>{" "}
            <input
              type="range"
              onChange={(e) => handleRange(e, index)}
              min={1}
              max={5}
              step={1}
              defaultValue={1}
              variant="dark"
            />
            <span className="quizElemento"> {element.max}</span>
          </div>
        );
      })}
      <button className="finalizarQuiz" onClick={handleSubmitQuiz}>
        Finalizar quiz
      </button>

      {resultQuizz.map((plant, index) => {
        return (
          <div key={plant.nomePopular}>
            <Card
              style={{
                width: "18rem",
                margin: "20px",
                alignItems: "center",
                border: "solid black 2px",
              }}
            >
              <Card.Img
                variant="top"
                src={plant.Imagens}
                style={{ width: "17,5rem" }}
              />
              <Card.Title>{plant.nomePopular}</Card.Title>

              <Card.Body>
                <Card.Subtitle>{plant.nomeCientifico}</Card.Subtitle>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item> Origem: {plant.origem}</ListGroup.Item>
                  <ListGroup.Item> Cuidado: {plant.cuidado}</ListGroup.Item>
                  <ListGroup.Item>
                    Luminosidade: {plant.luminosidade}
                  </ListGroup.Item>

                  <ListGroup.Item>{plant.info.slice(0, 60)}</ListGroup.Item>
                  <button onClick={(e) => handleAddGarden(e, plant)}>
                    Adicionar ao meu Jardim
                  </button>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Quizz;
