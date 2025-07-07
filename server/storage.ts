import { githubUser, githubRepository, githubActivity, type GithubUser, type InsertGithubUser, type GithubRepository, type InsertGithubRepository, type GithubActivity, type InsertGithubActivity } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(): Promise<GithubUser | undefined>;
  createOrUpdateUser(user: InsertGithubUser): Promise<GithubUser>;
  
  // Repository methods
  getRepositories(): Promise<GithubRepository[]>;
  getPinnedRepositories(): Promise<GithubRepository[]>;
  createOrUpdateRepository(repo: InsertGithubRepository): Promise<GithubRepository>;
  updateRepositories(repos: InsertGithubRepository[]): Promise<GithubRepository[]>;
  
  // Activity methods
  getRecentActivity(): Promise<GithubActivity[]>;
  addActivity(activity: InsertGithubActivity): Promise<GithubActivity>;
}

export class MemStorage implements IStorage {
  private user: GithubUser | undefined;
  private repositories: Map<number, GithubRepository>;
  private activities: GithubActivity[];
  private currentRepoId: number;
  private currentActivityId: number;

  constructor() {
    this.repositories = new Map();
    this.activities = [];
    this.currentRepoId = 1;
    this.currentActivityId = 1;
    
    // Initialize with techleadevelopers data
    this.user = {
      id: 1,
      login: "techleadevelopers",
      name: "Paulo Silas de Campos Filho",
      avatar_url: "https://avatars.githubusercontent.com/u/107329417?v=4",
      bio: "Tech Lead Team",
      company: null,
      location: null,
      email: null,
      blog: null,
      twitter_username: null,
      public_repos: 30,
      public_gists: 0,
      followers: 2,
      following: 7,
      created_at: new Date('2022-06-15'),
      updated_at: new Date(),
    };

    // Initialize with sample repositories
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleRepos = [
      {
        github_id: 1,
        name: "sales-engine-ai-pro",
        full_name: "techleadevelopers/sales-engine-ai-pro",
        description: "📈 SalesEngineAI-Pro — Plataforma SaaS de Otimização de Vendas e Marketing com Inteligência Artificial",
        html_url: "https://github.com/techleadevelopers/sales-engine-ai-pro",
        language: "TypeScript",
        stargazers_count: 1,
        watchers_count: 1,
        forks_count: 0,
        topics: ["saas", "ai", "sales", "marketing", "typescript"],
        is_pinned: true,
        updated_at: new Date('2025-04-30'),
        created_at: new Date('2025-04-15'),
      },
      {
        github_id: 2,
        name: "ai-school-language-app",
        full_name: "techleadevelopers/ai-school-language-app",
        description: "🌍 Plataforma educacional de idiomas com IA local (Whisper + Mistral), gamificação, correção de fala em tempo real e app mobile em React Native",
        html_url: "https://github.com/techleadevelopers/ai-school-language-app",
        language: "TypeScript",
        stargazers_count: 1,
        watchers_count: 1,
        forks_count: 0,
        topics: ["education", "ai", "language-learning", "react-native", "whisper"],
        is_pinned: true,
        updated_at: new Date('2025-04-09'),
        created_at: new Date('2025-03-15'),
      },
      {
        github_id: 3,
        name: "next-agents-pro-sass",
        full_name: "techleadevelopers/next-agents-pro-sass",
        description: "HyperAgents IA Engine — Plataforma SaaS Modular e Multi-Tenant para Criação, Gestão e Automação de HyperAgents Inteligentes",
        html_url: "https://github.com/techleadevelopers/next-agents-pro-sass",
        language: "TypeScript",
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        topics: ["ai-agents", "saas", "multi-tenant", "nextjs", "automation"],
        is_pinned: true,
        updated_at: new Date('2025-04-21'),
        created_at: new Date('2025-04-01'),
      },
      {
        github_id: 4,
        name: "spring-cloud-stack-order",
        full_name: "techleadevelopers/spring-cloud-stack-order",
        description: "Sistema de gerenciamento de pedidos desenvolvido utilizando a arquitetura de microsserviços com o ecossistema Spring Cloud",
        html_url: "https://github.com/techleadevelopers/spring-cloud-stack-order",
        language: "Java",
        stargazers_count: 1,
        watchers_count: 1,
        forks_count: 0,
        topics: ["spring-cloud", "microservices", "java", "docker", "kubernetes"],
        is_pinned: true,
        updated_at: new Date('2025-03-20'),
        created_at: new Date('2025-02-15'),
      },
      {
        github_id: 5,
        name: "explored-contract-exploit",
        full_name: "techleadevelopers/explored-contract-exploit",
        description: "Framework avançado para análise de segurança em contratos inteligentes DeFi com técnicas modernas de auditoria",
        html_url: "https://github.com/techleadevelopers/explored-contract-exploit",
        language: "Solidity",
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        topics: ["defi", "security", "smart-contracts", "blockchain", "auditing"],
        is_pinned: true,
        updated_at: new Date('2025-05-01'),
        created_at: new Date('2025-04-10'),
      },
      {
        github_id: 6,
        name: "fire-brazilian-battle-urban",
        full_name: "techleadevelopers/fire-brazilian-battle-urban",
        description: "Arena Brasil: Batalha de Lendas - Jogo mobile Battle Royale com foco no mercado brasileiro usando Unity e C#",
        html_url: "https://github.com/techleadevelopers/fire-brazilian-battle-urban",
        language: "C#",
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        topics: ["unity", "battle-royale", "mobile-game", "csharp", "gaming"],
        is_pinned: true,
        updated_at: new Date('2025-06-29'),
        created_at: new Date('2025-06-01'),
      }
    ];

    sampleRepos.forEach((repoData) => {
      const repo: GithubRepository = {
        id: this.currentRepoId++,
        ...repoData,
      };
      this.repositories.set(repo.id, repo);
    });
  }

  async getUser(): Promise<GithubUser | undefined> {
    return this.user;
  }

  async createOrUpdateUser(userData: InsertGithubUser): Promise<GithubUser> {
    const user: GithubUser = {
      id: this.user?.id || 1,
      login: userData.login,
      name: userData.name || null,
      avatar_url: userData.avatar_url || null,
      bio: userData.bio || null,
      company: userData.company || null,
      location: userData.location || null,
      email: userData.email || null,
      blog: userData.blog || null,
      twitter_username: userData.twitter_username || null,
      public_repos: userData.public_repos || 0,
      public_gists: userData.public_gists || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      created_at: userData.created_at || null,
      updated_at: userData.updated_at || null,
    };
    this.user = user;
    return user;
  }

  async getRepositories(): Promise<GithubRepository[]> {
    return Array.from(this.repositories.values())
      .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
  }

  async getPinnedRepositories(): Promise<GithubRepository[]> {
    return Array.from(this.repositories.values())
      .filter(repo => repo.is_pinned)
      .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
  }

  async createOrUpdateRepository(repoData: InsertGithubRepository): Promise<GithubRepository> {
    const existing = Array.from(this.repositories.values()).find(r => r.github_id === repoData.github_id);
    
    const repo: GithubRepository = {
      id: existing?.id || this.currentRepoId++,
      github_id: repoData.github_id,
      name: repoData.name,
      full_name: repoData.full_name,
      description: repoData.description || null,
      html_url: repoData.html_url,
      language: repoData.language || null,
      stargazers_count: repoData.stargazers_count || 0,
      watchers_count: repoData.watchers_count || 0,
      forks_count: repoData.forks_count || 0,
      topics: repoData.topics || [],
      is_pinned: repoData.is_pinned || false,
      updated_at: repoData.updated_at || null,
      created_at: repoData.created_at || null,
    };
    
    this.repositories.set(repo.id, repo);
    return repo;
  }

  async updateRepositories(repos: InsertGithubRepository[]): Promise<GithubRepository[]> {
    // Clear existing repositories
    this.repositories.clear();
    
    const updatedRepos: GithubRepository[] = [];
    for (const repoData of repos) {
      const repo = await this.createOrUpdateRepository(repoData);
      updatedRepos.push(repo);
    }
    
    return updatedRepos;
  }

  async getRecentActivity(): Promise<GithubActivity[]> {
    return this.activities
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .slice(0, 10);
  }

  async addActivity(activityData: InsertGithubActivity): Promise<GithubActivity> {
    const activity: GithubActivity = {
      id: this.currentActivityId++,
      type: activityData.type,
      repo_name: activityData.repo_name || null,
      action: activityData.action,
      created_at: activityData.created_at || null,
    };
    
    this.activities.push(activity);
    return activity;
  }
}

export const storage = new MemStorage();
