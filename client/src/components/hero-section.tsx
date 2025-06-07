import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/lib/types";

interface HeroSectionProps {
  movie: Movie | null;
  onPlayMovie: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
}

export function HeroSection({ movie, onPlayMovie, onAddToList }: HeroSectionProps) {
  if (!movie) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="animate-pulse">
                <div className="h-16 bg-gray-700 rounded mb-4"></div>
                <div className="h-24 bg-gray-700 rounded mb-6"></div>
                <div className="flex space-x-4">
                  <div className="h-12 w-32 bg-gray-700 rounded"></div>
                  <div className="h-12 w-32 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {movie.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-7">
              {movie.description}
            </p>
            
            <div className="flex items-center mb-8 space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★</span>
                <span className="text-lg font-semibold text-white">{movie.rating}</span>
              </div>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.duration}</span>
              <Badge variant="destructive" className="bg-netflix-red text-white">
                {movie.genre}
              </Badge>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={() => onPlayMovie(movie)}
                className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Play</span>
              </Button>
              <Button 
                onClick={() => onAddToList(movie)}
                variant="secondary"
                className="bg-gray-600/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>My List</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
