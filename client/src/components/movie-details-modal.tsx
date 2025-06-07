import { Play, Plus, X, Star, Calendar, Clock, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/lib/types";

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
}

export function MovieDetailsModal({ 
  movie, 
  isOpen, 
  onClose, 
  onPlayMovie, 
  onAddToList 
}: MovieDetailsModalProps) {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card-grey text-white border-gray-700 p-0 overflow-hidden">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:text-netflix-red z-10"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Movie Header */}
        <div className="relative">
          <img
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card-grey via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Content */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <Button
              onClick={() => onPlayMovie(movie)}
              className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Play</span>
            </Button>
            <Button
              onClick={() => onAddToList(movie)}
              className="bg-netflix-red text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add to List</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-3 text-white">Synopsis</h3>
              <p className="text-gray-300 leading-7 mb-6">{movie.synopsis}</p>

              <h3 className="text-xl font-semibold mb-3 text-white">Cast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {movie.cast.slice(0, 4).map((actor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{actor}</p>
                      <p className="text-gray-400 text-sm">Actor</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Director:</span>
                  <span className="text-white">{movie.director}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Genre
                  </Badge>
                  <span className="text-white">{movie.genres}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Release Date:</span>
                  <span className="text-white">{movie.releaseDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white">{movie.language}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Country:</span>
                  <span className="text-white">{movie.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
