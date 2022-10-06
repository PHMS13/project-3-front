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
      <h1 className="errorTxt">
        Página não encontrada
      </h1>
      <img
        className="errorImg"
        src={errorPage}
        alt="Error"
      />
      <Link to="/">
        <button className="errorBtn">Retornar à Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
