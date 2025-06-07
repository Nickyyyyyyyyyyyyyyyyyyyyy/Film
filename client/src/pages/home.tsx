import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { CategoryFilters } from "@/components/category-filters";
import { MovieGrid } from "@/components/movie-grid";
import { MovieDetailsModal } from "@/components/movie-details-modal";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { useToast } from "@/hooks/use-toast";
import type { Movie, Category } from "@/lib/types";
import { queryClient, getQueryFn } from "@/lib/queryClient";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [videoPlayerMovie, setVideoPlayerMovie] = useState<Movie | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch featured movie
  const { data: featuredMovie, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ["/api/movies/featured"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: true,
  });

  // Fetch movies based on category or search
  const { data: movies = [], isLoading: isMoviesLoading } = useQuery({
    queryKey: searchQuery 
      ? ["/api/movies/search", { q: searchQuery }]
      : ["/api/movies/category", activeCategory],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: true,
  });

  // Fetch trending movies (for the small grid)
  const { data: trendingMovies = [], isLoading: isTrendingLoading } = useQuery({
    queryKey: ["/api/movies"],
    queryFn: getQueryFn({ on401: "throw" }),
    select: (data: Movie[]) => data.slice(0, 6), // Get first 6 movies for trending
    enabled: true,
  });

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailsModalOpen(true);
  };

  const handlePlayMovie = (movie: Movie) => {
    setVideoPlayerMovie(movie);
    setIsVideoPlayerOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleAddToList = (movie: Movie) => {
    toast({
      title: "Added to List",
      description: `${movie.title} has been added to your list.`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory("all");
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  const getGridTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (activeCategory === "all") {
      return "New Releases";
    }
    return `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Movies`;
  };

  return (
    <div className="min-h-screen bg-deep-black">
      <Navigation onSearch={handleSearch} searchQuery={searchQuery} />
      
      <HeroSection
        movie={featuredMovie || null}
        onPlayMovie={handlePlayMovie}
        onAddToList={handleAddToList}
      />

      <CategoryFilters
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <MovieGrid
        movies={trendingMovies}
        title="Trending Now"
        onMovieClick={handleMovieClick}
        isLoading={isTrendingLoading}
        cardSize="small"
      />

      <MovieGrid
        movies={movies}
        title={getGridTitle()}
        onMovieClick={handleMovieClick}
        isLoading={isMoviesLoading}
        cardSize="medium"
        className="bg-dark-charcoal"
      />

      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onPlayMovie={handlePlayMovie}
        onAddToList={handleAddToList}
      />

      <VideoPlayerModal
        movie={videoPlayerMovie}
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-dark-charcoal py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 netflix-red">КиноStream</h3>
              <p className="text-gray-400 text-sm leading-6">
                Your ultimate destination for premium movie streaming. Discover, watch, and enjoy thousands of movies and TV shows.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Browse</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Movies</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">TV Shows</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Genres</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">New Releases</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">My List</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Account Settings</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Subscription</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-netflix-red transition-colors duration-300">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-netflix-red transition-colors duration-300">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-netflix-red transition-colors duration-300">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-netflix-red transition-colors duration-300">
                  <span className="text-xl">📺</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 КиноStream. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
