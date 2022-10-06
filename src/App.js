import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthContextComponent } from "./contexts/authContext";

import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
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
          <Route path="/user-profile/:idUser" element={<UserProfile />} />{" "}
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
