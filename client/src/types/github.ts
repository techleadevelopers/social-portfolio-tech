// src/hooks/use-github-data.ts
import { useQuery } from '@tanstack/react-query';

// --- SUAS INTERFACES (AJUSTADAS PARA A API DO GITHUB ONDE NECESSÁRIO) ---

// GitHubUser - Interface praticamente igual à da API do GitHub, ótimo!
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
  created_at: string; // ISO 8601 string
  updated_at: string; // ISO 8601 string
}

// GitHubRepository - Precisa de alguns ajustes para corresponder à API REST do GitHub.
// `github_id` não é um campo da API. `is_pinned` também não é direto na API REST.
// `topics` vem como array de strings, mas a API REST v3 pode requerer um header 'Accept'.
export interface GitHubRepository {
  id: number; // ID do GitHub (API REST)
  node_id: string; // Adicionado da API REST
  name: string;
  full_name: string;
  private: boolean; // Adicionado da API REST
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  // `topics` da API REST requer Accept header: 'application/vnd.github.mercy-preview+json'
  // Vamos assumir que você pode querer isso, ou ignorar se não precisar.
  topics?: string[];
  // `is_pinned` não vem da API REST. Se você quer isso, precisaria de uma lista manual
  // ou da API GraphQL, ou de um backend para armazenar isso.
  // Por enquanto, vamos remover is_pinned, pois não vem direto.
  // is_pinned?: boolean; // REMOVIDO pois não é direto da API REST
  updated_at: string; // ISO 8601 string
  created_at: string; // ISO 8601 string
  pushed_at: string; // Adicionado: Último push na API REST
}

// GitHubActivity - Precisa de ajustes significativos para corresponder à API de Events do GitHub.
// `repo_name` e `action` não são campos diretos; precisam ser extraídos do 'type' e 'repo.name'.
export interface GitHubActivity {
    id: string; // ID do evento
    type: string; // Ex: 'PushEvent', 'PullRequestEvent', 'CreateEvent'
    actor: {
        id: number;
        login: string;
        display_login: string;
        avatar_url: string;
        url: string;
    };
    repo: {
        id: number;
        name: string; // Ex: 'username/repo-name'
        url: string;
    };
    payload: any; // Conteúdo específico do evento
    public: boolean;
    created_at: string; // ISO 8601 string
    org?: { // Opcional, se o evento for de uma organização
        id: number;
        login: string;
        avatar_url: string;
        url: string;
    };
}


// ContributionDay - Esta interface é para dados de contribuição, que não vêm diretamente
// como um array diário da API REST do GitHub de forma simples para um perfil.
// Geralmente é mockado ou requer uma API GraphQL/raspagem.
export interface ContributionDay {
  date: string; // AAAA-MM-DD
  count: number;
  level: number; // 0 (no contribution) a 4 (high contribution)
}

// ContributionData - Também para dados de contribuição.
export interface ContributionData {
  total: number;
  contributions: ContributionDay[];
}

// LANGUAGE_COLORS - Esta é uma constante, e está ótima como está.
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

// --- Defina seu USERNAME do GitHub aqui ---
const GITHUB_USERNAME = "techleadevelopers"; // <-- SUBSTITUA PELO SEU USERNAME REAL DO GITHUB!

// --- Custom Hook para Pinned Repositories ---
// NOTA: A API REST do GitHub não tem um endpoint direto para "pinned" repositórios.
// Para simular, vamos buscar os 6 repositórios mais atualizados.
// Se você REALMENTE precisa dos repos fixados, a API GraphQL do GitHub é o caminho,
// ou você precisa de um array de IDs/nomes de repositorios fixados manualmente.
export function usePinnedRepositories() {
  return useQuery<GitHubRepository[], Error>({
    queryKey: ['githubPinnedRepos', GITHUB_USERNAME],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=6`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch pinned repositories: ${response.status} - ${errorText}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos - CORRIGIDO: cacheTime para gcTime
    retry: 1,
  });
}

// --- Custom Hook para Dados do Perfil GitHub (para ProfileSidebar) ---
export function useGitHubProfile() {
  return useQuery<GitHubUser, Error>({
    queryKey: ['githubProfile', GITHUB_USERNAME],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch GitHub profile: ${response.status} - ${errorText}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 60, // 1 hora - CORRIGIDO: cacheTime para gcTime
    retry: 1,
  });
}

// --- Custom Hook para Atividade Recente (para RecentActivity) ---
export function useRecentActivity() {
    return useQuery<GitHubActivity[], Error>({
        queryKey: ['githubRecentActivity', GITHUB_USERNAME],
        queryFn: async () => {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch recent activity: ${response.status} - ${errorText}`);
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 2, // 2 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos - CORRIGIDO: cacheTime para gcTime
        retry: 1,
    });
}


// --- Custom Hook para Contribution Graph Data ---
export function useContributionGraphData() {
    return useQuery<ContributionData, Error>({
        queryKey: ['githubContributions', GITHUB_USERNAME],
        queryFn: async () => {
            // SIMULAÇÃO: Gerar dados de contribuição mockados
            const today = new Date();
            let totalContributions = 0;
            const contributions: ContributionDay[] = Array.from({ length: 365 }).map((_, i) => {
                const date = new Date();
                date.setDate(today.getDate() - (365 - 1 - i));
                const count = Math.floor(Math.random() * 10); // Simula 0-9 contribuições por dia
                totalContributions += count;
                let level = 0; // Default
                if (count > 0 && count <= 2) level = 1;
                else if (count > 2 && count <= 5) level = 2;
                else if (count > 5 && count <= 8) level = 3;
                else if (count > 8) level = 4;
                return { date: date.toISOString().split('T')[0], count, level };
            });
            return { total: totalContributions, contributions };
        },
        staleTime: Infinity, // Dados mockados, não precisam de refetch
        gcTime: Infinity, // Dados mockados, não precisam de garbage collection - CORRIGIDO: cacheTime para gcTime
    });
}