import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PersonalPage from './pages/PersonalPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personal" element={<PersonalPage />} />
    </Routes>
  );
}

export default App;
