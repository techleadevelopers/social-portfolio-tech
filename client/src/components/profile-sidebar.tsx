import { MapPin, Link, Calendar, Users, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// CORREÇÃO: Usar useGitHubProfile conforme definido em use-github-data.ts
import { useGitHubProfile } from "@/hooks/use-github-data"; // Use o hook correto aqui!

export default function ProfileSidebar() {
  // Use o hook useGitHubProfile para buscar os dados do usuário do GitHub
  const { data: user, isLoading, isError, error } = useGitHubProfile(); // Adicione isError e error para melhor tratamento

  if (isLoading) {
    return (
      <div className="sticky top-24 space-y-6">
        <div className="glass-effect rounded-xl p-6">
          <div className="text-center space-y-4">
            <Skeleton className="w-32 h-32 rounded-full mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" /> {/* Adicionado mx-auto */}
            <Skeleton className="h-4 w-32 mx-auto" /> {/* Adicionado mx-auto */}
            <Skeleton className="h-4 w-40 mx-auto" /> {/* Adicionado mx-auto */}
          </div>
        </div>
      </div>
    );
  }

  // Tratamento de erro aprimorado
  if (isError) {
    return (
      <div className="sticky top-24">
        <div className="glass-effect rounded-xl p-6 text-center">
          <p className="text-red-500 mb-2">Erro ao carregar dados do perfil.</p>
          <p className="text-github-muted text-sm">Detalhes: {error?.message || "Erro desconhecido"}</p>
          <p className="text-github-muted text-sm mt-1">Verifique seu nome de usuário do GitHub em `use-github-data.ts` ou sua conexão.</p>
        </div>
      </div>
    );
  }

  // Caso não haja usuário retornado (ex: 404, mas sem erro de rede)
  if (!user) {
    return (
      <div className="sticky top-24">
        <div className="glass-effect rounded-xl p-6 text-center">
          <p className="text-github-muted">Nenhum dado de perfil disponível.</p>
        </div>
      </div>
    );
  }

  const technologies = [
    "TypeScript", "Python", "Java", "C#", "React", "Next.js", 
    "Spring", "AI/ML", "Docker", "Kubernetes", "AWS", "PostgreSQL"
  ];

  return (
    <div className="sticky top-24 space-y-6">
      {/* Profile Card */}
      <div className="floating-card morphism-advanced rounded-xl p-6 text-center animate-fade-in card-3d glow-effect relative overflow-hidden">
        {/* Particle Background */}
        <div className="particle-bg opacity-30">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="relative z-10">
          <div className="profile-avatar w-32 h-32 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-1 glow-effect">
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="w-full h-full rounded-full object-cover bg-github-surface shadow-2xl"
              />
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-github-text mb-2 hero-name text-shadow-glow">
            {user.name || user.login}
          </h1>
          <p className="text-blue-400 mb-1 transition-colors duration-300 hover:text-blue-300">@{user.login}</p>
          {user.bio && (
            <p className="text-[14px] text-github-success font-medium mb-4">{user.bio}</p>
          )}
        </div>

        <div className="flex justify-center space-x-6 text-sm mb-4">
          <div className="text-center">
            <div className="font-semibold text-github-text">{user.followers}</div>
            <div className="text-github-muted">followers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-github-text">{user.following}</div>
            <div className="text-github-muted">following</div>
          </div>
        </div>

        

        {user.location && (
          <div className="flex items-center justify-center space-x-2 text-sm text-github-muted mb-2">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}

        {user.blog && (
          <div className="flex items-center justify-center space-x-2 text-sm text-github-muted mb-2">
            <Link className="w-4 h-4" />
            <a href={user.blog} className="text-github-success hover:underline" target="_blank" rel="noopener noreferrer">
              {user.blog}
            </a>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-sm text-github-muted mb-4">
          <Calendar className="w-4 h-4" />
          <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>


      </div>

      {/* Stats Cards */}
      <div className="space-y-4">
        <div className="stats-card rounded-xl p-4 floating-card">
          <div className="flex items-center space-x-3">
            <GitFork className="w-5 h-5 text-github-success" />
            <div>
              <div className="font-semibold text-github-text">{user.public_repos}</div>
              <div className="text-sm text-github-muted">Repositories</div>
            </div>
          </div>
        </div>

        {/* Estes valores estão hardcoded. Para puxar do GitHub, precisaria de mais lógica. */}
        <div className="stats-card rounded-xl p-4 floating-card">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-github-success" />
            <div>
              <div className="font-semibold text-github-text">50+</div> {/* Hardcoded */}
              <div className="text-sm text-github-muted">Stars Earned</div>
            </div>
          </div>
        </div>

        <div className="stats-card rounded-xl p-4 floating-card">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-github-success" />
            <div>
              <div className="font-semibold text-github-text">15+</div> {/* Hardcoded */}
              <div className="text-sm text-github-muted">Collaborators</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="glass-effect rounded-xl p-6 floating-card">
        <h3 className="text-lg font-semibold text-github-text mb-4 flex items-center">
          <span className="mr-2">⚙️</span>
          Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="tech-badge px-3 py-1 rounded-full text-xs font-medium text-github-success border border-github-success/30 bg-github-success/10 hover:bg-github-success/20 transition-all duration-300 transform hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}