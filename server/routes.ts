import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertGithubStatsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(data);
      res.json({ success: true, message: "Successfully subscribed to newsletter!", subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid email address" });
      } else {
        res.status(500).json({ success: false, message: "Failed to subscribe to newsletter" });
      }
    }
  });

  // GitHub stats endpoints
  app.get("/api/github/stats", async (req, res) => {
    try {
      const stats = await storage.getAllGithubStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub stats" });
    }
  });

  app.get("/api/github/stats/:repository", async (req, res) => {
    try {
      const { repository } = req.params;
      const stats = await storage.getGithubStats(repository);
      if (!stats) {
        res.status(404).json({ message: "Repository stats not found" });
        return;
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repository stats" });
    }
  });

  // Update GitHub stats (internal endpoint for refreshing data)
  app.post("/api/github/stats/update", async (req, res) => {
    try {
      const data = insertGithubStatsSchema.parse(req.body);
      const stats = await storage.updateGithubStats(data);
      res.json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid stats data" });
      } else {
        res.status(500).json({ message: "Failed to update GitHub stats" });
      }
    }
  });

  // GitHub API proxy to fetch real-time stats
  app.get("/api/github/fetch/:owner/:repo", async (req, res) => {
    try {
      const { owner, repo } = req.params;
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      
      if (!response.ok) {
        res.status(response.status).json({ message: "Failed to fetch from GitHub API" });
        return;
      }
      
      const data = await response.json();
      const stats = {
        repository: `${owner}/${repo}`,
        stars: data.stargazers_count,
        forks: data.forks_count,
      };
      
      // Update our cache
      await storage.updateGithubStats(stats);
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repository data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
