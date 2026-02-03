'use client';

import { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

// ============================================
// PLAYLIST
// ============================================
const PLAYLIST = [
  { title: 'Party Song 1', url: '/music/song1.mp3' },
  { title: 'Party Song 2', url: '/music/song2.mp3' },
  { title: 'Party Song 3', url: '/music/song3.mp3' },
  { title: 'Party Song 4', url: '/music/song4.mp3' },
  { title: 'Party Song 5', url: '/music/song5.mp3' },
  { title: 'Party Song 6', url: '/music/song6.mp3' },
];

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Crear el elemento de audio una sola vez
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[0].url);
      audioRef.current.volume = 0.3;
      audioRef.current.loop = false;
      
      // Cuando termine la canción, pasar a la siguiente
      audioRef.current.addEventListener('ended', () => {
        const nextTrack = (currentTrack + 1) % PLAYLIST.length;
        setCurrentTrack(nextTrack);
        audioRef.current.src = PLAYLIST[nextTrack].url;
        audioRef.current.play();
      });

      // Intentar reproducir automáticamente al cargar
      // Nota: Algunos navegadores bloquean autoplay, pero intentamos
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Si el navegador bloquea autoplay, esperamos interacción del usuario
            console.log('Autoplay bloqueado - esperando interacción del usuario');
          });
      }
    }

    return () => {
      // NO destruir el audio al desmontar
      // Esto permite que la música continúe entre páginas
    };
  }, []);

  // Cambiar canción cuando currentTrack cambia
  useEffect(() => {
    if (audioRef.current && currentTrack > 0) {
      audioRef.current.src = PLAYLIST[currentTrack].url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Error al reproducir:', err));
    }
  };

  const value = {
    isPlaying,
    currentTrack,
    currentSong: PLAYLIST[currentTrack],
    togglePlay,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic debe usarse dentro de MusicProvider');
  }
  return context;
}