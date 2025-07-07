import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "techleadevelopers";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get GitHub user profile
  app.get("/api/github/user", async (req, res) => {
    try {
      let user = await storage.getUser();
      
      if (!user) {
        // Fetch from GitHub API
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const githubUser = await response.json();
        user = await storage.createOrUpdateUser({
          login: githubUser.login,
          name: githubUser.name,
          avatar_url: githubUser.avatar_url,
          bio: githubUser.bio,
          company: githubUser.company,
          location: githubUser.location,
          email: githubUser.email,
          blog: githubUser.blog,
          twitter_username: githubUser.twitter_username,
          public_repos: githubUser.public_repos,
          public_gists: githubUser.public_gists,
          followers: githubUser.followers,
          following: githubUser.following,
          created_at: new Date(githubUser.created_at),
          updated_at: new Date(githubUser.updated_at),
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching GitHub user:", error);
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Get GitHub repositories
  app.get("/api/github/repositories", async (req, res) => {
    try {
      let repositories = await storage.getRepositories();
      
      if (repositories.length === 0) {
        // Fetch from GitHub API
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const githubRepos = await response.json();
        const repoData = githubRepos.map((repo: any) => ({
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          forks_count: repo.forks_count,
          topics: repo.topics || [],
          is_pinned: ['sales-engine-ai-pro', 'ai-school-language-app', 'spring-cloud-stack-order', 'next-agents-pro-sass', 'explored-contract-exploit', 'fire-brazilian-battle-urban'].includes(repo.name),
          updated_at: new Date(repo.updated_at),
          created_at: new Date(repo.created_at),
        }));
        
        repositories = await storage.updateRepositories(repoData);
      }
      
      res.json(repositories);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      res.status(500).json({ message: "Failed to fetch repositories" });
    }
  });

  // Get pinned repositories
  app.get("/api/github/pinned", async (req, res) => {
    try {
      const pinnedRepos = await storage.getPinnedRepositories();
      res.json(pinnedRepos);
    } catch (error) {
      console.error("Error fetching pinned repositories:", error);
      res.status(500).json({ message: "Failed to fetch pinned repositories" });
    }
  });

  // Get recent activity
  app.get("/api/github/activity", async (req, res) => {
    try {
      let activities = await storage.getRecentActivity();
      
      if (activities.length === 0) {
        // Add some sample activities based on recent repos
        const sampleActivities = [
          {
            type: "CreateEvent",
            repo_name: "fire-brazilian-battle-urban",
            action: "Created repository",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          },
          {
            type: "PushEvent",
            repo_name: "sales-engine-ai-pro",
            action: "Pushed to main branch",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
          },
          {
            type: "WatchEvent",
            repo_name: "microsoft/TypeScript",
            action: "Starred repository",
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
          },
        ];
        
        for (const activity of sampleActivities) {
          await storage.addActivity(activity);
        }
        
        activities = await storage.getRecentActivity();
      }
      
      res.json(activities);
    } catch (error) {
      console.error("Error fetching GitHub activity:", error);
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  // Get contribution data (mock for now since GitHub doesn't provide public API for this)
  app.get("/api/github/contributions", async (req, res) => {
    try {
      const contributions = [];
      const currentDate = new Date();
      
      // Generate last 365 days of contribution data
      for (let i = 365; i >= 0; i--) {
        const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        const count = Math.floor(Math.random() * 15); // Random contribution count
        contributions.push({
          date: date.toISOString().split('T')[0],
          count,
          level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
        });
      }
      
      res.json({
        total: contributions.reduce((sum, day) => sum + day.count, 0),
        contributions
      });
    } catch (error) {
      console.error("Error generating contribution data:", error);
      res.status(500).json({ message: "Failed to fetch contribution data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
