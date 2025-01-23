import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import Cube3D from "../components/Cube3D";

function FindGamePage() {
  const [currentPosition, setCurrentPosition] = useState([0, 0, 0]); // Position actuelle
  const [selectedPosition, setSelectedPosition] = useState(null); // Position validée
  const [targetPosition, setTargetPosition] = useState(null); // Cible sélectionnée
  const [attemptedTargets, setAttemptedTargets] = useState([]); // Liste des cibles tentées
  const [victoryMessage, setVictoryMessage] = useState(""); // Message de victoire
  const [hiddenPoint, setHiddenPoint] = useState(null); // Point caché
  const [cubeKey, setCubeKey] = useState(0); // Clé pour forcer la réinitialisation de Cube3D
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  // Initialise le jeu (point caché, réinitialisation des états)
  const initializeGame = () => {
    const randomPoint = [
      Math.floor(Math.random() * 3) - 1,
      Math.floor(Math.random() * 3) - 1,
      Math.floor(Math.random() * 3) - 1,
    ];
    setHiddenPoint(randomPoint);
    console.log("Hidden Point:", randomPoint); // Debug
    setVictoryMessage("");
    setSelectedPosition(null);
    setTargetPosition(null);
    setAttemptedTargets([]);
    setCubeKey((prevKey) => prevKey + 1); // Change la clé pour recréer Cube3D
  };

  // Gestion de la validation de la position
  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  // Gestion de la validation de la cible
  const handleTargetSelect = (position) => {
    if (victoryMessage) return; // Si victoire, ignorer les sélections
    if (JSON.stringify(position) === JSON.stringify(hiddenPoint)) {
      setVictoryMessage("Victoire ! Vous avez trouvé le point caché !");
    } else {
      setAttemptedTargets((prev) => [...prev, position]);
    }
    setTargetPosition(position);
  };

  // Réinitialise le jeu
  const resetGame = () => {
    initializeGame();
  };

  // Quitte le jeu
  const quitGame = () => {
    navigate("/personal"); // Redirige vers la page d'accueil
  };

  // Initialise le jeu au chargement
  React.useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.info}>
        <h2>{victoryMessage || "Sélectionnez votre position..."}</h2>
        <p>
          Position actuelle :{" "}
          <strong>{`[${currentPosition.join(", ")}]`}</strong>
        </p>
        <p>
          Position validée :{" "}
          <strong>
            {selectedPosition
              ? `[${selectedPosition.join(", ")}]`
              : "Aucune position validée"}
          </strong>
        </p>
        <p>
          Cible sélectionnée :{" "}
          <strong>
            {targetPosition
              ? `[${targetPosition.join(", ")}]`
              : "Aucune cible sélectionnée"}
          </strong>
        </p>
        <p>
          Tentatives précédentes :{" "}
          {attemptedTargets.length > 0 ? (
            attemptedTargets.map((target, index) => (
              <span key={index}>[{target.join(", ")}] </span>
            ))
          ) : (
            <span>Aucune</span>
          )}
        </p>
        {victoryMessage && (
          <>
            <button onClick={resetGame} style={styles.button}>
              Rejouer
            </button>
            <button onClick={quitGame} style={styles.quitButton}>
              Quitter
            </button>
          </>
        )}
      </div>
      <Cube3D
        key={cubeKey} // Utilisation de la clé unique pour recréer le composant
        onPositionChange={setCurrentPosition}
        onPositionSelect={handlePositionSelect}
        onTargetSelect={handleTargetSelect}
        hiddenPoint={hiddenPoint} // Passe le point caché
        attemptedTargets={attemptedTargets} // Liste des cibles tentées
      />
    </div>
  );
}

const styles = {
  info: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    zIndex: 1,
  },
  button: {
    marginTop: "10px",
    marginRight: "5px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quitButton: {
    marginTop: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#DC3545",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default FindGamePage;
