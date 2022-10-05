import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";
import UserProfile from "./pages/UserProfile";

import "./App.css";
import MyGarden from "./pages/MyGarden";
import Gardener from "./pages/Gardener";
import AllPlants from "./pages/Allplants";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="/mygarden/:idGarden" element={<MyGarden />} />{" "}
          {/*  pagina de detalhe do garden */}
          <Route path="/gardener" element={<Gardener />} />{" "}
          {/* all users + searchbar */}
          <Route path="/gardener/:idUser" element={<UserProfile />} />{" "}
          {/* pagina de um user */}

          <Route path="/allplants" element={<AllPlants />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
          git
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
