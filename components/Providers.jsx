'use client';

import { MusicProvider } from '@/contexts/MusicContext';

export default function Providers({ children }) {
  return (
    <MusicProvider>
      {children}
    </MusicProvider>
  );
}