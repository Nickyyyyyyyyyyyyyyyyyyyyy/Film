import type { Movie, Category } from "@shared/schema";

export type { Movie, Category };

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  showControls: boolean;
}

export interface MovieFilters {
  category: Category;
  searchQuery: string;
}
