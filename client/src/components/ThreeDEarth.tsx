// client/src/components/ThreeDEarth.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// URLs das texturas da Terra
const earthTextures = {
  surface: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurface.jpg',
  normal: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceNormal.jpg',
  specular: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceSpecular.jpg',
  clouds: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthAtmosphere.png',
};

// Componente para a Esfera da Terra 3D
function EarthSphere({ position, radius, tiltAngle, rotationSpeed }: { position: [number, number, number], radius: number, tiltAngle: number, rotationSpeed: number }) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  // Carregar texturas
  const [earthMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    earthTextures.surface,
    earthTextures.normal,
    earthTextures.specular,
    earthTextures.clouds,
  ]);

  // Animação de rotação
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed; // A rotação acontece aqui
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 0.95; // Nuvens giram
    }
  });

  return (
    <group position={position} rotation-z={tiltAngle}>
      {/* Esfera da superfície da Terra */}
      <Sphere ref={earthRef} args={[radius, 64, 64]}>
        <meshPhongMaterial
          map={earthMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={5}
        />
      </Sphere>

      {/* Esfera das nuvens (levemente maior e transparente) */}
      <Sphere ref={cloudsRef} args={[radius * 1.005, 64, 64]}>
        <meshLambertMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

// Componente principal que renderiza a cena Three.js
export default function ThreeDEarth() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculando a posição do planeta na lateral esquerda
  const planetScreenX = windowDimensions.width * 0.15;
  const planetScreenY = windowDimensions.height * 0.5;

  const aspect = windowDimensions.width / windowDimensions.height;
  const fovRad = 45 * Math.PI / 180;
  const targetZ = 0;
  const cameraZ = 5;

  const visibleHeight = 2 * Math.tan(fovRad / 2) * (cameraZ + targetZ);
  const visibleWidth = visibleHeight * aspect;

  const planetWorldX = (planetScreenX / windowDimensions.width - 0.5) * visibleWidth;
  const planetWorldY = -(planetScreenY / windowDimensions.height - 0.5) * visibleHeight;

  const planetRadius = 0.8; // Raio do planeta em unidades 3D

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* O Canvas da cena Three.js */}
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
        {/* Luz solar (simulada) - vindo do canto superior direito */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        {/* Luz ambiente para iluminar as partes escuras */}
        <ambientLight intensity={0.5} />

        {/* Adiciona a Esfera da Terra na cena */}
        <EarthSphere
          position={[planetWorldX, planetWorldY, targetZ]}
          radius={planetRadius}
          tiltAngle={0.41}
          rotationSpeed={0.02} // <--- AQUI! Aumentei a velocidade para 0.02
        />
      </Canvas>
    </div>
  );
}