import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  synopsis: text("synopsis").notNull(),
  year: integer("year").notNull(),
  duration: text("duration").notNull(),
  rating: real("rating").notNull(),
  genre: text("genre").notNull(),
  genres: text("genres").notNull(),
  director: text("director").notNull(),
  cast: text("cast", { mode: "array" }).notNull(),
  releaseDate: text("release_date").notNull(),
  language: text("language").notNull(),
  country: text("country").notNull(),
  posterUrl: text("poster_url").notNull(),
  backdropUrl: text("backdrop_url").notNull(),
  videoUrl: text("video_url"),
  featured: integer("featured").default(0), // 0 or 1 for boolean
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
});

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof movies.$inferSelect;

// Categories for filtering
export const categories = [
  "all",
  "action",
  "drama",
  "comedy",
  "thriller",
  "sci-fi",
  "horror",
  "romance",
  "adventure",
  "fantasy",
] as const;

export type Category = typeof categories[number];
