/* All users + search */

import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import imgPerfil from '../../assets/perfil.png'

function Gardener() {
    const [user, setUser] = useState([]);

    const [search, setSearch] = useState("");
  
    useEffect(() => {
      async function fetchPlanta() {
        try {
          const response = await axios.get(
            "https://ironrest.herokuapp.com/jungle-wd-85-profile"
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchPlanta();
    }, []);
  
    function handleSearch(e) {
      setSearch(e.target.value);
    }
  
    return (
      <>
        <div className="profilesPageMain">
          <p className="profilesSub">Outros jardineiros já estão por aqui, 
          vamos espiar a grama do vizinho? :)</p>
  
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "280px"
            }}
          >
            <Col
              className="col-10"
              style={{
                width: "90%",
                marginTop: "20px",
              }}
            >
              <Form.Control
                style={{
                  borderRadius: "14px",
                  paddingLeft: "20px",
                  color: "#E3E3E3",
                }}
                value={search}
                onChange={handleSearch}
                placeholder="Procure um amigo jardineiro"
              />
            </Col>
            <Link to="/create-profile">
              <button className="profilesCrie">Crie seu perfil</button>
            </Link>
          </Row>
  
          {
            <Row className="d-flex justify-content-evenly mt-4">
              {user
                .filter((user) =>
                  user.nome.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => {
                  return (
                    <Card
                      key={user._id}
                      style={{
                        width: "14rem",
                        margin: "20px",
                        alignItems: "center",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={imgPerfil}
                        style={{width:"180px", marginTop:"13px"}}
                      />
                      <Card.Body>
                        <p className="card-title profilesCardTitle">
                        <strong>{user.nome}</strong>
                        </p>
  
                        <Card.Subtitle className="mb-2 text-muted">
                          <strong>Moradia:</strong> {user.moradia}
                        </Card.Subtitle>
  
                        <Card.Subtitle className="mb-2 text-muted">
                          <strong>Idade:</strong> {user.idade} anos
                        </Card.Subtitle>
                      </Card.Body>
  
                      <Card.Footer className="bg-white">
  
                        <Link to={`/user-profile/${user._id}`}>
                          <Button style={{backgroundColor: "#7C6053", borderColor: "#7C6053", fontSize:"14px"}} variant="dark">Perfil Completo</Button>
                        </Link>
  
                      </Card.Footer>
                    </Card>
                  );
                })}
            </Row>
          }
        </div>
      </>
    );
}

export default Gardener;