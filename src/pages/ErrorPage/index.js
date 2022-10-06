import errorPage from '../../assets/ErrorPage-01.jpg'

function ErrorPage() {
    return (
      <div>
      <img style={{width: "90vw", marginTop:"20px"}}
        src={errorPage}
        alt="Error"
      />
      <h1 style={{fontFamily:"Lato", fontWeight:"600", color:"#7c6053"}}>Página não encontrada</h1>
      </div>
    );
  }

export default ErrorPage
  