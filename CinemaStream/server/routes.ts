import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all movies
  app.get("/api/movies", async (req, res) => {
    try {
      const movies = await storage.getMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
    }
  });

  // Get featured movie
  app.get("/api/movies/featured", async (req, res) => {
    try {
      const movie = await storage.getFeaturedMovie();
      if (!movie) {
        return res.status(404).json({ error: "No featured movie found" });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured movie" });
    }
  });

  // Get movies by category
  app.get("/api/movies/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const movies = await storage.getMoviesByCategory(category);
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies by category" });
    }
  });

  // Search movies
  app.get("/api/movies/search", async (req, res) => {
    try {
      const searchSchema = z.object({
        q: z.string().min(1, "Search query is required"),
      });

      const { q } = searchSchema.parse(req.query);
      const movies = await storage.searchMovies(q);
      res.json(movies);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }
      res.status(500).json({ error: "Failed to search movies" });
    }
  });

  // Get single movie
  app.get("/api/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const movieId = parseInt(id, 10);
      
      if (isNaN(movieId)) {
        return res.status(400).json({ error: "Invalid movie ID" });
      }

      const movie = await storage.getMovie(movieId);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
