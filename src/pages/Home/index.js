import { Link } from "react-router-dom"

export function Home() {
    return (
      <div>
      <h1>Home Page</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>

      </div>
      ) 
  }

  export default Home