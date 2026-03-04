
'use client';

import { Volume2, VolumeX, Music } from 'lucide-react';
import { useMusic } from '@/contexts/MusicContext';

export default function MusicPlayer() {
  const { isPlaying, currentSong, togglePlay } = useMusic();

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 group"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {!isPlaying ? (
          <VolumeX size={28} className="text-white" />
        ) : (
          <div className="relative">
            <Volume2 size={28} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Info de canción */}
      {isPlaying && (
        <div className="fixed bottom-24 left-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 z-40 animate-fade-in">
          <div className="flex items-center gap-2">
            <Music size={16} className="text-purple-400 animate-pulse" />
            <p className="text-white text-sm font-bold">{currentSong.title}</p>
          </div>
        </div>
      )}
    </>
  );
} 
