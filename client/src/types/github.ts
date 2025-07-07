export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  github_id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
  is_pinned: boolean;
  updated_at: string;
  created_at: string;
}

export interface GitHubActivity {
  id: number;
  type: string;
  repo_name: string | null;
  action: string;
  created_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

export const LANGUAGE_COLORS: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#239120",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#1572B6",
  SCSS: "#c6538c",
  Vue: "#4FC08D",
  Solidity: "#AA6746",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Other: "#8b949e",
};
