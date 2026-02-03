'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

// ============================================
// PLAYLIST - Canciones de YouTube
// ============================================
// Puedes usar URLs de YouTube o archivos MP3 en /public
const PLAYLIST = [
  { title: 'Party Song 1', url: '/music/song1.mp3' },
  { title: 'Party Song 2', url: '/music/song2.mp3' },
  { title: 'Party Song 3', url: '/music/song3.mp3' },
  { title: 'Party Song 4', url: '/music/song4.mp3' },
  { title: 'Party Song 5', url: '/music/song5.mp3' },
  { title: 'Party Song 6', url: '/music/song6.mp3' },
];

export default function MusicPlayer() {
  const [muted, setMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Inicializar audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volumen al 30%
    }
  }, []);

  // Cambiar canción cuando termine
  const handleTrackEnd = () => {
    const nextTrack = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(nextTrack);
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setMuted(false);
        }).catch(err => {
          console.log('Error al reproducir:', err);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setMuted(true);
      }
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrack].url}
        onEnded={handleTrackEnd}
        loop={false}
      />

      {/* Botón flotante */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 group"
        title={muted ? 'Reproducir música' : 'Pausar música'}
      >
        {muted ? (
          <VolumeX size={28} className="text-white" />
        ) : (
          <div className="relative">
            <Volume2 size={28} className="text-white" />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        )}
      </button>

      {/* Info de canción (opcional) */}
      {!muted && isPlaying && (
        <div className="fixed bottom-24 left-6 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 z-40 animate-fade-in">
          <div className="flex items-center gap-2">
            <Music size={16} className="text-purple-400" />
            <p className="text-white text-sm font-bold">{PLAYLIST[currentTrack].title}</p>
          </div>
          <div className="text-gray-400 text-xs">
            {currentTrack + 1} / {PLAYLIST.length}
          </div>
        </div>
      )}
    </>
  );
}
