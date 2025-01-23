import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CubeSizePage() {
  const [cubeSize, setCubeSize] = useState(3); // Taille par défaut
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Naviguez vers FindGamePage avec la taille du cube
    navigate("/find-game", { state: { cubeSize } });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Choisissez la taille du cube</h1>
      <input
        type="number"
        min="3"
        max="10"
        value={cubeSize}
        onChange={(e) => setCubeSize(Number(e.target.value))}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      />
      <br />
      <button
        onClick={handleStartGame}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28A745",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Commencer la partie
      </button>
    </div>
  );
}

export default CubeSizePage;
