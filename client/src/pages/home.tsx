import { useState } from "react";
import GitHubHeader from "@/components/github-header";
import ProfileSidebar from "@/components/profile-sidebar";
import PinnedRepositories from "@/components/pinned-repositories";
import ContributionGraph from "@/components/contribution-graph";
import RecentActivity from "@/components/recent-activity";
import TypingText from "@/components/typing-text";
import { Download, Mail, Code, Zap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-github-bg">
      <GitHubHeader 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <section className="card-hover-effects reflection-effect rounded-2xl p-10 floating-card animate-slide-up relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/10 pointer-events-none"></div>
              
              <div className="text-center relative z-10">
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl hero-name mb-4">
                    Paulo Silas de Campos Filho
                  </h1>
                  <div className="text-xl md:text-2xl font-semibold text-github-text">
                    <TypingText
                      texts={[
                        "Senior Tech Lead",
                        "Full-Stack Developer",
                        "AI Specialist",
                        "Solution Architect",
                        "Team Leader"
                      ]}
                      speed={120}
                      deleteSpeed={60}
                      pauseTime={2500}
                      withParticles={true}
                    />
                  </div>
                </div>

                {/* About Me Section */}
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-lg text-github-muted mb-6 leading-relaxed">
                    Especialista em arquiteturas escaláveis, inteligência artificial e liderança técnica. 
                    Construindo o futuro da tecnologia com soluções inovadoras e equipes de alto desempenho.
                  </p>
                  
                  {/* Expertise Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="stats-card rounded-xl p-4 text-center">
                      <Code className="w-8 h-8 text-github-success mx-auto mb-2" />
                      <h3 className="font-semibold text-github-text">Full-Stack</h3>
                      <p className="text-sm text-github-muted">Development</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center">
                      <Zap className="w-8 h-8 text-github-success mx-auto mb-2" />
                      <h3 className="font-semibold text-github-text">AI/ML</h3>
                      <p className="text-sm text-github-muted">Specialist</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center">
                      <Users className="w-8 h-8 text-github-success mx-auto mb-2" />
                      <h3 className="font-semibold text-github-text">Tech Lead</h3>
                      <p className="text-sm text-github-muted">Leadership</p>
                    </div>
                    <div className="stats-card rounded-xl p-4 text-center">
                      <Award className="w-8 h-8 text-github-success mx-auto mb-2" />
                      <h3 className="font-semibold text-github-text">Solutions</h3>
                      <p className="text-sm text-github-muted">Architect</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <Download className="mr-3 w-5 h-5" />
                    Download CV
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="mr-3 w-5 h-5" />
                    Entre em Contato
                  </Button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full animate-float blur-sm"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-lg animate-float blur-sm" style={{ animationDelay: '-2s' }}></div>
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
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 floating-element opacity-10 animate-float">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full blur-2xl" />
        </div>
        
        <div className="absolute top-40 right-20 w-32 h-32 floating-element opacity-8 animate-float" style={{ animationDelay: '-2s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-400/25 to-blue-700/15 rounded-lg blur-2xl" />
        </div>
        
        <div className="absolute bottom-32 left-1/4 w-28 h-28 floating-element opacity-8 animate-float" style={{ animationDelay: '-4s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-blue-500/25 rounded-xl blur-2xl" />
        </div>
        
        <div className="absolute top-1/2 right-1/4 w-24 h-24 floating-element opacity-6 animate-float" style={{ animationDelay: '-6s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-300/20 to-blue-800/15 rounded-2xl blur-2xl" />
        </div>
        
        <div className="absolute bottom-20 right-10 w-36 h-36 floating-element opacity-8 animate-float" style={{ animationDelay: '-3s' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-700/25 to-blue-400/20 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}
