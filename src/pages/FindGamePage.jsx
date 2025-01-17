import React from 'react';
import Cube3D from '../components/Cube3D'; // Réutilisation du composant Cube3D

function FindGamePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Trouver une partie</h1>
      {/* Affiche le cube */}
      <Cube3D />
    </div>
  );
}

export default FindGamePage;
