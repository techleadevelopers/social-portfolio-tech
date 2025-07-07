import { useState } from "react";
import {
  Code,
  ExternalLink,
  Github,
  Star,
  GitFork,
  Calendar,
  Zap,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Shield,
  TrendingUp,
  Filter,
  Search,
  // NOVO: Importe os ícones do Lucide-React que você usará nos cards de projeto
  // Baseado nos seus emojis e categorias
  Rocket,      // Para "SalesEngine AI Pro" (🚀)
  BookOpen,    // Para "AI School Language Platform" (🌍 - alternative for Globe/Education)
  Bolt,        // Para "Spring Cloud Microservices" (⚡ - alternative for Zap/Backend)
  HandCoins,   // Para "DeFi Security Framework" (🛡️ - alternative for Shield/Blockchain)
  Bot,         // Para "HyperAgents IA Engine" (🤖)
  Gamepad,     // Para "Arena Brasil Battle Royale" (🎮)
  Laptop,      // Ícone genérico para tecnologias ou projetos
  Briefcase,   // Ícone para carreira ou soluções
  Network,     // Para microsserviços ou conectividade
  Lock,        // Para segurança/blockchain
  Users,       // Para usuários/comunidade
  Palette,     // Para design/UI
  Server,      // Para backend/infra
} from "lucide-react"; // Verifique se todos esses ícones estão disponíveis na sua versão de lucide-react

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GitHubHeader from "@/components/github-header";

// Definindo os projetos com um novo campo 'iconComponent'
// ou usando 'image' como uma string que mapearemos para o componente de ícone Lucide
const projects = [
  {
    id: 1,
    title: "SalesEngine AI Pro",
    description: "Plataforma SaaS de otimização de vendas e marketing com inteligência artificial avançada. Sistema completo de automação de leads, análise preditiva e CRM inteligente.",
    technologies: ["TypeScript", "React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "AWS"],
    category: "SaaS",
    status: "Produção",
    github: "https://github.com/techleadevelopers/sales-engine-ai-pro",
    demo: "https://salesengine-ai.demo.com",
    image: "Rocket", // Alterado de "🚀" para string que mapearemos
    stats: {
      stars: 45,
      forks: 12,
      users: "10k+"
    },
    highlights: [
      "IA para análise de comportamento de leads",
      "ROI médio de 300% para clientes",
      "Integração com 50+ plataformas",
      "Dashboard analytics em tempo real"
    ]
  },
  {
    id: 2,
    title: "AI School Language Platform",
    description: "Plataforma educacional inovadora para aprendizado de idiomas usando IA local com Whisper e Mistral. Gamificação, correção de fala em tempo real e app mobile.",
    technologies: ["React Native", "TypeScript", "Whisper AI", "Mistral", "Expo", "Firebase", "Node.js"],
    category: "Education",
    status: "Produção",
    github: "https://github.com/techleadevelopers/ai-school-language-app",
    demo: "https://ai-language.demo.com",
    image: "Globe", // Alterado de "🌍" para string que mapearemos
    stats: {
      stars: 78,
      forks: 23,
      users: "50k+"
    },
    highlights: [
      "IA local para correção de pronúncia",
      "Gamificação completa com conquistas",
      "Suporte a 15+ idiomas",
      "App mobile multiplataforma"
    ]
  },
  {
    id: 3,
    title: "Spring Cloud Microservices",
    description: "Arquitetura completa de microsserviços para gerenciamento de pedidos usando Spring Cloud. Sistema distribuído, resiliente e escalável.",
    technologies: ["Java", "Spring Boot", "Spring Cloud", "Docker", "Kubernetes", "PostgreSQL", "RabbitMQ"],
    category: "Backend",
    status: "Produção",
    github: "https://github.com/techleadevelopers/spring-cloud-stack-order",
    demo: "https://microservices.demo.com",
    image: "Zap", // Alterado de "⚡" para string que mapearemos (ou Bolt, Network, Server)
    stats: {
      stars: 34,
      forks: 8,
      users: "5k+"
    },
    highlights: [
      "Arquitetura de microsserviços resiliente",
      "Service mesh com Istio",
      "Auto-scaling dinâmico",
      "Monitoramento com Prometheus"
    ]
  },
  {
    id: 4,
    title: "DeFi Security Framework",
    description: "Framework avançado para análise de segurança em contratos inteligentes DeFi. Ferramentas de auditoria automatizada e detecção de vulnerabilidades.",
    technologies: ["Solidity", "Python", "Web3.js", "Hardhat", "Slither", "Go", "Docker"],
    category: "Blockchain",
    status: "Beta",
    github: "https://github.com/techleadevelopers/explored-contract-exploit",
    demo: "https://defi-security.demo.com",
    image: "Shield", // Alterado de "🛡️" para string que mapearemos (ou HandCoins, Lock)
    stats: {
      stars: 89,
      forks: 34,
      users: "2k+"
    },
    highlights: [
      "Detecção automática de vulnerabilidades",
      "Análise de reentrância e overflow",
      "Relatórios de auditoria automatizados",
      "Integração com frameworks de teste"
    ]
  },
  {
    id: 5,
    title: "HyperAgents IA Engine",
    description: "Plataforma SaaS modular e multi-tenant para criação, gestão e automação de agentes inteligentes com integração avançada via WhatsApp.",
    technologies: ["Next.js", "TypeScript", "OpenAI", "WhatsApp API", "PostgreSQL", "Redis", "Docker"],
    category: "AI/SaaS",
    status: "Desenvolvimento",
    github: "https://github.com/techleadevelopers/next-agents-pro-sass",
    demo: "https://hyperagents.demo.com",
    image: "Bot", // Alterado de "🤖" para string que mapearemos
    stats: {
      stars: 56,
      forks: 15,
      users: "1k+"
    },
    highlights: [
      "Multi-tenant com isolamento completo",
      "Agentes IA conversacionais",
      "Integração WhatsApp Business",
      "Dashboard de analytics avançado"
    ]
  },
  {
    id: 6,
    title: "Arena Brasil Battle Royale",
    description: "Jogo mobile Battle Royale ambientado no Brasil, desenvolvido em Unity com C#. Foco no mercado brasileiro com elementos culturais únicos.",
    technologies: ["C#", "Unity", "Photon", "Firebase", "Blender", "Adobe Creative Suite"],
    category: "Gaming",
    status: "Desenvolvimento",
    github: "https://github.com/techleadevelopers/fire-brazilian-battle-urban",
    demo: "https://arena-brasil.demo.com",
    image: "Gamepad", // Alterado de "🎮" para string que mapearemos
    stats: {
      stars: 23,
      forks: 7,
      users: "500+"
    },
    highlights: [
      "Mapas baseados em cidades brasileiras",
      "Sistema de clãs e torneios",
      "Monetização com NFTs",
      "Multiplayer até 100 jogadores"
    ]
  }
];

const categories = ["Todos", "SaaS", "Education", "Backend", "Blockchain", "AI/SaaS", "Gaming"];
const statusOptions = ["Todos", "Produção", "Beta", "Desenvolvimento"];

// NOVO: Função auxiliar para obter o componente de ícone Lucide
const getProjectMainIcon = (iconName: string) => {
  // Mapeia o nome da string para o componente Lucide
  const IconMap: { [key: string]: React.ElementType } = {
    Rocket: Rocket,
    Globe: Globe,
    Zap: Zap,
    Shield: Shield,
    Bot: Bot,
    Gamepad: Gamepad,
    // Adicione mais mapeamentos se seus projetos tiverem outros ícones
    // Ex: 'Code': Code, 'Database': Database, 'Cloud': Cloud, etc.
  };
  return IconMap[iconName] || Code; // Retorna o componente, ou Code como padrão
};

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filterProjects = (category: string, status: string, search: string) => {
    let filtered = projects;

    if (category !== "Todos") {
      filtered = filtered.filter(project => project.category === category);
    }

    if (status !== "Todos") {
      filtered = filtered.filter(project => project.status === status);
    }

    if (search) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProjects(category, selectedStatus, searchTerm);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterProjects(selectedCategory, status, searchTerm);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    filterProjects(selectedCategory, selectedStatus, search);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Produção": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Beta": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Desenvolvimento": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-github-border text-github-muted";
    }
  };

  // Esta função já retorna um componente Lucide, mas para a categoria
  // Será usada apenas nos filtros, não no cabeçalho do card
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "SaaS": return <Cloud className="w-4 h-4" />;
      case "Education": return <Globe className="w-4 h-4" />;
      case "Backend": return <Database className="w-4 h-4" />;
      case "Blockchain": return <Shield className="w-4 h-4" />;
      case "AI/SaaS": return <Zap className="w-4 h-4" />;
      case "Gaming": return <Smartphone className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-github-bg">
      <GitHubHeader
        activeSection="projects"
        onSectionChange={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mt-12 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold hero-text mb-4">
            Projetos & Soluções
          </h1>
          <p className="text-1xl text-github-muted max-w-3xl mx-auto">
            Explore meu portfólio de projetos inovadores em IA, SaaS, blockchain e desenvolvimento full-stack.
            Cada projeto representa anos de experiência e dedicação à excelência técnica.
          </p>
        </div>

        {/* Filters */}
        <div className="morphism-card rounded-2xl p-6 mb-8 floating-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-github-muted" />
              <Input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-github-surface border-github-border text-github-text"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-github-text mb-2">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-github-success/20 text-github-success border border-github-success/30"
                        : "bg-github-surface text-github-muted hover:text-github-success"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-github-text mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedStatus === status
                        ? "bg-github-success/20 text-github-success border border-github-success/30"
                        : "bg-github-surface text-github-muted hover:text-github-success"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            // NOVO: Obtém o componente do ícone Lucide
            const IconComponent = getProjectMainIcon(project.image);
            return (
              <div
                key={project.id}
                className="morphism-card rounded-2xl p-8 floating-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {/* NOVO: Renderiza o componente Lucide com as classes de efeito */}
                    <div className="text-4xl text-blue-400 neon-glow animated-neon reflection-3d">
                      <IconComponent className="w-full h-full" /> {/* Ícone Lucide */}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-github-text group-hover:text-github-success transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <div className="flex items-center space-x-1 text-github-muted">
                          {getCategoryIcon(project.category)}
                          <span className="text-sm">{project.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-github-muted mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-github-text mb-3">Destaques:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-github-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-github-muted">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-github-text mb-3">Tecnologias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge px-3 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6 text-sm text-github-muted">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" /> {/* Usando Users para "usuários" */}
                      <span>{project.stats.users} usuários</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-github-success text-github-success hover:bg-github-success hover:text-white"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Código
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-github-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-github-text mb-2">Nenhum projeto encontrado</h3>
            <p className="text-github-muted">Tente ajustar os filtros ou termo de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}