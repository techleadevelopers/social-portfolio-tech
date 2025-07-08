import React, { useRef, useEffect } from 'react';

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // --- Configurações para Planeta Terra ---
    type PlanetData = {
      name: string;
      imageUrl: string;
      image?: HTMLImageElement; // Será carregada dinamicamente
      x: number;
      y: number;
      radius: number;
      rotationSpeed: number;
      currentRotation: number;
      tiltAngle: number; // Para simular uma inclinação 2D simples
    };

    // Apenas a Terra
    const planetsData: Omit<PlanetData, 'x' | 'y' | 'radius' | 'rotationSpeed' | 'currentRotation' | 'image' | 'tiltAngle'>[] = [
      { name: "earth", imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/332937/earth.jpg" },
    ];
    let loadedPlanets: PlanetData[] = [];

    const maxPlanetRadius = 150; // Tamanho da Terra
    const minPlanetRadius = 100;
    
    // Constantes para alinhamento da Terra na lateral
    const minVisibleFraction = 0.7; // Mínimo de 70% do raio da Terra deve estar visível
    const maxEdgeRandomOffset = 0.15; // A Terra pode se mover aleatoriamente até 15% da largura da tela para dentro da borda.

    const dpr = window.devicePixelRatio || 1; // Densidade de pixels do dispositivo

    // Função para criar/posicionar um planeta (a Terra, neste caso)
    const initializePlanet = (planetBase: typeof planetsData[0], width: number, height: number, isLeft: boolean): Promise<PlanetData> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = planetBase.imageUrl;
            img.onload = () => {
                const radius = Math.random() * (maxPlanetRadius - minPlanetRadius) + minPlanetRadius;
                
                let xPos: number;
                // LÓGICA DE ALINHAMENTO X
                if (isLeft) {
                    xPos = (radius * (1 - minVisibleFraction)) + (Math.random() * (width * maxEdgeRandomOffset));
                } else {
                    xPos = (width - (radius * (1 - minVisibleFraction))) - (Math.random() * (width * maxEdgeRandomOffset));
                }

                // Posicionamento Y: Centralizado, com alguma variação
                const yPos = Math.random() * height * 0.4 + height * 0.3; 

                resolve({
                    ...planetBase,
                    image: img,
                    x: xPos,
                    y: yPos,
                    radius: radius,
                    rotationSpeed: (Math.random() * 0.0005 + 0.0002) * (Math.random() < 0.5 ? 1 : -1), // Rotação lenta
                    currentRotation: Math.random() * Math.PI * 2,
                    tiltAngle: Math.random() * 0.1 - 0.05 // Pequeno tilt
                });
            };
            img.onerror = () => {
                console.error(`Failed to load planet image: ${planetBase.imageUrl}`);
                reject(new Error(`Failed to load ${planetBase.name} image.`));
            };
        });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Re-posiciona a Terra no resize
      if (loadedPlanets.length > 0) {
        const p = loadedPlanets[0]; // Apenas a Terra
        const isLeft = true; // A Terra será sempre na lateral esquerda
        p.radius = Math.random() * (maxPlanetRadius - minPlanetRadius) + minPlanetRadius; 
        
        // LÓGICA DE ALINHAMENTO X (MESMA QUE initializePlanet)
        p.x = (p.radius * (1 - minVisibleFraction)) + (Math.random() * (window.innerWidth * maxEdgeRandomOffset));
        
        p.y = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.3;
      }
    };

    // --- Início da Lógica Principal ---
    let planetsAreLoaded = false;
    // Carrega apenas a Terra na lateral esquerda (index 0)
    Promise.all([
        initializePlanet(planetsData[0], window.innerWidth, window.innerHeight, true), // A Terra será o primeiro e único planeta, à esquerda
    ]).then(planets => {
        loadedPlanets = planets;
        planetsAreLoaded = true;
    }).catch(error => {
        console.error("Error loading planet:", error);
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr); // Limpa apenas a Terra do frame anterior

      // --- Desenha a Terra (apenas se a imagem estiver carregada) ---
      if (planetsAreLoaded && loadedPlanets.length > 0) {
        const planet = loadedPlanets[0]; // A Terra
        if (!planet.image) return;

        // Rotação da superfície do planeta
        planet.currentRotation += planet.rotationSpeed;

        ctx.save();
        ctx.translate(planet.x, planet.y); // Move o contexto para o centro do planeta
        ctx.rotate(planet.tiltAngle); // Aplica a inclinação (tilt)

        // Cria um clipping mask circular para o planeta
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
        ctx.clip(); // Limita o desenho ao círculo

        // --- NOVO: Desenha a imagem como um círculo completo (AJUSTADO) ---
        // Calcula o offset X para simular a rotação da superfície
        // O offset deve ser calculado para cobrir a circunferência do planeta.
        // A imagem da Terra é 2:1, então a largura é o dobro da altura.
        // Para cobrir a circunferência, o offset deve se basear no diâmetro do planeta (radius * 2).
        const circumference = Math.PI * (planet.radius * 2);
        const imageWidthPerCircumference = planet.image.width / circumference;
        const rotationOffset = (planet.currentRotation / (Math.PI * 2)) * planet.image.width; // Offset X em pixels da imagem
        
        // Desenha a imagem usando drawImage diretamente, sem pattern,
        // para maior controle sobre como a imagem é mapeada e evitar costuras.
        // Vamos desenhar a imagem duas vezes, lado a lado, para garantir que cubra a circunferência
        // e evitar a linha branca na "costura".
        const dx = -planet.radius;
        const dy = -planet.radius;
        const dWidth = planet.radius * 2;
        const dHeight = planet.radius * 2;

        // Desenha a imagem principal
        ctx.drawImage(
            planet.image,
            (rotationOffset % planet.image.width), // sx: Ponto de partida X na imagem
            0,                                     // sy
            planet.image.width,                    // sWidth
            planet.image.height,                   // sHeight
            dx,                                    // dx
            dy,                                    // dy
            dWidth,                                // dWidth
            dHeight                                // dHeight
        );

        // Desenha a imagem novamente, à direita ou à esquerda da primeira, para preencher a lacuna
        // Isso é crucial para cobrir a "costura" que aparece quando a textura rotaciona
        if (rotationOffset % planet.image.width > 0) { // Se a textura está se movendo para a direita
            ctx.drawImage(
                planet.image,
                (rotationOffset % planet.image.width) - planet.image.width, // sx: Ponto de partida X (para o wrap-around)
                0,
                planet.image.width,
                planet.image.height,
                dx,
                dy,
                dWidth,
                dHeight
            );
        } else if (rotationOffset % planet.image.width < 0) { // Se a textura está se movendo para a esquerda
            ctx.drawImage(
                planet.image,
                (rotationOffset % planet.image.width) + planet.image.width, // sx: Ponto de partida X (para o wrap-around)
                0,
                planet.image.width,
                planet.image.height,
                dx,
                dy,
                dWidth,
                dHeight
            );
        }

        // --- Efeitos de Atmosfera e Sombra (AJUSTADOS) ---
        // Sombra lateral para profundidade
        const shadowGradient = ctx.createRadialGradient(
          planet.radius * -0.3, planet.radius * -0.3, planet.radius * 0.7, // Ponto de origem da luz
          0, 0, planet.radius * 1.0 // Ponto final da sombra
        );
        shadowGradient.addColorStop(0, 'rgba(0,0,0,0)');
        shadowGradient.addColorStop(0.5, 'rgba(0,0,0,0.1)'); // Sombra interna BEM SUTIL
        shadowGradient.addColorStop(1, 'rgba(0,0,0,0.3)');   // Borda mais escura, mas AINDA MAIS SUTIL

        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Brilho de atmosfera / Luz ambiente suave
        const atmosphereGradient = ctx.createRadialGradient(
          0, 0, planet.radius * 0.8,
          0, 0, planet.radius * 1.1
        );
        atmosphereGradient.addColorStop(0, 'transparent');
        atmosphereGradient.addColorStop(0.8, 'rgba(59, 130, 246, 0.05)'); // Azul sutil
        atmosphereGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = atmosphereGradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Restaura o estado do contexto
      }
      
      // Não há estrelas aqui, então apenas a Terra é desenhada e limpa a cada frame.
    };

    // Este listener é para o background-image estático.
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Define o tamanho inicial e o posicionamento da Terra

    // Inicia a animação da Terra
    const animateFrame = () => {
        draw();
        animationFrameId = requestAnimationFrame(animateFrame);
    };
    animateFrame(); // Começa o loop de animação.

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Executa apenas uma vez no mont do componente

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: "url('https://marclopezavila.github.io/planet-defense-game/img/space.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    />
  );
};

export default CanvasBackground;