'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      data-nav-bg="#0b1120"
      className={`relative min-h-[100dvh] flex flex-col items-center pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden ${dmSans.variable}`}
      style={{
        background: 'linear-gradient(175deg, #0b1120 0%, #0f172a 60%, #111b30 100%)',
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow in the center */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Top Content: Typography & CTAs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto flex flex-col items-center text-center w-full"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-tighter text-white leading-[1.05] mb-4 [text-wrap:balance] max-w-5xl"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Tu Tarjeta de Presentación{' '}
            <span className="text-[#3b82f6]">Inteligente</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-[60ch] font-medium"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Olvídate del papel. Comparte tu información profesional con un
            simple JAPISH usando tecnología NFC de última generación.
          </motion.p>

          {/* Search bar (Original style) */}
          <motion.div variants={fadeUp} className="mb-10 w-full flex justify-center">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[500px]"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe un perfil que conozcas..."
                className="w-full sm:flex-1 bg-white/[0.06] hover:bg-white/[0.09] text-white placeholder:text-slate-500 rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/40 transition-colors font-medium text-base border border-white/[0.08]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="w-full sm:w-auto h-[56px] px-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-base font-semibold rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 active:scale-[0.97] cursor-pointer"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Buscar'
                )}
              </button>
            </form>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full mb-6 lg:mb-8"
          >
            <a
              href="#pricing"
              className="h-[56px] px-8 inline-flex items-center justify-center bg-white text-[#0b1120] font-bold rounded-full transition-all duration-200 text-base active:scale-[0.97] hover:bg-slate-100 cursor-pointer"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Obtener mi tarjeta
            </a>
            <a
              href="/japish/demo-premiun"
              className="h-[56px] px-8 inline-flex items-center justify-center bg-transparent border border-white/[0.12] hover:border-white/[0.25] text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-200 text-base active:scale-[0.97] cursor-pointer"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Ver demostración
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Content: Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[800px] flex items-center justify-center mx-auto mt-4"
        >
          {/* Intense ambient glow behind the image for a premium look */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[80%] bg-[#3b82f6]/15 rounded-[100%] blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-[#1e3a8f]/30 rounded-[100%] blur-[120px] pointer-events-none" />

          <Image
            src="/images/landing/hero.png"
            alt="JAPISH - Tarjeta NFC inteligente"
            width={1000}
            height={1000}
            className="w-full h-auto relative z-10 drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] contrast-[1.02]"
            priority
            draggable={false}
          />
        </motion.div>

      </div>
    </section>
  );
}
