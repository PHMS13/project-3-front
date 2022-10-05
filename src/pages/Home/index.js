// HOMEPAGE COM INFOS BASICAS DO PROJETO, IMAGENS DE RECEPÇAO E OPCAO DE CRIAÇAO DE PERFIL QUE VAI SER ENCAMINHADO PARA A PAGE PROFILES
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homePageHero">
      <div className="homeBackground">
      <div className="homeBody">
        <p className="homeTxtInicio">
          Nosso projeto tem o intuito de te ajudar a encontrar a planta que mais
          se encaixa com a sua casa e personalidade. Queremos te ajudar a fazer
          o seu ambiente ficar ainda mais aconchegante e verde! Sinta-se à
          vontade por aqui!
        </p>
        
        <Link to="/signup">
          <button className="homeInicio">Se cadastre</button>
        </Link>
        <Link to="/login">
        <button className="homeInicio">Acesse sua conta</button>
        </Link>
      </div>

      </div>
    </div>
  );
}

export default Home;



