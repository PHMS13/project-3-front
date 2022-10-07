/* All users + search */

import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import imgPerfil from "../../assets/perfil.png";
import gardenersDeco from "../../assets/Perfis Transparente.png";

function Gardener() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/users/all");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  console.log(users);

  return (
    <>
      <div
className="divGardener"
      >
        <p className="profilesSub">
          Outros jardineiros já estão por aqui, vamos espiar a grama do vizinho?
          :)
        </p>

        <img src={gardenersDeco} alt="gardeners" className="gardenersImg" />
      </div>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "150px",
        }}
      >
        <Col
          className="col-10"
          style={{
            width: "60vw",
            minWidth:"300px",
            marginTop: "0px",
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
            placeholder="Procure um jardineiro"
          />
        </Col>
      </Row>
      {
        <Row className="d-flex justify-content-evenly mt-4">
          {users
            .filter((user) =>
              user.username.toLowerCase().includes(search.toLowerCase())
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
                    style={{ width: "180px", marginTop: "13px" }}
                  />
                  <Card.Body>
                    <p className="card-title profilesCardTitle">
                      <strong>{user.username}</strong>
                    </p>

                    <Card.Subtitle className="mb-2 text-muted">
                      <strong>Moradia:</strong> {user.residence}
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 text-muted">
                      <strong>Idade:</strong> {user.age} anos
                    </Card.Subtitle>
                  </Card.Body>

                  <Card.Footer className="bg-white">
                    <Link to={`/user-profile/${user._id}`}>
                      <Button
                        style={{
                          backgroundColor: "#7C6053",
                          borderColor: "#7C6053",
                          fontSize: "14px",
                        }}
                        variant="dark"
                      >
                        Perfil Completo
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              );
            })}
        </Row>
      }
    </>
  );
}

export default Gardener;
