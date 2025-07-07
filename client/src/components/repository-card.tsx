import { Star, GitFork, ExternalLink } from "lucide-react";
import { LANGUAGE_COLORS, type GitHubRepository } from "@/types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const languageColor = repository.language 
    ? LANGUAGE_COLORS[repository.language] || LANGUAGE_COLORS.Other
    : LANGUAGE_COLORS.Other;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="card-hover-effects reflection-effect rounded-xl p-6 floating-card transition-all duration-500 group relative overflow-hidden">
      {/* Particle Background */}
      <div className="particle-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Holographic overlay */}
      <div className="absolute inset-0 holographic-card opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">📂</div>
            <h4 className="font-semibold text-github-accent hover:text-blue-400 cursor-pointer transition-all duration-300 group-hover:text-shadow-glow">
              {repository.name}
            </h4>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-github-border text-github-muted px-2 py-1 rounded-full group-hover:bg-blue-500/20 transition-colors duration-300">
              Public
            </span>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-github-muted hover:text-blue-400 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      {repository.description && (
        <p className="text-sm text-github-muted mb-4 line-clamp-3 leading-relaxed">
          {repository.description}
        </p>
      )}

      {repository.topics && repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {repository.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="text-xs bg-github-success/10 text-github-success px-2 py-1 rounded-full border border-github-success/20 hover:bg-github-success/20 transition-colors"
            >
              {topic}
            </span>
          ))}
          {repository.topics.length > 5 && (
            <span className="text-xs text-github-muted">
              +{repository.topics.length - 5} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-github-muted">
        <div className="flex items-center space-x-4">
          {repository.language && (
            <span className="flex items-center space-x-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              <span>{repository.language}</span>
            </span>
          )}
          
          {repository.stargazers_count > 0 && (
            <span className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{repository.stargazers_count}</span>
            </span>
          )}
          
          {repository.forks_count > 0 && (
            <span className="flex items-center space-x-1">
              <GitFork className="w-3 h-3" />
              <span>{repository.forks_count}</span>
            </span>
          )}
        </div>
        
        <span className="text-github-muted">
          Updated {formatDate(repository.updated_at)}
        </span>
      </div>
      </div>
    </div>
  );
}
