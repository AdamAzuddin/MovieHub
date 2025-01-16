import { useState, useCallback, useEffect } from 'react';

export function useTrailerPlayback(trailers: string[]) {
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const playNextTrailer = useCallback(() => {
    setCurrentTrailerIndex((prevIndex) => (prevIndex + 1) % trailers.length);
  }, [trailers.length]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (trailers.length === 0) {
      console.error('No trailers provided');
    }
  }, [trailers]);

  return {
    currentTrailer: trailers[currentTrailerIndex],
    playNextTrailer,
    isPlaying,
    isMuted,
    toggleMute,
    togglePlayPause,
  };
}

