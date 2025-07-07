import { useState } from "react";
import { 
  Code, 
  Database, 
  Cloud, 
  Zap,
  Shield,
  Globe,
  Smartphone,
  GitBranch,
  Users,
  TrendingUp,
  Star,
  Award,
  Target,
  Lightbulb,
  Layers,
  Settings
} from "lucide-react";
import GitHubHeader from "@/components/github-header";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: Globe,
    description: "Interfaces modernas e responsivas",
    skills: [
      { name: "React/Next.js", level: 95, experience: "5+ anos", projects: 50, certification: true },
      { name: "TypeScript", level: 92, experience: "4+ anos", projects: 45, certification: true },
      { name: "Vue.js/Nuxt.js", level: 88, experience: "3+ anos", projects: 25, certification: false },
      { name: "Tailwind CSS", level: 94, experience: "3+ anos", projects: 40, certification: false },
      { name: "Sass/SCSS", level: 90, experience: "4+ anos", projects: 35, certification: false },
      { name: "Webpack/Vite", level: 85, experience: "3+ anos", projects: 30, certification: false }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: Database,
    description: "APIs robustas e escaláveis",
    skills: [
      { name: "Node.js", level: 96, experience: "5+ anos", projects: 60, certification: true },
      { name: "Python", level: 90, experience: "4+ anos", projects: 35, certification: true },
      { name: "Java/Spring", level: 87, experience: "3+ anos", projects: 20, certification: true },
      { name: "C#/.NET", level: 82, experience: "2+ anos", projects: 15, certification: false },
      { name: "Go", level: 75, experience: "1+ ano", projects: 8, certification: false },
      { name: "GraphQL", level: 88, experience: "3+ anos", projects: 25, certification: false }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: Smartphone,
    description: "Apps nativos e multiplataforma",
    skills: [
      { name: "React Native", level: 92, experience: "4+ anos", projects: 20, certification: true },
      { name: "Flutter", level: 78, experience: "2+ anos", projects: 8, certification: false },
      { name: "Swift", level: 65, experience: "1+ ano", projects: 5, certification: false },
      { name: "Kotlin", level: 70, experience: "1+ ano", projects: 6, certification: false }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: Cloud,
    description: "Infraestrutura e deployment",
    skills: [
      { name: "AWS", level: 92, experience: "4+ anos", projects: 40, certification: true },
      { name: "Docker/Kubernetes", level: 90, experience: "3+ anos", projects: 35, certification: true },
      { name: "Terraform", level: 85, experience: "2+ anos", projects: 20, certification: true },
      { name: "CI/CD", level: 94, experience: "4+ anos", projects: 50, certification: false },
      { name: "Azure", level: 78, experience: "2+ anos", projects: 15, certification: false },
      { name: "GCP", level: 75, experience: "1+ ano", projects: 10, certification: false }
    ]
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: Zap,
    description: "Machine Learning e IA",
    skills: [
      { name: "TensorFlow/Keras", level: 88, experience: "3+ anos", projects: 15, certification: true },
      { name: "PyTorch", level: 82, experience: "2+ anos", projects: 12, certification: false },
      { name: "OpenAI APIs", level: 95, experience: "2+ anos", projects: 25, certification: false },
      { name: "Langchain", level: 90, experience: "1+ ano", projects: 18, certification: false },
      { name: "Computer Vision", level: 75, experience: "2+ anos", projects: 8, certification: false },
      { name: "NLP", level: 85, experience: "3+ anos", projects: 20, certification: false }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    description: "Armazenamento e gestão de dados",
    skills: [
      { name: "PostgreSQL", level: 94, experience: "5+ anos", projects: 45, certification: true },
      { name: "MongoDB", level: 90, experience: "4+ anos", projects: 30, certification: false },
      { name: "Redis", level: 88, experience: "3+ anos", projects: 35, certification: false },
      { name: "Elasticsearch", level: 80, experience: "2+ anos", projects: 15, certification: false },
      { name: "MySQL", level: 85, experience: "4+ anos", projects: 25, certification: false },
      { name: "DynamoDB", level: 82, experience: "2+ anos", projects: 18, certification: false }
    ]
  }
];

const architecturalPrinciples = [
  {
    title: "Design Patterns",
    items: ["Singleton", "Factory", "Observer", "Strategy", "Repository", "MVC/MVP/MVVM"],
    level: 95
  },
  {
    title: "SOLID Principles",
    items: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"],
    level: 98
  },
  {
    title: "Clean Architecture",
    items: ["Hexagonal Architecture", "Domain-Driven Design", "Clean Code", "CQRS", "Event Sourcing"],
    level: 92
  },
  {
    title: "Microservices",
    items: ["Service Mesh", "API Gateway", "Circuit Breaker", "Event-Driven Architecture", "Distributed Systems"],
    level: 90
  }
];

const certifications = [
  { name: "AWS Solutions Architect Professional", issuer: "Amazon", year: 2023, level: "Professional" },
  { name: "Google Cloud Professional Architect", issuer: "Google", year: 2023, level: "Professional" },
  { name: "Kubernetes Certified Administrator", issuer: "CNCF", year: 2022, level: "Expert" },
  { name: "Scrum Master Certified", issuer: "Scrum Alliance", year: 2021, level: "Advanced" },
  { name: "Docker Certified Associate", issuer: "Docker", year: 2022, level: "Advanced" },
  { name: "TensorFlow Developer Certificate", issuer: "Google", year: 2023, level: "Professional" }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const currentCategory = skillCategories.find(cat => cat.id === selectedCategory);

  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-green-500 to-green-600";
    if (level >= 80) return "from-blue-500 to-blue-600";
    if (level >= 70) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getSkillLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Avançado";
    if (level >= 70) return "Intermediário";
    return "Básico";
  };

  return (
    <div className="min-h-screen bg-github-bg">
      <GitHubHeader 
        activeSection="skills" 
        onSectionChange={() => {}} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold hero-text mb-4">
            Habilidades & Expertise
          </h1>
          <p className="text-xl text-github-muted max-w-3xl mx-auto">
            Domínio técnico abrangente com foco em tecnologias modernas, arquitetura escalável 
            e práticas de desenvolvimento de classe mundial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="morphism-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-github-text mb-6">Categorias</h2>
                <div className="space-y-3">
                  {skillCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-github-success/20 text-github-success border border-github-success/30"
                            : "text-github-muted hover:text-github-success hover:bg-github-surface"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{category.title}</div>
                          <div className="text-xs opacity-75">{category.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="morphism-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-github-text mb-4">Estatísticas</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-github-success">50+</div>
                    <div className="text-sm text-github-muted">Tecnologias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-github-success">200+</div>
                    <div className="text-sm text-github-muted">Projetos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-github-success">6</div>
                    <div className="text-sm text-github-muted">Certificações</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Selected Category Skills */}
            {currentCategory && (
              <div className="morphism-card rounded-2xl p-8 floating-card">
                <div className="flex items-center mb-8">
                  <currentCategory.icon className="w-8 h-8 text-github-success mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold text-github-text">{currentCategory.title}</h2>
                    <p className="text-github-muted">{currentCategory.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {currentCategory.skills.map((skill, index) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-github-text">{skill.name}</h3>
                          {skill.certification && (
                            <Award className="w-5 h-5 text-yellow-500" title="Certificado" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-github-muted">
                          <span className="bg-github-surface px-3 py-1 rounded-full">{skill.experience}</span>
                          <span className="bg-github-surface px-3 py-1 rounded-full">{skill.projects} projetos</span>
                        </div>
                      </div>

                      {/* Advanced Progress Bar */}
                      <div className="relative mb-4">
                        {/* Background */}
                        <div className="w-full bg-github-border rounded-full h-6 overflow-hidden shadow-inner">
                          {/* Main Progress */}
                          <div 
                            className={`h-6 rounded-full relative overflow-hidden transition-all duration-1200 ease-out transform group-hover:scale-y-105 bg-gradient-to-r ${getSkillColor(skill.level)}`}
                            style={{ width: `${skill.level}%` }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer" />
                            
                            {/* Pulse indicators */}
                            <div className="absolute inset-0 flex items-center justify-end pr-2">
                              <div className="flex space-x-1">
                                {[...Array(Math.floor(skill.level / 20))].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1 h-4 bg-white/60 rounded-full animate-pulse"
                                    style={{ animationDelay: `${i * 200}ms` }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skill Level Label */}
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <span className="text-sm font-bold text-white drop-shadow-lg">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Skill Level Badge */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <span className="text-xs font-bold text-white drop-shadow-lg">
                            {getSkillLabel(skill.level)}
                          </span>
                        </div>

                        {/* Glow Effect */}
                        <div 
                          className={`absolute top-0 left-0 h-6 rounded-full opacity-50 blur-sm transition-all duration-1200 bg-gradient-to-r ${getSkillColor(skill.level)}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Skill Metrics */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4 text-github-muted">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>Nível {Math.ceil(skill.level / 20)}/5</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{skill.projects} projetos</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i < Math.floor(skill.level / 20) 
                                  ? 'bg-github-success shadow-lg' 
                                  : 'bg-github-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architectural Principles */}
            <div className="morphism-card rounded-2xl p-8 floating-card">
              <h2 className="text-3xl font-bold text-github-text mb-8 flex items-center">
                <Layers className="w-8 h-8 text-github-success mr-4" />
                Princípios Arquiteturais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {architecturalPrinciples.map((principle, index) => (
                  <div key={principle.title} className="group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-github-text">{principle.title}</h3>
                      <span className="text-lg font-bold text-github-success">{principle.level}%</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-github-border rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(principle.level)} transition-all duration-1000`}
                          style={{ width: `${principle.level}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {principle.items.map((item) => (
                        <span
                          key={item}
                          className="tech-badge px-2 py-1 rounded-full text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="morphism-card rounded-2xl p-8 floating-card">
              <h2 className="text-3xl font-bold text-github-text mb-8 flex items-center">
                <Award className="w-8 h-8 text-github-success mr-4" />
                Certificações
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={cert.name} className="flex items-center space-x-4 p-4 bg-github-surface rounded-xl group hover:bg-github-border transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-github-success to-github-success2 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-github-text group-hover:text-github-success transition-colors">
                        {cert.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-github-muted">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <span>{cert.year}</span>
                        <span>•</span>
                        <span className="text-github-success">{cert.level}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}