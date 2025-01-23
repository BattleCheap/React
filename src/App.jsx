import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PersonalPage from "./pages/PersonalPage";
import FindGamePage from "./pages/FindGamePage";
import CubeSizePage from "./pages/CubeSizePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/cube-size" element={<CubeSizePage />} />
      <Route path="/find-game" element={<FindGamePage />} />
    </Routes>
  );
}

export default App;
