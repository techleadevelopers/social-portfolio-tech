import { Pin, Settings } from "lucide-react";
import { usePinnedRepositories } from "@/hooks/use-github-data";
import { Skeleton } from "@/components/ui/skeleton";
import RepositoryCard from "./repository-card";

export default function PinnedRepositories() {
  const { data: pinnedRepos, isLoading, error } = usePinnedRepositories();

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-github-text flex items-center">
            <Pin className="mr-3 text-github-success" />
            Pinned Repositories
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-effect rounded-xl p-6">
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
          <h3 className="text-2xl font-bold text-github-text flex items-center">
            <Pin className="mr-3 text-github-success" />
            Pinned Repositories
          </h3>
        </div>
        <div className="glass-effect rounded-xl p-8 text-center">
          <p className="text-github-muted">Failed to load pinned repositories</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-github-text flex items-center">
          <Pin className="mr-3 text-github-success" />
          Pinned Repositories
        </h3>
        <button className="text-github-success hover:text-github-success2 text-sm font-medium transition-colors flex items-center space-x-1">
          <Settings className="w-4 h-4" />
          <span>Customize your pins</span>
        </button>
      </div>

      {pinnedRepos.length === 0 ? (
        <div className="glass-effect rounded-xl p-8 text-center">
          <Pin className="w-12 h-12 text-github-muted mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-github-text mb-2">No pinned repositories</h4>
          <p className="text-github-muted">Pin some repositories to showcase your work</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pinnedRepos.map((repo, index) => (
            <div key={repo.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
              <RepositoryCard repository={repo} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
