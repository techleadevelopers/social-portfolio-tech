// client/src/components/GravityPlanets.tsx

import React, { useRef, useEffect, useState, useCallback } from 'react';

// OPTIONS (ajustáveis para o efeito desejado)
const maxplanetspeed = 10;
const minplanetspeed = 10;
const minplanetradius = 2;
const maxplanetradius = 6;
const gravity = 0.5;
const numplanets = 9;
const mainplanetradius = 20;
const maxtrail = 10;
const infinitetrail = false;

// CLASSE Planet: AGORA É UMA CLASSE PARA SER INSTANCIADA COM 'new'
class Planet { // Mudança de interface para class
  x: number;
  y: number;
  s: number; // speed
  vx: number;
  vy: number;
  r: number = 0; // Inicializado com 0
  g: number = 0; // Inicializado com 0
  b: number = 0; // Inicializado com 0
  a: number = 250; // Inicializado com 250
  radius: number;
  tochange: boolean = false; // Inicializado com false
  infront: boolean = true; // Inicializado com true
  trail: number[][] = []; // Inicializado como array vazio
  lastvx?: number;

  constructor(x: number, y: number, s: number, radius: number) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.vx = Math.random() * s;
    this.vy = Math.random() * s;
    this.radius = radius;
  }
}

const GravityPlanets: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(0);
  const animationFrameId = useRef<number>();
  const lastUpdate = useRef<number>((new Date()).getTime() - 1);

  // Variáveis do jogo
  const planets = useRef<Planet[]>([]);
  const center = useRef<number[]>([0, 0]); // Será atualizado no resize
  const canvasW = useRef<number>(0);
  const canvasH = useRef<number>(0);

  // Utility function
  const random = useCallback((from: number, to: number) => {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }, []);

  // Function to draw a single planet (small or main)
  const drawPlanet = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    alpha: number,
    isMainPlanet: boolean = false
  ) => {
    if (x >= 0 && x < canvasW.current && y >= 0 && y < canvasH.current) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      
      // Cor para o planeta principal (se for o caso)
      if (isMainPlanet) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')'; // Planeta principal branco
      } else {
        // Cor para os planetas pequenos (preto translúcido para que o fundo apareça)
        ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
      }
      ctx.fill();
    }
  }, [canvasW, canvasH]);

  // Initialize planets
  const initPlanets = useCallback(() => {
    planets.current = [];
    for (let i = 0; i < numplanets; i++) {
      // Usamos 'new Planet' corretamente agora que é uma classe
      var p = new Planet( 
        random(0, canvasW.current),
        random(0, canvasH.current),
        minplanetspeed + random(0, maxplanetspeed - minplanetspeed),
        minplanetradius + random(0, maxplanetradius - minplanetradius)
      );
      planets.current.push(p);
    }
  }, [random]);

  // Main animation loop
  const intervalHandler = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nowTime = (new Date()).getTime();
    const thisFrameFPS = 1000 / (nowTime - lastUpdate.current);
    setFps(prevFps => (prevFps + (thisFrameFPS - prevFps) / (1000 / 60))); // Smoothed FPS
    lastUpdate.current = nowTime;

    // Clear canvas for next frame (important for trails)
    ctx.clearRect(0, 0, canvasW.current, canvasH.current);

    // Draw main planet (the central point of gravity)
    drawPlanet(ctx, center.current[0], center.current[1], mainplanetradius, 1, true);

    for (let i = 0; i < planets.current.length; i++) {
      const p = planets.current[i];

      // Draw trails
      for (let t = 0; t < p.trail.length; t++) {
        const tr = p.trail[t];
        const alpha = infinitetrail ? 1 : 0.8 - (t * 1 / maxtrail);
        drawPlanet(ctx, tr[0], tr[1], tr[2], alpha);
      }
      
      // Draw the planet itself
      drawPlanet(ctx, p.x, p.y, p.radius, 1);

      // Physics calculations
      const dx = center.current[0] - p.x;
      const dy = center.current[1] - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Collision/state change logic (from original code, might not be visually obvious)
      if (dist <= mainplanetradius + p.radius && !p.tochange) {
        p.tochange = true;
      } else if (dist > mainplanetradius && p.tochange) {
        p.tochange = false; // This 'tochange' refers to the planet's own flag, not a global one
        p.infront = !p.infront; // Toggles infront/behind, but not visually implemented here
      }

      const movex = dx / dist;
      const movey = dy / dist;

      p.vx += movex * gravity;
      p.vy += movey * gravity;

      // Limit speed
      if (Math.sqrt(p.vx * p.vx + p.vy * p.vy) > p.s) {
        const ratio = p.s / Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        p.vx *= ratio;
        p.vy *= ratio;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.lastvx = p.vx; // Store last velocity (from original code)

      // Manage trail length
      if (p.trail.length < maxtrail || infinitetrail) {
        p.trail.unshift([p.x, p.y, p.radius]);
      } else {
        if (p.trail.length > maxtrail + 1) p.trail = []; // Reset if too long (bug in original?)
        else p.trail.pop();
      }
    }

    animationFrameId.current = requestAnimationFrame(intervalHandler);
  }, [drawPlanet, random]);

  // Effect for canvas initialization and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler
    const updateCanvasDimensions = () => {
      canvasW.current = window.innerWidth;
      canvasH.current = window.innerHeight;
      canvas.width = canvasW.current;
      canvas.height = canvasH.current;
      center.current = [canvasW.current / 2, canvasH.current / 2]; // Center the main planet
      initPlanets(); // Re-initialize planets on resize for new positions
    };

    // Click handler for main planet repositioning
    const handleClick = (e: MouseEvent) => {
      center.current = [e.clientX, e.clientY];
    };

    // Initial setup
    updateCanvasDimensions(); // Set initial size and center
    initPlanets(); // Initialize planets for the first time

    // Event listeners
    window.addEventListener('resize', updateCanvasDimensions);
    canvas.addEventListener('click', handleClick);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(intervalHandler);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initPlanets, intervalHandler]); // Dependencies

  return (
    <div className="fixed inset-0 z-20 pointer-events-none"> {/* Z-index alto para ficar acima do conteúdo */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          // Fundo transparente para que o background do portfólio apareça
          backgroundColor: 'transparent',
        }}
      />
      {/* O elemento FPS também está no div wrapper, para que o pointer-events-none afete ambos */}
      <div id="fps" className="text-white text-sm p-1 fixed top-0 left-0 pointer-events-none">
        {fps.toFixed(1)} fps
      </div>
    </div>
  );
};

export default GravityPlanets;