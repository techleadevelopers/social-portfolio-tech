import { useQuery } from "@tanstack/react-query";
import type { GitHubUser, GitHubRepository, GitHubActivity, ContributionData } from "@/types/github";

export function useGitHubUser() {
  return useQuery<GitHubUser>({
    queryKey: ["/api/github/user"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGitHubRepositories() {
  return useQuery<GitHubRepository[]>({
    queryKey: ["/api/github/repositories"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePinnedRepositories() {
  return useQuery<GitHubRepository[]>({
    queryKey: ["/api/github/pinned"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGitHubActivity() {
  return useQuery<GitHubActivity[]>({
    queryKey: ["/api/github/activity"],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useContributionData() {
  return useQuery<ContributionData>({
    queryKey: ["/api/github/contributions"],
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
