import { useState, useEffect } from "react";
import GitHubHeader from "@/components/github-header";
import ProfileSidebar from "@/components/profile-sidebar";
import PinnedRepositories from "@/components/pinned-repositories";
import ContributionGraph from "@/components/contribution-graph";
import RecentActivity from "@/components/recent-activity";
import TypingText from "@/components/typing-text";
import { Download, Mail, Code, Zap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import CanvasBackground from "@/components/CanvasBackground"; // Importação do seu novo componente CanvasBackground

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  // Lógica das partículas (movida de TypingText para Home)
  const particlesCount = 30; // Aumentei o número de partículas para serem mais visíveis no fundo
  const particles = Array.from({ length: particlesCount }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${(Math.random() * 5) + 3}px`, // Tamanho de 3px a 8px
    animationDelay: `${Math.random() * 5}s`, // Atraso aleatório
    animationDuration: `${(Math.random() * 10) + 10}s`, // Duração da animação de 10s a 20s
    opacity: `${(Math.random() * 0.2) + 0.05}`, // Opacidade entre 0.05 e 0.25 para ser sutil e confortável
  }));

  // Ocultar a barra de rolagem se houver conteúdo flutuante que a ative
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-github-bg relative overflow-hidden">
      {/* NOVO FUNDO CANVAS 2D - INÍCIO */}
      {/* O CanvasBackground é colocado com z-index 0 e pointer-events-none para ficar no fundo e não bloquear interações. */}
      <CanvasBackground /> {/* Adição do componente CanvasBackground */}
      {/* NOVO FUNDO CANVAS 2D - FIM */}

      {/* PARTÍCULAS NO FUNDO DA HOME - INÍCIO */}
      {/* Mantido como solicitado, elas flutuarão sobre o CanvasBackground devido ao z-index 0. */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full bg-blue-400 blur-sm animate-float-subtle`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>
      {/* PARTÍCULAS NO FUNDO DA HOME - FIM */}

      {/* GitHubHeader e o restante do conteúdo precisarão de um z-index maior para ficarem acima do Canvas e das partículas CSS. */}
      <GitHubHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"> {/* z-index 10 para o conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <section className="card-hover-effects reflection-effect rounded-2xl p-10 floating-card animate-slide-up relative overflow-hidden card-3d shadow-3d-deep">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 pointer-events-none"></div>

              <div className="text-center relative z-10">
                <div className="mb-6">
                 
                  <div className="text-xl md:text-xl font-semibold text-github-text">
                    <TypingText
                      // AJUSTE AQUI: QUEBRANDO AS FRASES PARA FICAREM MAIS CURTAS POR LINHA
                      texts={[
                        "Um Senior Tech Lead com expertise em arquiteturas escaláveis.",
                        "Liderança de equipes de alta performance.",
                        "Especialista em Full-Stack Development.",
                        "Construindo soluções robustas do front ao back.",
                        "Arquiteto de Soluções com foco em Inteligência Artificial e Machine Learning.",
                        "Transformando ideias em realidade.",
                        "Líder Técnico apaixonado por inovação.",
                        "Desenvolvimento de times de engenharia de ponta."
                      ]}
                      speed={80}
                      deleteSpeed={40}
                      pauseTime={2000} // Ajustei para 2000ms para um respiro entre frases curtas
                      withParticles={false}
                    />
                  </div>
                </div>

                {/* About Me Section */}
                <div className="max-w-6xl mx-auto mb-8">
                  <p className="text-sm  text-github-muted mb-6 leading-relaxed">
                    Especialista em arquiteturas escaláveis, inteligência artificial e liderança técnica.
                    Construindo o futuro da tecnologia com soluções inovadoras e equipes de alto desempenho.
                  </p>

                  {/* Expertise Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="stats-card rounded-xl p-4 text-center floating-card shadow-3d-deep">
                      <Code className="w-6 h-6 text-github-success mx-auto mb-2 modern-icon drop-shadow-3d" />
                      <h3 className="font-semibold text-github-text">Full-Stack</h3>
                      <p className="text-sm text-github-muted">Development</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center floating-card shadow-3d-deep">
                      <Zap className="w-6 h-6 text-github-success mx-auto mb-2 modern-icon drop-shadow-3d" />
                      <h3 className="font-semibold text-github-text">AI/ML</h3>
                      <p className="text-sm text-github-muted">Specialist</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center floating-card shadow-3d-deep">
                      <Users className="w-6 h-6 text-github-success mx-auto mb-2 modern-icon drop-shadow-3d" />
                      <h3 className="font-semibold text-github-text">Tech Lead</h3>
                      <p className="text-sm text-github-muted">Leadership</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center floating-card shadow-3d-deep">
                      <Award className="w-6 h-6 text-github-success mx-auto mb-2 modern-icon drop-shadow-3d" />
                      <h3 className="font-semibold text-github-text">Solutions</h3>
                      <p className="text-sm text-github-muted">Architect</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-3d-deep">
                    <Download className="mr-3 w-4 h-4 modern-icon drop-shadow-3d" />
                    Download CV
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-3d-deep">
                    <Mail className="mr-3 w-5 h-5 modern-icon drop-shadow-3d" />
                    Entre em Contato
                  </Button>
                </div>
              </div>

              
            </section>

            {/* Pinned Repositories */}
            <PinnedRepositories />

            {/* Contribution Graph */}
            <ContributionGraph />

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Advanced Floating Background Elements */}
      {/* Estes elementos também flutuarão sobre o CanvasBackground, mas abaixo do conteúdo principal, pois o CanvasBackground e as partículas CSS têm z-index 0. */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 floating-element opacity-10 animate-float">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full blur-2xl shadow-3d-deep" />
        </div>

        <div className="absolute top-40 right-20 w-32 h-32 floating-element opacity-8 animate-float" style={{ animationDelay: '-2s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-400/25 to-blue-700/15 rounded-lg blur-2xl shadow-3d-deep" />
        </div>

        <div className="absolute bottom-32 left-1/4 w-28 h-28 floating-element opacity-8 animate-float" style={{ animationDelay: '-4s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-blue-500/25 rounded-xl blur-2xl shadow-3d-deep" />
        </div>

        <div className="absolute top-1/2 right-1/4 w-24 h-24 floating-element opacity-6 animate-float" style={{ animationDelay: '-6s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-blue-800/15 rounded-2xl blur-2xl shadow-3d-deep" />
        </div>

        <div className="absolute bottom-20 right-10 w-36 h-36 floating-element opacity-8 animate-float" style={{ animationDelay: '-3s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-700/25 to-blue-400/20 rounded-full blur-2xl shadow-3d-deep" />
        </div>
      </div>
    </div>
  );
}