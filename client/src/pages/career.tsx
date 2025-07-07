import { useState } from "react";
import { 
  Building2, 
  Calendar, 
  Award, 
  Code, 
  Database, 
  Cloud, 
  Users, 
  Lightbulb,
  Target,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Star,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GitHubHeader from "@/components/github-header";

const menuItems = [
  { id: "experience", label: "Experiência", icon: Briefcase },
  { id: "skills", label: "Habilidades", icon: Code },
  { id: "architecture", label: "Arquitetura", icon: Database },
  { id: "solid", label: "SOLID", icon: Target },
  { id: "education", label: "Educação", icon: GraduationCap },
  { id: "achievements", label: "Conquistas", icon: Award },
];

const experiences = [
  {
    id: 1,
    company: "Tech Innovations Corp",
    position: "Senior Tech Lead",
    period: "2023 - Presente",
    description: "Liderança técnica de equipes multi-disciplinares, arquitetura de soluções escaláveis e implementação de práticas DevOps avançadas.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes"],
    achievements: [
      "Aumentou a performance da aplicação em 300%",
      "Reduziu custos de infraestrutura em 40%",
      "Liderou equipe de 12 desenvolvedores",
      "Implementou CI/CD completo"
    ]
  },
  {
    id: 2,
    company: "Digital Solutions Ltd",
    position: "Full-Stack Architect",
    period: "2021 - 2023",
    description: "Desenvolvimento de arquiteturas de microsserviços, implementação de soluções de IA e liderança de projetos estratégicos.",
    technologies: ["Python", "Java", "Spring Boot", "PostgreSQL", "Redis", "Machine Learning"],
    achievements: [
      "Desenvolveu 5 sistemas de IA em produção",
      "Migrou monolito para microsserviços",
      "Implementou analytics em tempo real",
      "Treinou 20+ desenvolvedores"
    ]
  },
  {
    id: 3,
    company: "StartupTech Hub",
    position: "Lead Developer",
    period: "2019 - 2021",
    description: "Desenvolvimento de produtos SaaS do zero, implementação de metodologias ágeis e crescimento técnico da startup.",
    technologies: ["Vue.js", "PHP", "Laravel", "MySQL", "MongoDB", "Firebase"],
    achievements: [
      "Lançou 3 produtos SaaS bem-sucedidos",
      "Escalou aplicação para 100k+ usuários",
      "Implementou Scrum e XP",
      "Contratou e treinou equipe técnica"
    ]
  }
];

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React/Next.js", level: 95, experience: "5+ anos" },
      { name: "TypeScript", level: 90, experience: "4+ anos" },
      { name: "Vue.js", level: 85, experience: "3+ anos" },
      { name: "Tailwind CSS", level: 92, experience: "3+ anos" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 95, experience: "5+ anos" },
      { name: "Python", level: 88, experience: "4+ anos" },
      { name: "Java/Spring", level: 85, experience: "3+ anos" },
      { name: "C#/.NET", level: 80, experience: "2+ anos" }
    ]
  },
  {
    title: "DevOps/Cloud",
    skills: [
      { name: "AWS", level: 90, experience: "4+ anos" },
      { name: "Docker/K8s", level: 88, experience: "3+ anos" },
      { name: "CI/CD", level: 92, experience: "4+ anos" },
      { name: "Terraform", level: 75, experience: "2+ anos" }
    ]
  }
];

const architecturePatterns = [
  {
    name: "Microservices",
    description: "Implementação de arquiteturas distribuídas escaláveis",
    projects: 8,
    complexity: "Avançado"
  },
  {
    name: "Event Sourcing",
    description: "Sistemas baseados em eventos para alta disponibilidade",
    projects: 5,
    complexity: "Expert"
  },
  {
    name: "CQRS",
    description: "Separação de responsabilidades entre leitura e escrita",
    projects: 6,
    complexity: "Avançado"
  },
  {
    name: "Domain-Driven Design",
    description: "Modelagem de domínios complexos com DDD",
    projects: 10,
    complexity: "Expert"
  }
];

const solidPrinciples = [
  {
    letter: "S",
    name: "Single Responsibility",
    description: "Uma classe deve ter apenas um motivo para mudar",
    example: "Separação de responsabilidades em serviços específicos"
  },
  {
    letter: "O",
    name: "Open/Closed",
    description: "Aberto para extensão, fechado para modificação",
    example: "Uso de interfaces e padrões Strategy/Factory"
  },
  {
    letter: "L",
    name: "Liskov Substitution",
    description: "Objetos podem ser substituídos por suas implementações",
    example: "Polimorfismo correto em hierarquias de classes"
  },
  {
    letter: "I",
    name: "Interface Segregation",
    description: "Interfaces específicas são melhores que uma geral",
    example: "Múltiplas interfaces pequenas e coesas"
  },
  {
    letter: "D",
    name: "Dependency Inversion",
    description: "Dependa de abstrações, não de implementações",
    example: "Injeção de dependência e IoC containers"
  }
];

export default function Career() {
  const [activeSection, setActiveSection] = useState("experience");

  const renderContent = () => {
    switch (activeSection) {
      case "experience":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-github-text mb-6">Experiência Profissional</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="morphism-card rounded-2xl p-8 floating-card">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-github-text mb-2">{exp.position}</h3>
                    <div className="flex items-center text-github-success mb-4">
                      <Building2 className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-github-muted">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <p className="text-github-muted mb-6 text-lg leading-relaxed">{exp.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sx font-semibold text-github-text mb-3">Principais Conquistas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-github-success mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-github-muted">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sx font-semibold text-github-text mb-3">Tecnologias Utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-badge px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "skills":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-github-text mb-6">Habilidades Técnicas</h2>
            {skillCategories.map((category) => (
              <div key={category.title} className="morphism-card rounded-2xl p-8 floating-card">
                <h3 className="text-2xl font-bold text-github-text mb-6 flex items-center">
                  <Code className="w-6 h-6 mr-3 text-github-success" />
                  {category.title}
                </h3>
                <div className="space-y-8">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-4 group">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-github-text text-lg">{skill.name}</span>
                        <span className="text-sm text-github-muted bg-github-surface px-3 py-1 rounded-full">{skill.experience}</span>
                      </div>
                      
                      {/* Advanced Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-github-border rounded-full h-4 overflow-hidden shadow-inner">
                          <div 
                            className="h-4 rounded-full relative overflow-hidden transition-all duration-1000 ease-out transform group-hover:scale-y-110"
                            style={{ 
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, 
                                hsl(210, 100%, 60%) 0%, 
                                hsl(210, 100%, 70%) 50%, 
                                hsl(210, 100%, 80%) 100%)`
                            }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />
                            
                            {/* Pulse effect */}
                            <div className="absolute right-0 top-0 w-2 h-full bg-white/40 animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Skill level indicator */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <span className="text-xs font-bold text-white drop-shadow-lg">{skill.level}%</span>
                        </div>
                        
                        {/* Futuristic glow effect */}
                        <div 
                          className="absolute top-0 left-0 h-4 rounded-full opacity-50 blur-sm transition-all duration-1000"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, 
                              hsl(210, 100%, 70%) 0%, 
                              hsl(210, 100%, 80%) 100%)`
                          }}
                        />
                      </div>
                      
                      {/* Skill metrics */}
                      <div className="flex justify-between text-xs text-github-muted">
                        <span>Proficiência: {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Avançado' : skill.level >= 60 ? 'Intermediário' : 'Básico'}</span>
                        <div className="flex space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(skill.level / 20) 
                                  ? 'bg-github-success' 
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
            ))}
          </div>
        );

      case "architecture":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-github-text mb-6">Padrões de Arquitetura</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {architecturePatterns.map((pattern) => (
                <div key={pattern.name} className="morphism-card rounded-2xl p-6 floating-card">
                  <div className="flex items-center mb-4">
                    <Database className="w-8 h-8 text-github-success mr-3" />
                    <h3 className="text-xl font-bold text-github-text">{pattern.name}</h3>
                  </div>
                  <p className="text-github-muted mb-4">{pattern.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-github-muted">Projetos: {pattern.projects}</span>
                    <span className="bg-github-success/20 text-github-success px-2 py-1 rounded-full">
                      {pattern.complexity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "solid":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-github-text mb-6">Princípios SOLID</h2>
            <div className="space-y-6">
              {solidPrinciples.map((principle) => (
                <div key={principle.letter} className="morphism-card rounded-2xl p-8 floating-card">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-br from-github-success to-github-success2 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                      <span className="text-2xl font-bold text-white">{principle.letter}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-github-text mb-2">{principle.name}</h3>
                      <p className="text-github-muted mb-4">{principle.description}</p>
                      <div className="flex items-center text-sm text-github-success">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        <span className="font-medium">Exemplo: </span>
                        <span className="ml-1">{principle.example}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-github-text mb-6">Formação e Certificações</h2>
            <div className="space-y-6">
              <div className="morphism-card rounded-2xl p-8 floating-card">
                <div className="flex items-center mb-6">
                  <GraduationCap className="w-8 h-8 text-github-success mr-3" />
                  <h3 className="text-2xl font-bold text-github-text">Educação</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-github-success pl-6">
                    <h4 className="text-xl font-semibold text-github-text">Bacharelado em Ciência da Computação</h4>
                    <p className="text-github-muted">Universidade Federal de Tecnologia • 2016 - 2020</p>
                    <p className="text-sm text-github-muted mt-2">Especialização em Engenharia de Software e Inteligência Artificial</p>
                  </div>
                </div>
              </div>

              <div className="morphism-card rounded-2xl p-8 floating-card">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-github-success mr-3" />
                  <h3 className="text-2xl font-bold text-github-text">Certificações</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "AWS Solutions Architect Professional",
                    "Google Cloud Professional Architect",
                    "Kubernetes Certified Administrator",
                    "Scrum Master Certified",
                    "Docker Certified Associate",
                    "Azure DevOps Engineer Expert"
                  ].map((cert) => (
                    <div key={cert} className="flex items-center">
                      <Star className="w-5 h-5 text-github-success mr-3" />
                      <span className="text-github-muted">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-github-text mb-6">Conquistas e Projetos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="morphism-card rounded-2xl p-6 floating-card text-center">
                <TrendingUp className="w-12 h-12 text-github-success mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-github-text mb-2">50+</h3>
                <p className="text-github-muted">Projetos Entregues</p>
              </div>
              
              <div className="morphism-card rounded-2xl p-6 floating-card text-center">
                <Users className="w-12 h-12 text-github-success mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-github-text mb-2">100+</h3>
                <p className="text-github-muted">Desenvolvedores Treinados</p>
              </div>
              
              <div className="morphism-card rounded-2xl p-6 floating-card text-center">
                <Zap className="w-12 h-12 text-github-success mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-github-text mb-2">5+</h3>
                <p className="text-github-muted">Anos de Liderança</p>
              </div>
            </div>

            <div className="morphism-card rounded-2xl p-8 floating-card">
              <h3 className="text-2xl font-bold text-github-text mb-6">Projetos Destacados</h3>
              <div className="space-y-6">
                {[
                  {
                    name: "SalesEngine AI Pro",
                    description: "Plataforma SaaS de otimização de vendas com IA",
                    impact: "300% aumento na conversão"
                  },
                  {
                    name: "Microservices E-commerce",
                    description: "Arquitetura distribuída para e-commerce de grande escala",
                    impact: "Suporta 1M+ usuários simultâneos"
                  },
                  {
                    name: "AI Language Learning Platform",
                    description: "Plataforma educacional com IA para aprendizado de idiomas",
                    impact: "50k+ estudantes ativos"
                  }
                ].map((project, index) => (
                  <div key={index} className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-github-success mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-github-text">{project.name}</h4>
                      <p className="text-github-muted text-sm">{project.description}</p>
                      <p className="text-github-success text-sm font-medium">{project.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-github-bg">
      <GitHubHeader 
        activeSection="career" 
        onSectionChange={() => {}} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 relative top-16">
            <div className="sticky top-8 morphism-card rounded-2xl p-6 floating-card">
              <h2 className="text-1xl font-bold text-github-text mb-6">Carreira</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-github-success/20 text-github-success border border-github-success/30"
                          : "text-github-muted hover:text-github-success hover:bg-github-surface"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}