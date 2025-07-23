import { newsletters, githubStats, type Newsletter, type InsertNewsletter, type GithubStats, type InsertGithubStats, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  subscribeNewsletter(email: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;
  
  updateGithubStats(stats: InsertGithubStats): Promise<GithubStats>;
  getGithubStats(repository: string): Promise<GithubStats | undefined>;
  getAllGithubStats(): Promise<GithubStats[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletters: Map<string, Newsletter>;
  private githubStats: Map<string, GithubStats>;
  private currentUserId: number;
  private currentNewsletterId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.githubStats = new Map();
    this.currentUserId = 1;
    this.currentNewsletterId = 1;
    this.currentStatsId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const existing = this.newsletters.get(insertNewsletter.email);
    if (existing) {
      return existing;
    }
    
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribed: true,
      createdAt: new Date(),
    };
    this.newsletters.set(insertNewsletter.email, newsletter);
    return newsletter;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    return this.newsletters.get(email);
  }

  async updateGithubStats(insertStats: InsertGithubStats): Promise<GithubStats> {
    const existing = this.githubStats.get(insertStats.repository);
    if (existing) {
      const updated: GithubStats = {
        ...existing,
        stars: insertStats.stars,
        forks: insertStats.forks,
        updatedAt: new Date(),
      };
      this.githubStats.set(insertStats.repository, updated);
      return updated;
    }
    
    const id = this.currentStatsId++;
    const stats: GithubStats = {
      ...insertStats,
      id,
      updatedAt: new Date(),
    };
    this.githubStats.set(insertStats.repository, stats);
    return stats;
  }

  async getGithubStats(repository: string): Promise<GithubStats | undefined> {
    return this.githubStats.get(repository);
  }

  async getAllGithubStats(): Promise<GithubStats[]> {
    return Array.from(this.githubStats.values());
  }
}

export const storage = new MemStorage();
