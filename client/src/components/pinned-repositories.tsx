import { Pin, Settings } from "lucide-react";
import { usePinnedRepositories } from "@/hooks/use-github-data";
import { Skeleton } from "@/components/ui/skeleton";
import RepositoryCard from "./repository-card"; // Componente individual do card de repositório

export default function PinnedRepositories() {
  const { data: pinnedRepos, isLoading, error } = usePinnedRepositories();

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          {/* Ícone Pin - APLICANDO MODERN-ICON E DROP-SHADOW-3D AQUI */}
          <h3 className="text-2xl font-bold text-github-text flex items-center">
            <Pin className="mr-3 text-github-success modern-icon drop-shadow-3d" />
            Pinned Repositories
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            // Cards de Skeleton - APLICANDO SOMBRA 3D AQUI
            <div key={i} className="glass-effect rounded-xl p-6 shadow-3d-deep">
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !pinnedRepos) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          {/* Ícone Pin - APLICANDO MODERN-ICON E DROP-SHADOW-3D AQUI */}
          <h3 className="text-2xl font-bold text-github-text flex items-center">
            <Pin className="mr-3 text-github-success modern-icon drop-shadow-3d" />
            Pinned Repositories
          </h3>
        </div>
        {/* Mensagem de erro - APLICANDO SOMBRA 3D AQUI */}
        <div className="glass-effect rounded-xl p-8 text-center shadow-3d-deep">
          <p className="text-red-500 mb-2">Failed to load pinned repositories.</p>
          <p className="text-github-muted text-sm">Detalhes: {error?.message || "Erro desconhecido"}</p>
          <p className="text-github-muted text-sm mt-1">Verifique seu nome de usuário do GitHub em `use-github-data.ts` ou sua conexão.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        {/* Ícone Pin - APLICANDO MODERN-ICON E DROP-SHADOW-3D AQUI */}
        <h3 className="text-2xl font-bold text-github-text flex items-center">
          <Pin className="mr-3 text-github-success modern-icon drop-shadow-3d" />
          Pinned Repositories
        </h3>
        {/* Botão "Customize your pins" - APLICANDO SOMBRA 3D AQUI */}
        <button className="text-github-success hover:text-github-success2 text-sm font-medium transition-colors flex items-center space-x-1 shadow-3d-deep">
          {/* Ícone Settings - APLICANDO MODERN-ICON E DROP-SHADOW-3D AQUI */}
          <Settings className="w-4 h-4 modern-icon drop-shadow-3d" />
          <span>Customize your pins</span>
        </button>
      </div>

      {pinnedRepos.length === 0 ? (
        // Mensagem "No pinned repositories" - APLICANDO SOMBRA 3D AQUI
        <div className="glass-effect rounded-xl p-8 text-center shadow-3d-deep">
          {/* Ícone Pin na mensagem de vazio - APLICANDO MODERN-ICON E DROP-SHADOW-3D AQUI */}
          <Pin className="w-12 h-12 text-github-muted mx-auto mb-4 modern-icon drop-shadow-3d" />
          <h4 className="text-lg font-semibold text-github-text mb-2">No pinned repositories</h4>
          <p className="text-github-muted">When you create repositories, make commits, or star projects, it'll show up here</p> {/* Correção de texto conforme o do GitHub */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loop de cards de repositório - O COMPONENTE REPOSITORYCARD RECEBE AS CLASSES */}
          {/* A classe animate-fade-in já está aqui e é mantida */}
          {pinnedRepos.map((repo, index) => (
            <div key={repo.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
              {/* O componente RepositoryCard será o responsável por ter os efeitos de hover 3D, reflexo e sombras */}
              <RepositoryCard repository={repo} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}