// SOBRE NÓS - 3 FOTOS OU GIFS COM A NOME DE CADA COLABORADOR
import pedroFoto from "../../assets/perfilPedro.png";
import tamiFoto from "../../assets/perfilTami.png";
import leoFoto from "../../assets/perrfilLeo.png";
import criadores from "../../assets/08 - Criadores.png";
import logo from "../../assets/Logo.png";

function AboutUs() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "50px",
          marginBottom: "60px",
        }}
      >
        <h1 className="subAbout">Os criadores</h1>
        <img
          src={criadores}
          alt="criadores"
          style={{
            width: "70vw",
            backgroundSize: "cover"
          }}
        />
      </div>
      <img
        src={pedroFoto}
        alt="pedroMaciel"
        style={{
          width: "40vw",
          borderRadius: "280px",
        }}
      />
      <h1 className="nomeAbout">Pedro Maciel</h1>

      <img
        src={tamiFoto}
        alt="tamiresBraga"
        style={{
          width: "40vw",
          borderRadius: "280px",
        }}
      />
      <h1 className="nomeAbout">Tamires Braga</h1>

      <img
        src={leoFoto}
        alt="leonardoNunes"
        style={{
          width: "40vw",
        }}
      />
      <h1 className="nomeAbout" style={{ marginBottom: "120px" }}>
        Leonardo Nunes
      </h1>

      <div style={{ backgroundColor: "#EDDDD6" }}>
        <h1 className="finalCriadores">The End,</h1>
        <img src={logo} alt="logo" style={{ width: "36vw" }} />
      </div>
    </>
  );
}

export default AboutUs;
