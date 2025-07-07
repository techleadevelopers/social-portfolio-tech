// src/components/background-particles.tsx
import React, { useEffect, useRef, useState } from 'react';

// Definindo a interface para as propriedades das partículas, se necessário
interface ParticleProps {
  count?: number; // Número de partículas
  color?: string; // Cor base das partículas (ex: "blue-400")
  minSize?: number; // Tamanho mínimo em px
  maxSize?: number; // Tamanho máximo em px
  animationDurationMin?: number; // Duração mínima da animação em segundos
  animationDurationMax?: number; // Duração máxima da animação em segundos
}

export default function BackgroundParticles({
  count = 30, // Um número razoável para um efeito sutil
  color = "blue-400", // Cor azul para combinar com o tema
  minSize = 2,
  maxSize = 8,
  animationDurationMin = 10,
  animationDurationMax = 20,
}: ParticleProps) {
  const particles = useRef<Array<{
    id: number;
    left: string;
    top: string;
    size: string;
    delay: string;
    duration: string;
    opacity: string;
  }>>([]);

  // Gerar partículas apenas uma vez na montagem do componente
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const duration = Math.random() * (animationDurationMax - animationDurationMin) + animationDurationMin;
      const delay = Math.random() * -animationDurationMax; // Delay negativo para que já estejam em movimento
      const opacity = (0.1 + Math.random() * 0.4).toFixed(2); // Opacidade baixa para ser sutil

      particles.current.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        opacity: opacity,
      });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.current.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full bg-${color} blur-sm animate-float-subtle`} // 'blur-sm' para suavidade
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}