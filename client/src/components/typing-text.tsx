import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  withParticles?: boolean; // Esta prop ainda existe, mas a renderização é removida.
}

export default function TypingText({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
  withParticles = false // A prop 'withParticles' não causará mais a renderização de partículas.
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      const fullText = texts[currentTextIndex];

      if (!isDeleting) {
        // Typing
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <div className={`relative ${className}`}>
      {/* SEÇÃO DE PARTÍCULAS REMOVIDA AQUI */}
      {/* {withParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-80 particle-animated-advanced"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 1.5}s`
              }}
            />
          ))}
        </div>
      )} */}
      <span className="relative z-10 inline-block">
        {/* APLICANDO CLASSE DE GLITCH AO TEXTO DIGITADO */}
        <span className="text-shadow-glow typing-text-glitch">{currentText}</span>
        {/* APLICANDO NOVA CLASSE DE ANIMAÇÃO AO CURSOR */}
        <span className="typing-cursor-animated text-blue-400 ml-1 text-shadow-glow">|</span>
      </span>
    </div>
  );
}