// HOMEPAGE COM INFOS BASICAS DO PROJETO, IMAGENS DE RECEPÇAO E OPCAO DE CRIAÇAO DE PERFIL QUE VAI SER ENCAMINHADO PARA A PAGE PROFILES
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="homePageHero">
      <div className="homeBackground">
        <div className="homeBody">
          <p className="homeTxtInicio">
            Nosso projeto tem o intuito de te ajudar a encontrar a planta que 
            <strong> mais se encaixa</strong> com a sua casa e personalidade. Queremos te ajudar a
            fazer o seu ambiente ficar ainda mais aconchegante e verde! <strong>Sinta-se
            à vontade por aqui!</strong>
          </p>
          <div style={{display: "flex", alignItems: "center", flexDirection: "column", flexWrap: "nowrap"}}>{/*  nessa div, flex flex direction coll */}
            <Link to="/signup">
              <button className="homeInicio1">Cadastre-se</button>
            </Link>
            <Link to="/login">
              <button className="homeInicio2">Acesse sua conta</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
