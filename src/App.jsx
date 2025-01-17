import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PersonalPage from './pages/PersonalPage';
import FindGamePage from './pages/FindGamePage'; // Nouvelle page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/find-game" element={<FindGamePage />} /> {/* Route pour la page "Trouver une partie" */}
    </Routes>
  );
}

export default App;
