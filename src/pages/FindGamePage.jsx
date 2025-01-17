import React, { useState } from "react";
import Cube3D from "../components/Cube3D";

function FindGamePage() {
  const [currentPosition, setCurrentPosition] = useState([0, 0, 0]); // Position actuelle
  const [selectedPosition, setSelectedPosition] = useState(null); // Position validée
  const [targetPosition, setTargetPosition] = useState(null); // Cible sélectionnée

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.info}>
        <h2>Sélectionnez votre position...</h2>
        <p>
          Position actuelle : <strong>{`[${currentPosition.join(", ")}]`}</strong>
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
      </div>
      <Cube3D
        onPositionChange={(position) => setCurrentPosition(position)}
        onPositionSelect={(position) => setSelectedPosition(position)}
        onTargetSelect={(position) => setTargetPosition(position)}
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
};

export default FindGamePage;