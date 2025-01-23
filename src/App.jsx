import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PersonalPage from "./pages/PersonalPage";
import FindGamePage from "./pages/FindGamePage";
import Register from "./pages/Register"; // Nouvelle page d'inscription
import CubeSizePage from "./pages/CubeSizePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Route pour la page d'inscription */}
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/find-game" element={<FindGamePage />} />
      <Route path="/cube-size" element={<CubeSizePage />} />
    </Routes>
  );
}

export default App;
