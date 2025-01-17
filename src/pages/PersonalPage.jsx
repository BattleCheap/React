import React from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion (si nécessaire)
    console.log("Utilisateur déconnecté");
    navigate('/'); // Redirige vers la page d'accueil
  };

  const handleFindGame = () => {
    // Redirige vers la page "Trouver une partie"
    navigate('/find-game');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Bienvenue dans votre espace personnel</h1>
      <div style={{ marginTop: '20px' }}>
        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Déconnexion
        </button>

        {/* Bouton Trouver une partie */}
        <button
          onClick={handleFindGame}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Trouver une partie
        </button>
      </div>
    </div>
  );
}

export default PersonalPage;
