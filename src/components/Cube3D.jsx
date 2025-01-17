import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function PointsCube() {
  const size = 3; // Taille du cube (3x3x3)
  const spacing = 1; // Espacement entre les points
  const [activePoint, setActivePoint] = useState([0, 0, 0]); // Point actif (bleu)

  // Gestion des touches pour déplacer le point actif
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Touche appuyée :', event.key);
      setActivePoint((prev) => {
        const [x, y, z] = prev;
        let newPoint;
        switch (event.key) {
          case 's': // Aller vers l'avant sur l'axe Z
            newPoint = [x, y, Math.min(z + spacing, Math.floor(size / 2))];
            break;
          case 'z': // Aller vers l'arrière sur l'axe Z
            newPoint = [x, y, Math.max(z - spacing, -Math.floor(size / 2))];
            break;
          case 'q': // Aller vers la gauche sur l'axe X
            newPoint = [Math.max(x - spacing, -Math.floor(size / 2)), y, z];
            break;
          case 'd': // Aller vers la droite sur l'axe X
            newPoint = [Math.min(x + spacing, Math.floor(size / 2)), y, z];
            break;
          case 'ArrowUp': // Monter sur l'axe Y
            newPoint = [x, Math.min(y + spacing, Math.floor(size / 2)), z];
            break;
          case 'ArrowDown': // Descendre sur l'axe Y
            newPoint = [x, Math.max(y - spacing, -Math.floor(size / 2)), z];
            break;
          default:
            newPoint = prev;
        }
        console.log('Nouvelle position du point actif :', newPoint);
        return newPoint;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Génération des points dans la grille
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
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          {/* Couleur bleue pour le point actif */}
          <meshBasicMaterial color={x === activePoint[0] && y === activePoint[1] && z === activePoint[2] ? 'blue' : 'black'} />
        </mesh>
      ))}
    </group>
  );
}

function Cube3D() {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <PointsCube />
    </Canvas>
  );
}

export default Cube3D;
