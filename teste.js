function teste() {
  return (
    <>
      <div style={{ backgroundColor: "#EDDDD6" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 className="AllSub">Meu Perfil</h1>

          <img src={profileImage} alt="plantinha" className="profileImg" />
        </div>

        <div className="barraSup">
          <span className="username">{user.username}</span>
          <span>
            <strong>Ambiente:</strong> {user.residence} |
          </span>
          <span style={{ marginRight: "12px" }}>{user.age} anos</span>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-light btn-outline-dark btn-sm me-2"
            style={{
              backgroundColor: "#7C6053",
              color: "white",
              borderColor: "#7C6053",
              margin: "10px",
            }}
          >
            Editar Perfil
          </Button>
          <button
            onClick={handleLogOut}
            className="btn btn-light btn-outline-dark btn-sm me-2"
            style={{
              backgroundColor: "#7C6053",
              color: "white",
              borderColor: "#7C6053",
              margin: "10px",
            }}
          >
            Sair
          </button>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}
        >
          Editar Perfil
        </Button>

        <Button
          onClick={handleLogOut}
          className="btn btn-light btn-outline-dark btn-sm me-2"
          style={{
            backgroundColor: "#7C6053",
            color: "white",
            borderColor: "#7C6053",
          }}
        >
          Sair
        </Button>

        {showForm === true && (
          <EditUser
            form={form}
            id={user._id}
            setShowForm={setShowForm}
            setForm={setForm}
            reload={reload}
            setReload={setReload}
            showForm={showForm}
          />
        )}

        <div className="mt-3">
          <Accordion>
            {!isLoading && (
              <>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="profileSanfona">
                    Quiz de Plantas
                  </Accordion.Header>
                  <Accordion.Body>
                    <Quiz
                      luminosidade={luminosidade}
                      cuidado={cuidado}
                      setCuidado={setCuidado}
                      setLuminosidade={setLuminosidade}
                      id={user._id}
                      user={user}
                      reload={reload}
                      setReload={setReload}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}
          </Accordion>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            flexWrap: "nowrap",
          }}
        >
          <div className="barraSupinpa" style={{ display: "flex" }}>
            <h2 className="AllSub">Crie um Jardim</h2>
            <form onSubmit={handleSubmitGarden}>
              <div style={{ display: "flex", margin: " 10px" }}>
                <label> Nome do jardim </label>

                <input
                  name="name"
                  value={formGarden.name}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: "flex", margin: " 10px" }}>
                <label> Local do Jardim </label>

                <input
                  name="local"
                  value={formGarden.local}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          <Button
            type="submit"
            className="btn btn-light btn-outline-dark btn-sm me-2"
            style={{
              backgroundColor: "#7C6053",
              color: "white",
              borderColor: "#7C6053",
            }}
          >
            Salvar Jardim
          </Button>

          <form>
            <label id="label" htmlFor="formResidence">
              Local:
            </label>
            <select
              required
              id="formSelect"
              name="local"
              onChange={handleChange}
              defaultValue={formGarden.local}
            >
              <option value=""></option>
              <option value="Quintal">Quintal</option>
              <option value="Varanda">Varanda</option>
              <option value="Sala">Sala</option>
              <option value="Quarto">Quarto</option>
              <option value="Cozinha">Cozinha</option>
              <option value="Banheiro">Banheiro</option>
              <option value="Lavanderia">Lavanderia</option>
              <option value="Outro">Outro</option>
            </select>

            <Button
              type="submit"
              className="btn btn-light btn-outline-dark btn-sm me-2"
              style={{
                backgroundColor: "#7C6053",
                color: "white",
                borderColor: "#7C6053",
              }}
            >
              Salvar Jardim
            </Button>
          </form>

          <button
            className="btn btn-light btn-outline-dark btn-sm me-2"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              borderColor: "#dc3545",
            }}
          >
            Deletar Jardim
          </button>
        </div>
        <div>
          <h1 className="AllSub">Meus Jardins</h1>
          {!isLoading &&
            user.garden.map((garden) => {
              const date = new Date(garden.createdAt);

              const dd = date.getDate();
              const mm = date.getMonth() + 1; //janeiro = 0, então precisamos adicionar +1. Isso é só com o mês mesmo.
              const aa = date.getFullYear();

              const hh = date.getHours();
              const min = date.getMinutes();
              console.log(garden);

              return (
                <div>
                  <Card style={{ width: "18rem", marginTop: "16px" }}>
                    <Card.Body>
                      <Card.Title>
                        <p className="profileCardTitle">
                          <strong>{garden.name}</strong>
                        </p>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        <p className="profileCardSub">
                          <strong>local:</strong> {garden.local}
                        </p>
                      </Card.Subtitle>
                      <Card.Text>
                        <p className="profileCardText">
                          <strong>postado em:</strong> {dd}/{mm}/{aa} - {hh}:
                          {min}{" "}
                        </p>
                      </Card.Text>
                      <Card.Link>
                        <Link
                          to={`/mygarden/${garden._id}`}
                          className="profileCardLink"
                        >
                          Explore seu Jardim
                        </Link>
                      </Card.Link>
                      {garden.comments.length > 0 && <h2>Comentários:</h2>}
                      {garden.comments.map((comments) => {
                        return <p>{comments.content}</p>;
                      })}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default teste;
