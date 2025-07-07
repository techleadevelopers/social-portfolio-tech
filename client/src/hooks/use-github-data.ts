// src/hooks/use-github-data.ts
import { useQuery } from '@tanstack/react-query';
// Importa suas interfaces que você definiu em "@/types/github"
import type { GitHubUser, GitHubRepository, GitHubActivity, ContributionDay, ContributionData } from "@/types/github";

// --- Defina seu USERNAME do GitHub aqui ---
const GITHUB_USERNAME = "techleadevelopers"; // <-- SUBSTITUA PELO SEU USERNAME REAL DO GITHUB!

// --- Custom Hook para Dados do Perfil GitHub (para ProfileSidebar) ---
// Este é o hook que 'profile-sidebar.tsx' espera.
export function useGitHubProfile() {
  return useQuery<GitHubUser, Error>({
    queryKey: ['githubProfile', GITHUB_USERNAME], // Chave única para o cache
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch GitHub profile: ${response.status} - ${errorText}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Dados "stale" após 10 minutos
    gcTime: 1000 * 60 * 60, // Manter no cache por 1 hora (anteriormente cacheTime)
    retry: 1, // Tentar buscar 1 vez em caso de falha
  });
}

// --- Custom Hook para Pinned Repositories ---
// Renomeado para usePinnedRepositories e ajustado para API GitHub
export function usePinnedRepositories() {
  return useQuery<GitHubRepository[], Error>({
    queryKey: ['githubPinnedRepos', GITHUB_USERNAME],
    queryFn: async () => {
      // Como a API REST não tem 'pinned' direto, buscar os 6 mais recentemente atualizados
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
    gcTime: 1000 * 60 * 30, // 30 minutos
    retry: 1,
  });
}

// --- Custom Hook para Atividade Recente (para RecentActivity) ---
// Renomeado para useGitHubActivity (mantendo o nome do seu original) e ajustado para API GitHub Events
export function useGitHubActivity() {
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
        gcTime: 1000 * 60 * 10, // 10 minutos
        retry: 1,
    });
}

// --- Custom Hook para Contribution Data (SIMULADO no frontend) ---
// Renomeado para useContributionData (mantendo o nome do seu original)
export function useContributionData() {
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
        gcTime: Infinity, // Dados mockados, não precisam de garbage collection
    });
}


// REMOVA OU COMENTE ESTES SE VOCÊ NÃO FOR USAR ENDPOINTS DE BACKEND PRÓPRIOS:
/*
// Se você quiser manter os nomes originais para compatibilidade,
// você pode renomear os hooks acima ou criar aliases, mas cuidado para não ter duplicação.
export function useGitHubUser() { // Este é o que seu profile-sidebar estava tentando importar antes
    return useGitHubProfile(); // Apenas um alias para o hook correto que busca do GitHub
}

export function useGitHubRepositories() {
    return usePinnedRepositories(); // Ou crie um novo hook para 'todos os repos' se necessário
}
*/