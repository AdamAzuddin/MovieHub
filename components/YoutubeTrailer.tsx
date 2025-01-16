import React, { useRef, useCallback, useEffect } from 'react';
import YouTube from 'react-youtube';
import { useTrailerPlayback } from '@/hooks/useTrailerPlayback';
import { Volume2, VolumeX, SkipForward, Pause, Play } from 'lucide-react';

interface TrailerProps {
  trailers: string[];
}

export default function YoutubeTrailer({ trailers }: TrailerProps) {
  const playerRef = useRef<YouTube>(null);
  const {
    currentTrailer,
    playNextTrailer,
    isPlaying,
    isMuted,
    toggleMute,
    togglePlayPause,
  } = useTrailerPlayback(trailers);

  const onReady = useCallback((event: { target: any }) => {
    const player = event.target;
    if (isPlaying) {
      player.playVideo();
    }
    if (isMuted) {
      player.mute(); // Ensure video starts muted if `isMuted` is true
    } else {
      player.unMute(); // Unmute video if `isMuted` is false
    }
  }, [isPlaying, isMuted]);

  const onEnd = useCallback(() => {
    playNextTrailer();
  }, [playNextTrailer]);

  const onError = useCallback(() => {
    console.error('Error playing video');
    playNextTrailer();
  }, [playNextTrailer]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = extractVideoId(currentTrailer);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  useEffect(() => {
    if (playerRef.current && playerRef.current.internalPlayer) {
      const player = playerRef.current.internalPlayer;
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
      }
    }
  }, [isMuted]);

  return (
    <div className="relative w-full aspect-video">
      <YouTube
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: isMuted ? 1 : 0, // Dynamically set mute based on `isMuted`
            rel: 0,
            modestbranding: 1,
          },
        }}
        onReady={onReady}
        onEnd={onEnd}
        onError={onError}
        className="absolute top-0 left-0 w-full h-full"
        ref={playerRef}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
          <button
            onClick={playNextTrailer}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Next trailer"
          >
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
