import errorPage from "../../assets/ErrorPage-01.jpg";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div
      style={{
        backgroundColor: "#EDDDD6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Lato",
          fontWeight: "600",
          fontSize: "35px",
          color: "#7c6053",
          marginTop: "80px",
        }}
      >
        Página não encontrada
      </h1>
      <img
        style={{ width: "50vw", marginTop: "20px" }}
        src={errorPage}
        alt="Error"
      />
      <Link to="/">
        <button className="homeInicio2">Retornar à Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
