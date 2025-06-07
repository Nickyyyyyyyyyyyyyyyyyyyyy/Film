import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  X,
  Subtitles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Movie, VideoPlayerState } from "@/lib/types";

interface VideoPlayerModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ movie, isOpen, onClose }: VideoPlayerModalProps) {
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 45 * 60 + 32, // 45:32 in seconds
    duration: 2 * 60 * 60 + 18 * 60 + 45, // 2:18:45 in seconds
    volume: 80,
    isFullscreen: false,
    showControls: true,
  });

  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && playerState.showControls) {
      // Hide controls after 3 seconds of inactivity
      if (controlsTimeout) clearTimeout(controlsTimeout);
      const timeout = setTimeout(() => {
        setPlayerState(prev => ({ ...prev, showControls: false }));
      }, 3000);
      setControlsTimeout(timeout);
    }

    return () => {
      if (controlsTimeout) clearTimeout(controlsTimeout);
    };
  }, [isOpen, playerState.showControls]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleVolumeToggle = () => {
    setPlayerState(prev => ({ 
      ...prev, 
      volume: prev.volume > 0 ? 0 : 80 
    }));
  };

  const handleProgressChange = (value: number[]) => {
    setPlayerState(prev => ({ ...prev, currentTime: value[0] }));
  };

  const handleVolumeChange = (value: number[]) => {
    setPlayerState(prev => ({ ...prev, volume: value[0] }));
  };

  const handleMouseMove = () => {
    setPlayerState(prev => ({ ...prev, showControls: true }));
  };

  const handleSkip = (seconds: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: Math.max(0, Math.min(prev.duration, prev.currentTime + seconds))
    }));
  };

  if (!movie) return null;

  const progressPercentage = (playerState.currentTime / playerState.duration) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-full bg-black border-none p-0 m-0">
        <div 
          className="relative w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPlayerState(prev => ({ ...prev, showControls: false }))}
        >
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className={`absolute top-4 right-4 text-white hover:text-netflix-red z-50 transition-opacity duration-300 ${
              playerState.showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Video Player Background */}
          <div className="relative w-full h-full bg-black">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.videoUrl || movie.backdropUrl})` }}
            />
            <div className="absolute inset-0 video-player-overlay" />

            {/* Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={handlePlayPause}
                variant="ghost"
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300"
              >
                {playerState.isPlaying ? (
                  <Pause className="h-12 w-12 text-white" />
                ) : (
                  <Play className="h-12 w-12 text-white ml-2" />
                )}
              </Button>
            </div>

            {/* Video Controls */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
                playerState.showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[playerState.currentTime]}
                  onValueChange={handleProgressChange}
                  max={playerState.duration}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>{formatTime(playerState.currentTime)}</span>
                  <span>{formatTime(playerState.duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handlePlayPause}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                  >
                    {playerState.isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleSkip(-10)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    onClick={() => handleSkip(10)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleVolumeToggle}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-netflix-red"
                    >
                      {playerState.volume === 0 ? (
                        <VolumeX className="h-6 w-6" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </Button>
                    <div className="w-20">
                      <Slider
                        value={[playerState.volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                  >
                    <Subtitles className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                  >
                    <Settings className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-netflix-red"
                    onClick={() => setPlayerState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }))}
                  >
                    <Maximize className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
