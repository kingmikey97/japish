'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Zap } from 'lucide-react';
import Image from 'next/image';
import HeroCards3D from './HeroCards3D';
export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query || query.length < 3) return;

    setIsSearching(true);
    router.push(`/japish/buscar?q=${encodeURIComponent(query)}`);
    // Not resetting isSearching to true to keep the loading state while navigating
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-white overflow-hidden py-24 lg:py-0">

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Lado Izquierdo: Copy & CTAs */}
          <motion.div 
            className="max-w-xl mx-auto lg:mx-0 flex flex-col items-center text-center lg:items-start lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >

            <motion.h1 
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[var(--near-black)] leading-[1.1] lg:leading-[1.05] mb-6"
            >
              Tu Tarjeta de <br className="hidden sm:block" />
              Presentación <span className="text-[var(--blue)]">Inteligente</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              className="text-lg text-[var(--gray-text)] leading-relaxed mb-10 max-w-[50ch] font-medium"
            >
              Olvídate del papel. Comparte tu información profesional con un simple JAPISH usando tecnología NFC de última generación.
            </motion.p>

            {/* Buscador Minimalista */}
            <motion.div variants={fadeUp} className="mb-10 w-full flex justify-center lg:justify-start">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[480px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribe un perfil que conozcas..."
                  className="w-full sm:flex-1 bg-[var(--near-black)]/[0.03] hover:bg-[var(--near-black)]/[0.06] text-[var(--near-black)] placeholder:text-[var(--gray-text)] rounded-full py-4 px-6 focus:outline-none focus:ring-0 transition-colors font-medium text-base border-none"
                />
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || isSearching}
                  className="w-full sm:w-auto h-[56px] px-8 bg-[var(--near-black)] hover:bg-[var(--near-black)]/90 text-white text-base font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-[var(--near-black)]/10"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Buscar"
                  )}
                </button>
              </form>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <a 
                href="#pricing"
                className="h-[56px] px-8 inline-flex items-center justify-center bg-[var(--blue)] hover:bg-[var(--blue)]/90 text-white font-bold rounded-full transition-all text-base hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-[var(--blue)]/20"
              >
                Obtener mi tarjeta
              </a>
              <a 
                href="/japish/demo-premiun"
                className="h-[56px] px-8 inline-flex items-center justify-center bg-transparent border border-[var(--near-black)]/[0.1] hover:border-[var(--near-black)]/[0.25] text-[var(--gray-text)] hover:text-[var(--near-black)] hover:bg-[var(--near-black)]/[0.02] font-semibold rounded-full transition-all text-base active:scale-[0.98]"
              >
                Ver demostración
              </a>
            </motion.div>
          </motion.div>

          {/* Lado Derecho: Imagen Generada */}
          <motion.div 
            className="relative w-full max-w-[400px] lg:max-w-none lg:h-[600px] flex items-center justify-center mx-auto mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroCards3D />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
