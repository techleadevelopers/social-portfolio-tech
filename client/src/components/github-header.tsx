import { Github, Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

interface GitHubHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function GitHubHeader({ activeSection, onSectionChange }: GitHubHeaderProps) {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { id: "overview", label: "Overview", icon: "👤", path: "/" },
    { id: "repositories", label: "Repositories", icon: "📚", path: "/" },
    { id: "projects", label: "Projects", icon: "📋", path: "/projects" },
    { id: "career", label: "Carreira", icon: "🚀", path: "/career" },
    { id: "skills", label: "Skills", icon: "⚙️", path: "/skills" },
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    if (item.path !== "/") {
      setLocation(item.path);
    } else {
      setLocation("/");
      onSectionChange(item.id);
    }
  };

  return (
    <header className="glass-effect border-b border-github-border sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Github className="w-8 h-8 text-blue-400 modern-icon" />
              <span className="text-xl font-semibold text-github-text hero-name text-shadow-glow">
                TechLeaDevelopers
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-github-muted modern-icon" />
              <Input
                type="text"
                placeholder="Search repositories..."
                className="w-full pl-10 bg-github-surface border-github-border text-github-text placeholder-github-muted focus:border-github-success"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`nav-link relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  (location === item.path && (item.path === "/career" || activeSection === item.id))
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-github-muted hover:text-blue-300"
                }`}
              >
                <span className="mr-2 modern-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-github-muted hover:text-blue-400 hover:bg-github-surface transition-all duration-300"
            >
              <Bell className="w-4 h-4 modern-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-github-muted hover:text-blue-400 hover:bg-github-surface transition-all duration-300"
            >
              <Plus className="w-4 h-4 modern-icon" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
