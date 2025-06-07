import { Star } from "lucide-react";
import type { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  size?: "small" | "medium" | "large";
}

export function MovieCard({ movie, onClick, size = "medium" }: MovieCardProps) {
  const sizeClasses = {
    small: "h-60",
    medium: "h-80",
    large: "h-96",
  };

  const cardClasses = {
    small: "p-3",
    medium: "p-4",
    large: "p-6",
  };

  const titleClasses = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
  };

  return (
    <div 
      className="movie-card-hover cursor-pointer bg-card-grey rounded-lg overflow-hidden"
      onClick={() => onClick(movie)}
    >
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className={`w-full ${sizeClasses[size]} object-cover`}
        loading="lazy"
      />
      
      <div className={cardClasses[size]}>
        <h3 className={`font-semibold text-white mb-2 ${titleClasses[size]} line-clamp-2`}>
          {movie.title}
        </h3>
        
        {size !== "small" && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">
            {movie.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-white">{movie.rating}</span>
          </div>
          <span className="text-gray-400 text-sm">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}
