import React, { useRef, useEffect } from 'react';

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string; opacity: number }[] = [];
    const numParticles = 500; // Número de partículas
    const maxRadius = 2; // Tamanho máximo da partícula
    const minRadius = 0.5; // Tamanho mínimo da partícula
    const connectionDistance = 150; // Distância para conectar partículas

    // Função para ajustar o canvas ao tamanho da janela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Cria as partículas
    for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            // Modificação aqui:
            vx: (Math.random() - 0.5) * 0.5, // Velocidade X: -0.25 a +0.25 para movimento sutil em ambas as direções
            vy: (Math.random() * 0.5) + 0.5, // Velocidade Y: Sempre positiva (para baixo), entre 0.5 e 1.0 para velocidade controlada
            radius: Math.random() * (maxRadius - minRadius) + minRadius,
            color: '#60a5fa', // Cor azul suave
            opacity: Math.random() * 0.9 + 0.05, // Opacidade sutil
          });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];

        // Atualiza posição
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Mantém partículas dentro da tela
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Desenha a partícula
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(p1.color.slice(1, 3), 16)}, ${parseInt(p1.color.slice(3, 5), 16)}, ${parseInt(p1.color.slice(5, 7), 16)}, ${p1.opacity})`;
        ctx.fill();

        // Desenha linhas de conexão
        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(Math.pow(p1.x - p2.x, 22) + Math.pow(p1.y - p2.y, 22));

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${parseInt(p1.color.slice(1, 3), 16)}, ${parseInt(p1.color.slice(3, 5), 16)}, ${parseInt(p1.color.slice(5, 7), 16)}, ${(1 - dist / connectionDistance) * 0.05})`; // Opacidade da linha
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas(); // Define o tamanho inicial
    draw(); // Inicia a animação

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Executa apenas uma vez no mont do componente

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
};

export default CanvasBackground;