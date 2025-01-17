import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function PointsCube({ onPositionChange, onPositionSelect, onTargetSelect }) {
  const size = 3; // Taille du cube (3x3x3)
  const spacing = 1; // Espacement entre les points
  const [activePoint, setActivePoint] = useState([0, 0, 0]); // Point actif
  const [hoveredPoint, setHoveredPoint] = useState(null); // Point survolé par la souris
  const [selectedPoint, setSelectedPoint] = useState(null); // Point sélectionné
  const [targetPoint, setTargetPoint] = useState(null); // Cible sélectionnée
  const [phase, setPhase] = useState(1); // Phase actuelle : 1 = Sélection, 2 = Suivi

  // Gestion des touches pour déplacer le point actif
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
          setPhase(1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, selectedPoint, onPositionChange, onPositionSelect]);

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
          onPointerOver={() => {
            if (phase === 2) setHoveredPoint([x, y, z]);
          }}
          onPointerOut={() => {
            if (phase === 2) setHoveredPoint(null);
          }}
          onClick={() => {
            if (phase === 2) {
              setTargetPoint([x, y, z]); // Fixe la cible sélectionnée
              onTargetSelect([x, y, z]); // Notifie le parent de la cible
            }
          }}
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
                : hoveredPoint &&
                  phase === 2 &&
                  x === hoveredPoint[0] &&
                  y === hoveredPoint[1] &&
                  z === hoveredPoint[2]
                ? "yellow" // Suivi à la souris en jaune
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
