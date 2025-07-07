import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const githubUser = pgTable("github_user", {
  id: serial("id").primaryKey(),
  login: text("login").notNull(),
  name: text("name"),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  company: text("company"),
  location: text("location"),
  email: text("email"),
  blog: text("blog"),
  twitter_username: text("twitter_username"),
  public_repos: integer("public_repos").default(0),
  public_gists: integer("public_gists").default(0),
  followers: integer("followers").default(0),
  following: integer("following").default(0),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const githubRepository = pgTable("github_repository", {
  id: serial("id").primaryKey(),
  github_id: integer("github_id").notNull(),
  name: text("name").notNull(),
  full_name: text("full_name").notNull(),
  description: text("description"),
  html_url: text("html_url").notNull(),
  language: text("language"),
  stargazers_count: integer("stargazers_count").default(0),
  watchers_count: integer("watchers_count").default(0),
  forks_count: integer("forks_count").default(0),
  topics: jsonb("topics").default([]),
  is_pinned: boolean("is_pinned").default(false),
  updated_at: timestamp("updated_at"),
  created_at: timestamp("created_at"),
});

export const githubActivity = pgTable("github_activity", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  repo_name: text("repo_name"),
  action: text("action").notNull(),
  created_at: timestamp("created_at"),
});

export const insertGithubUserSchema = createInsertSchema(githubUser);
export const insertGithubRepositorySchema = createInsertSchema(githubRepository);
export const insertGithubActivitySchema = createInsertSchema(githubActivity);

export type GithubUser = typeof githubUser.$inferSelect;
export type InsertGithubUser = z.infer<typeof insertGithubUserSchema>;
export type GithubRepository = typeof githubRepository.$inferSelect;
export type InsertGithubRepository = z.infer<typeof insertGithubRepositorySchema>;
export type GithubActivity = typeof githubActivity.$inferSelect;
export type InsertGithubActivity = z.infer<typeof insertGithubActivitySchema>;
