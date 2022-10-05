import { Routes, Route } from "react-router-dom";
import { Home }  from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorPage } from "./pages/ErrorPage";
import NavBar from "./components/NavBar";

import "./App.css";
import MyGarden from "./pages/MyGarden";
import Gardener from "./pages/Gardener";
import AllPlants from "./pages/Allplants";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="/mygarden" element={<MyGarden />} />
          <Route path="/gardener" element={<Gardener />} />
          <Route path="/allplants" element={<AllPlants />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
