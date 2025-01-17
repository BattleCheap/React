import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function PointsCube({ onPositionChange, onPositionSelect, onTargetSelect }) {
  const size = 3; // Taille du cube (3x3x3)
  const spacing = 1; // Espacement entre les points
  const [activePoint, setActivePoint] = useState([0, 0, 0]); // Point actif
  const [hoveredPoint, setHoveredPoint] = useState(null); // Point survolé par la souris
  const [selectedPoint, setSelectedPoint] = useState(null); // Point sélectionné (vert)
  const [targetPoint, setTargetPoint] = useState(null); // Cible sélectionnée (rouge)
  const [highlightedLine, setHighlightedLine] = useState([]); // Points jaunes sur la ligne
  const [phase, setPhase] = useState(1); // Phase actuelle : 1 = Sélection, 2 = Suivi

  // Calcule les points entre deux positions
  const calculateLine = (start, end) => {
    if (!start || !end) return [];
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

  // Gestion des touches pour déplacer le point actif (bleu)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (phase === 1 && !selectedPoint) {
        setActivePoint((prev) => {
          const [x, y, z] = prev;
          let newPoint = prev;

          switch (event.key) {
            case "s":
              newPoint = [x, y, Math.min(z + spacing, Math.floor(size / 2))];
              break;
            case "z":
              newPoint = [x, y, Math.max(z - spacing, -Math.floor(size / 2))];
              break;
            case "q":
              newPoint = [Math.max(x - spacing, -Math.floor(size / 2)), y, z];
              break;
            case "d":
              newPoint = [Math.min(x + spacing, Math.floor(size / 2)), y, z];
              break;
            case "ArrowUp":
              newPoint = [x, Math.min(y + spacing, Math.floor(size / 2)), z];
              break;
            case "ArrowDown":
              newPoint = [x, Math.max(y - spacing, -Math.floor(size / 2)), z];
              break;
            case "Enter":
              setSelectedPoint(prev); // Fixe le point sélectionné
              onPositionSelect(prev); // Notifie le parent de la sélection
              setPhase(2); // Passe à la phase de suivi
              return prev;
            default:
              return prev;
          }

          onPositionChange(newPoint);
          return newPoint;
        });
      } else if (phase === 2) {
        if (event.key === "Escape") {
          setTargetPoint(null); // Réinitialise la cible
          setHoveredPoint(null); // Réinitialise le survol
          setHighlightedLine([]); // Réinitialise la ligne
          setPhase(1); // Retourne à la phase 1
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, selectedPoint, onPositionChange, onPositionSelect]);

  // Gestion du survol pour mettre à jour la ligne jaune
  const handlePointHover = (position) => {
    setHoveredPoint(position);
    if (phase === 2 && selectedPoint) {
      setHighlightedLine(calculateLine(selectedPoint, position)); // Met à jour la ligne jaune
    }
  };

  // Gestion du clic pour valider une cible
  const handlePointClick = (position) => {
    if (phase === 2) {
      setTargetPoint(position); // Fixe la cible sélectionnée
      onTargetSelect(position); // Notifie le parent de la cible
      setHighlightedLine([]); // Réinitialise la ligne jaune
    }
  };

  // Génération des points dans un cube 3x3x3
  const points = [];
  for (let x = -Math.floor(size / 2); x <= Math.floor(size / 2); x += spacing) {
    for (let y = -Math.floor(size / 2); y <= Math.floor(size / 2); y += spacing) {
      for (let z = -Math.floor(size / 2); z <= Math.floor(size / 2); z += spacing) {
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
              targetPoint &&
              x === targetPoint[0] &&
              y === targetPoint[1] &&
              z === targetPoint[2]
                ? "red" // Cible en rouge
                : selectedPoint &&
                  x === selectedPoint[0] &&
                  y === selectedPoint[1] &&
                  z === selectedPoint[2]
                ? "green" // Point sélectionné en vert
                : highlightedLine.some(
                    (p) => JSON.stringify(p) === JSON.stringify([x, y, z])
                  )
                ? "yellow" // Ligne temporaire en jaune
                : phase === 1 &&
                  !selectedPoint &&
                  x === activePoint[0] &&
                  y === activePoint[1] &&
                  z === activePoint[2]
                ? "blue" // Point actif en bleu
                : "black" // Points non actifs
            }
          />
        </mesh>
      ))}
    </group>
  );
}

function Cube3D({ onPositionChange, onPositionSelect, onTargetSelect }) {
  return (
    <Canvas style={{ width: "100%", height: "100vh" }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <PointsCube
        onPositionChange={onPositionChange}
        onPositionSelect={onPositionSelect}
        onTargetSelect={onTargetSelect}
      />
    </Canvas>
  );
}

export default Cube3D;