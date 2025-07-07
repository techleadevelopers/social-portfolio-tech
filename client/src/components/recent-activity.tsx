import { Clock, Star, GitBranch, Code } from "lucide-react";
import { useGitHubActivity } from "@/hooks/use-github-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentActivity() {
  const { data: activities, isLoading, error } = useGitHubActivity();

  if (isLoading) {
    return (
      <section className="glass-effect rounded-xl p-6 floating-card">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 bg-github-surface rounded-lg">
              <Skeleton className="w-5 h-5 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !activities) {
    return (
      <section className="glass-effect rounded-xl p-6 floating-card">
        <h3 className="text-xl font-semibold text-github-text mb-6 flex items-center">
          <Clock className="mr-2 text-github-success" />
          Recent Activity
        </h3>
        <p className="text-github-muted">Failed to load activity data</p>
      </section>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "CreateEvent":
        return <GitBranch className="w-4 h-4 text-github-success" />;
      case "PushEvent":
        return <Code className="w-4 h-4 text-github-success" />;
      case "WatchEvent":
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <GitBranch className="w-4 h-4 text-github-success" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <section className="glass-effect rounded-xl p-6 floating-card">
      <h3 className="text-xl font-semibold text-github-text mb-6 flex items-center">
        <Clock className="mr-2 text-github-success" />
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-github-muted mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-github-text mb-2">No recent activity</h4>
          <p className="text-github-muted">When you create repositories, make commits, or star projects, it'll show up here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-github-surface rounded-lg hover:bg-github-border transition-colors group"
            >
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-github-text">
                  {activity.action}{" "}
                  {activity.repo_name && (
                    <span className="font-semibold text-github-accent group-hover:text-github-success transition-colors">
                      {activity.repo_name}
                    </span>
                  )}
                </p>
                <p className="text-xs text-github-muted mt-1">
                  {formatTimeAgo(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
