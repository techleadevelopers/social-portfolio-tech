import { Github, Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

// Importe os ícones do Lucide-React que você deseja usar para a navegação
import {
  LayoutDashboard, // Para Overview
  Code,            // Para Repositories (ou GitFork, GitPullRequestClosed)
  FolderKanban,    // Para Projects (ou Kanban, ListChecks)
  Rocket,          // Para Carreira (ou Briefcase, GraduationCap)
  Brain,           // Para Skills (ou Zap, Hexagon, Cpu)
} from "lucide-react";

interface GitHubHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function GitHubHeader({ activeSection, onSectionChange }: GitHubHeaderProps) {
  const [location, setLocation] = useLocation();

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/" },
    { id: "repositories", label: "Repositories", icon: Code, path: "/" },
    { id: "projects", label: "Projects", icon: FolderKanban, path: "/projects" },
    { id: "career", label: "Carreira", icon: Rocket, path: "/career" },
    { id: "skills", label: "Skills", icon: Brain, path: "/skills" },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.path !== "/" && item.path !== location) {
      setLocation(item.path);
      onSectionChange(item.id);
    } else if (item.path === "/" && activeSection !== item.id) {
      setLocation("/");
      onSectionChange(item.id);
    }
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const IconComponent = item.icon;
    const isActive = (location === item.path && (item.path === "/career" || item.path === "/projects" || item.path === "/skills")) || (item.path === "/" && activeSection === item.id);

    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item)}
        className={`nav-link relative px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
          isActive
            ? "text-blue-400 border-b-2 border-blue-400"
            : "text-github-muted hover:text-blue-300"
        }`}
      >
        <IconComponent className="w-5 h-5 mr-2 neon-glow animated-neon reflection-3d icon-3d-effect" />
        {item.label}
      </button>
    );
  };

  return (
    <header className="glass-effect border-b border-github-border sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center logo-github-icon-reflection">
              <Github className="w-8 h-8 text-blue-400 modern-icon icon-3d-effect animate-logo-pulse animate-logo-rotate neon-glow" />
            </div>
            <span className="text-xl font-semibold text-github-text hero-name text-shadow-glow">
              techleadevelopers
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-github-muted modern-icon drop-shadow-3d" />
              <Input
                type="text"
                placeholder="Search repositories..."
                value={""}
                onChange={() => {}}
                className="w-full pl-10 bg-github-surface border-github-border text-github-text placeholder-github-muted focus:border-github-success"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>

          {/* Action Buttons - APLICANDO MAIS ESPAÇAMENTO À ESQUERDA AQUI */}
          <div className="flex items-center space-x-6 ml-12"> {/* Aumentado ml-auto para ml-12 para um espaçamento fixo maior */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-github-muted hover:text-blue-400 hover:bg-github-surface transition-all duration-300 shadow-3d-deep"
            >
              <Bell className="w-4 h-4 modern-icon drop-shadow-3d" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-github-muted hover:text-blue-400 hover:bg-github-surface transition-all duration-300 shadow-3d-deep"
            >
              <Plus className="w-4 h-4 modern-icon drop-shadow-3d" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}