// src/components/animated-triangles-background.tsx
import React, { useEffect, useRef } from 'react';

interface AnimatedTrianglesBackgroundProps {
  cols?: number; // Número de colunas visíveis
  rows?: number; // Número de linhas visíveis
  triangleBase?: number; // Base do triângulo em px
  triangleHeight?: number; // Altura do triângulo em px
  style?: React.CSSProperties; // Para permitir passar estilo inline (como opacidade)
}

// Cores para os triângulos (Azul e o Ciano/Verde Neon da imagem)
const TRIANGLE_COLORS = [
  "#3B82F6", // Um azul forte
  "#00FFFF", // Ciano/Aqua (similar ao verde neon da imagem)
  "#8A2BE2", // Roxo (para dar um contraste similar ao da imagem)
];

// Componente para um único triângulo animado
const AnimatedPolygon = ({ points, color, delay }: { points: string; color: string; delay: number }) => (
  <polygon
    points={points}
    fill="none"
    stroke={color}
    strokeWidth="2" // Espessura da linha do triângulo
  >
    {/* Animação de expansão e contração do triângulo */}
    <animate
      attributeName="points"
      repeatCount="indefinite"
      dur="4s"
      begin={`${delay}s`}
      from={points} // Começa e termina na forma original
      to="50 -75, 175 126, -75 126" // Exemplo de forma expandida para animação
      calcMode="spline"
      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" // Easing suave
      keyTimes="0; 0.5; 1"
    />
    <animate
      attributeName="stroke-opacity"
      repeatCount="indefinite"
      dur="4s"
      begin={`${delay}s`}
      from="0.5"
      to="1"
      calcMode="spline"
      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
      keyTimes="0; 0.5; 1"
    />
  </polygon>
);


export default function AnimatedTrianglesBackground({
  cols = 20, // Mais colunas para ter mais triângulos na tela
  rows = 15, // Mais linhas
  triangleBase = 70, // Base menor do triângulo (para ser menor)
  triangleHeight = 60, // Altura menor do triângulo
  style,
}: AnimatedTrianglesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calcular o número de colunas e linhas para preencher a tela
      // O layout de triângulos na imagem é um grid de triângulos para cima e para baixo
      // A largura de uma "célula" no grid horizontal é metade da base do triângulo
      // A altura de uma "linha" no grid vertical é a altura do triângulo
      const actualCols = Math.ceil(viewportWidth / (triangleBase / 2)) + 2; // +2 para sangrar as bordas
      const actualRows = Math.ceil(viewportHeight / triangleHeight) + 2; // +2 para sangrar as bordas

      // Definir o grid CSS
      container.style.gridTemplateColumns = `repeat(${actualCols}, ${triangleBase}px)`;
      container.style.gridTemplateRows = `repeat(${actualRows}, ${triangleHeight}px)`;

      // Centralizar o grid no viewport, com um pequeno sangramento nas bordas
      const offsetX = (actualCols * triangleBase - viewportWidth) / 2;
      const offsetY = (actualRows * triangleHeight - viewportHeight) / 2;

      container.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
      container.style.width = `${actualCols * triangleBase}px`;
      container.style.height = `${actualRows * triangleHeight}px`;
    }
  }, [cols, rows, triangleBase, triangleHeight]);

  const totalCells = cols * rows; // Número total de triângulos no grid

  return (
    <div ref={containerRef} className="animated-triangles-container" style={style}>
      <div className="animated-triangles-grid">
        {Array.from({ length: totalCells }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;

          // Posição Y do triângulo (top do SVG) no grid
          const translateY = row % 2 === 0 ? 0 : triangleHeight / 2; // Linhas pares em 0, linhas ímpares em metade da altura

          // Pontos para o triângulo apontando para cima (base no topo)
          const pointsUp = `50 0, 0 ${triangleHeight}, 100 ${triangleHeight}`;
          // Pontos para o triângulo apontando para baixo (ápice no topo)
          const pointsDown = `50 ${triangleHeight}, 0 0, 100 0`;

          // Alternar triângulos para cima e para baixo para formar o padrão da imagem
          const isPointingUp = (row + col) % 2 === 0; // Alterna entre triângulo para cima/baixo
          const currentPoints = isPointingUp ? pointsUp : pointsDown;

          // Intercalar cores
          const colorIndex = (i % TRIANGLE_COLORS.length);
          const currentColor = TRIANGLE_COLORS[colorIndex];

          return (
            <svg
              key={i}
              className="animated-triangle-shape"
              viewBox={`0 0 100 ${triangleHeight}`} // ViewBox com altura do triângulo
              preserveAspectRatio="xMidYMin slice"
              style={{
                width: triangleBase,
                height: triangleHeight,
                position: 'relative', // Para o translateY
                top: translateY, // Ajuste de posição vertical
                left: col * triangleBase, // Posição horizontal no grid
                // Transform para o snap das linhas (se necessário, o grid pode já cuidar disso)
                // transform: `translateX(${(row % 2 !== 0 ? -triangleBase / 2 : 0)}px)`
              }}
            >
              <AnimatedPolygon points={currentPoints} color={currentColor} delay={i * 0.05} />
            </svg>
          );
        })}
      </div>
    </div>
  );
}