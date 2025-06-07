import { MovieCard } from "./movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@/lib/types";

interface MovieGridProps {
  movies: Movie[];
  title: string;
  onMovieClick: (movie: Movie) => void;
  isLoading?: boolean;
  cardSize?: "small" | "medium" | "large";
  className?: string;
}

export function MovieGrid({ 
  movies, 
  title, 
  onMovieClick, 
  isLoading = false,
  cardSize = "medium",
  className = ""
}: MovieGridProps) {
  const gridClasses = {
    small: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    medium: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    large: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  };

  if (isLoading) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">{title}</h2>
          <div className={`grid ${gridClasses[cardSize]} gap-6`}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-card-grey rounded-lg overflow-hidden">
                <Skeleton className="w-full h-80 bg-gray-700" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 bg-gray-700" />
                  <Skeleton className="h-3 bg-gray-700 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">{title}</h2>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">{title}</h2>
        <div className={`grid ${gridClasses[cardSize]} gap-6`}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              size={cardSize}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
