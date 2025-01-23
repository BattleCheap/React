import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function PointsCube({
  cubeSize = 5,
  onPositionChange,
  onPositionSelect,
  onTargetSelect,
  setErrorMessage,
  setVictory,
}) {
  const spacing = 1;
  const [activePoint, setActivePoint] = useState([0, 0, 0]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [targetPoint, setTargetPoint] = useState(null);
  const [highlightedLine, setHighlightedLine] = useState([]);
  const [hiddenPoint, setHiddenPoint] = useState([]);
  const [missedTargets, setMissedTargets] = useState([]);
  const [isHiddenPointDiscovered, setIsHiddenPointDiscovered] = useState(false);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const randomPoint = [
      Math.floor(Math.random() * cubeSize) - Math.floor(cubeSize / 2),
      Math.floor(Math.random() * cubeSize) - Math.floor(cubeSize / 2),
      Math.floor(Math.random() * cubeSize) - Math.floor(cubeSize / 2),
    ];
    setHiddenPoint(randomPoint);
    console.log("Hidden Point:", randomPoint);
  }, [cubeSize]);

  const isValidTarget = (start, end) => {
    const [x1, y1, z1] = start;
    const [x2, y2, z2] = end;
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const dz = Math.abs(z2 - z1);

    return (
      (dx > 0 && dy === 0 && dz === 0) ||
      (dx === 0 && dy > 0 && dz === 0) ||
      (dx === 0 && dy === 0 && dz > 0) ||
      (dx === dy && dz === 0) ||
      (dx === dz && dy === 0) ||
      (dy === dz && dx === 0) ||
      (dx === dy && dy === dz)
    );
  };

  const calculateLine = (start, end) => {
    if (!start || !end || !isValidTarget(start, end)) return [];
    const [x1, y1, z1] = start;
    const [x2, y2, z2] = end;

    const path = [];
    const steps = Math.max(
      Math.abs(x2 - x1),
      Math.abs(y2 - y1),
      Math.abs(z2 - z1)
    );

    for (let i = 1; i <= steps; i++) {
      const x = x1 + ((x2 - x1) / steps) * i;
      const y = y1 + ((y2 - y1) / steps) * i;
      const z = z1 + ((z2 - z1) / steps) * i;
      path.push([Math.round(x), Math.round(y), Math.round(z)]);
    }

    return path;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (phase === 1 && !selectedPoint) {
        setActivePoint((prev) => {
          const [x, y, z] = prev;
          let newPoint = prev;

          switch (event.key) {
            case "s":
              newPoint = [x, y, Math.min(z + spacing, Math.floor(cubeSize / 2))];
              break;
            case "z":
              newPoint = [x, y, Math.max(z - spacing, -Math.floor(cubeSize / 2))];
              break;
            case "q":
              newPoint = [Math.max(x - spacing, -Math.floor(cubeSize / 2)), y, z];
              break;
            case "d":
              newPoint = [Math.min(x + spacing, Math.floor(cubeSize / 2)), y, z];
              break;
            case "ArrowUp":
              newPoint = [x, Math.min(y + spacing, Math.floor(cubeSize / 2)), z];
              break;
            case "ArrowDown":
              newPoint = [x, Math.max(y - spacing, -Math.floor(cubeSize / 2)), z];
              break;
            case "Enter":
              setSelectedPoint(prev);
              onPositionSelect(prev);
              setPhase(2);
              return prev;
            default:
              return prev;
          }

          onPositionChange(newPoint);
          return newPoint;
        });
      } else if (phase === 2) {
        if (event.key === "Escape") {
          setTargetPoint(null);
          setHoveredPoint(null);
          setHighlightedLine([]);
          setPhase(1);
          setErrorMessage("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, selectedPoint, onPositionChange, onPositionSelect]);

  const handlePointHover = (position) => {
    if (phase === 2 && selectedPoint) {
      if (isValidTarget(selectedPoint, position)) {
        setHoveredPoint(position);
        setHighlightedLine(calculateLine(selectedPoint, position));
      } else {
        setHoveredPoint(null);
        setHighlightedLine([]);
      }
    }
  };

  const handlePointClick = (position) => {
    if (phase === 2) {
      const lineIncludesHiddenPoint = highlightedLine.some(
        (p) => JSON.stringify(p) === JSON.stringify(hiddenPoint)
      );

      if (
        JSON.stringify(position) === JSON.stringify(hiddenPoint) ||
        lineIncludesHiddenPoint
      ) {
        setTargetPoint(hiddenPoint);
        setVictory(true); // Active la pop-up
        setIsHiddenPointDiscovered(true);
        return;
      }

      if (isValidTarget(selectedPoint, position)) {
        setTargetPoint(position);
        setMissedTargets((prev) => [...prev, position]);
        setErrorMessage("");
        onTargetSelect(position);
      } else {
        setErrorMessage(
          "Impossible de valider : La cible doit être alignée sur une ligne droite !"
        );
      }

      setSelectedPoint(null);
      setTargetPoint(null);
      setHighlightedLine([]);
      setPhase(1);
    }
  };

  const points = [];
  for (let x = -Math.floor(cubeSize / 2); x <= Math.floor(cubeSize / 2); x += spacing) {
    for (let y = -Math.floor(cubeSize / 2); y <= Math.floor(cubeSize / 2); y += spacing) {
      for (let z = -Math.floor(cubeSize / 2); z <= Math.floor(cubeSize / 2); z += spacing) {
        points.push([x, y, z]);
      }
    }
  }

  return (
    <group>
      {points.map(([x, y, z], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          onPointerOver={() => handlePointHover([x, y, z])}
          onPointerOut={() => setHoveredPoint(null)}
          onClick={() => handlePointClick([x, y, z])}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={
              JSON.stringify([x, y, z]) === JSON.stringify(hiddenPoint) &&
              isHiddenPointDiscovered
                ? "red"
                : JSON.stringify([x, y, z]) === JSON.stringify(selectedPoint)
                ? "green"
                : highlightedLine.some(
                    (p) => JSON.stringify(p) === JSON.stringify([x, y, z])
                  )
                ? "yellow"
                : missedTargets.some(
                    (p) => JSON.stringify(p) === JSON.stringify([x, y, z])
                  )
                ? "orange"
                : JSON.stringify([x, y, z]) === JSON.stringify(activePoint)
                ? "blue"
                : JSON.stringify([x, y, z]) === JSON.stringify(hiddenPoint)
                ? "black"
                : "black"
            }
          />
        </mesh>
      ))}
    </group>
  );
}

function Cube3D({
  cubeSize,
  onPositionChange,
  onPositionSelect,
  onTargetSelect,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [victory, setVictory] = useState(false); // Gère la victoire
  const navigate = useNavigate();

  const handleRestart = () => {
    window.location.reload();
  };

  const handleQuit = () => {
    navigate("/");
  };

  return (
    <>
      {victory && (
        <div style={styles.modal}>
          <h2 style={{ color: "green" }}>Victoire ! Vous avez gagné !</h2>
          <button style={styles.button} onClick={handleRestart}>
            Rejouer
          </button>
          <button style={styles.quitButton} onClick={handleQuit}>
            Quitter
          </button>
        </div>
      )}
      <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
        {errorMessage}
      </div>
      <Canvas style={{ width: "100%", height: "100vh" }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <PointsCube
          cubeSize={cubeSize}
          onPositionChange={onPositionChange}
          onPositionSelect={onPositionSelect}
          onTargetSelect={onTargetSelect}
          setErrorMessage={setErrorMessage}
          setVictory={setVictory} // Passe la gestion de la victoire
        />
      </Canvas>
    </>
  );
}

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 100,
    textAlign: "center",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quitButton: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#DC3545",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cube3D;
