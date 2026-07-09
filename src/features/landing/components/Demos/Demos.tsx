'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

interface DemoItem {
  slug: string;
  name: string;
  title: string;
  //   category: string;
}

// 👉 Completa con los slugs reales de tus 11 templates.
// "name" debe coincidir con el nombre de archivo generado por capture-demos.js
// (/public/demos/{name}.png)
const demos: DemoItem[] = [
  { slug: '1', name: 'template-1', title: 'Modelo 1' },
  { slug: '2', name: 'template-2', title: 'Modelo 2' },
  { slug: '3', name: 'template-3', title: 'Modelo 3' },
  { slug: '4', name: 'template-4', title: 'Modelo 4' },
  { slug: '5', name: 'template-5', title: 'Modelo 5' },
  { slug: 'influencer', name: 'Influencer', title: 'Modelo Influencer' },
  { slug: 'Artista', name: 'Artista', title: 'Modelo Artista' },
  { slug: 'Medico', name: 'Medico', title: 'Modelo Medico' },
  { slug: 'Abogado', name: 'Abogado', title: 'Modelo Abogado' },
  { slug: 'Arquitecto', name: 'Arquitecto', title: 'Modelo Arquitecto' },
  // { slug: 'luisrevilla', name: 'campania-politica', title: 'Campaña Política' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Demos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      className={`py-24 bg-white relative overflow-hidden ${dmSans.variable}`}
    >
      {/* Background decorativo, mismo lenguaje que Showcase */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#020617] leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Explora nuestros <span className="text-[#3b82f6]">Diseños</span>
          </h2>
          <p
            className="text-lg text-slate-600 font-medium max-w-[55ch]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Cada perfil es unico, demuestra tu profesionalismo o tus servicios de manera exclusiva
          </p>
        </motion.div>

        {/* Carrusel */}
        <motion.div
          className="max-w-3xl sm:max-w-4xl lg:max-w-6xl mx-auto relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {/* Flecha izquierda */}
          <button
            onClick={scrollPrev}
            aria-label="Demo anterior"
            className="flex absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 items-center justify-center transition-all"
          >
            <ChevronLeft size={18} className="sm:hidden text-slate-700" />
            <ChevronLeft size={22} className="hidden sm:block text-slate-700" />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={scrollNext}
            aria-label="Siguiente demo"
            className="flex absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 items-center justify-center transition-all"
          >
            <ChevronRight size={18} className="sm:hidden text-slate-700" />
            <ChevronRight size={22} className="hidden sm:block text-slate-700" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-6">
              {demos.map((demo, index) => {
                const isActive = index === selectedIndex;

                return (
                  <div
                    key={demo.slug}
                    className="flex-[0_0_78%] sm:flex-[0_0_42%] lg:flex-[0_0_32%] min-w-0 py-10"
                  >
                    <div
                      className={`rounded-2xl border p-5 flex flex-col items-center gap-4 transition-all duration-500 ease-out origin-center ${isActive
                        ? 'border-[#3b82f6]/30 bg-white shadow-2xl shadow-blue-500/20 scale-125 z-10'
                        : 'border-slate-200 bg-slate-50 scale-80 opacity-50'
                        }`}
                    >
                      {/* Mockup de celular */}
                      <div className="aspect-[9/16] w-full max-w-[600px] sm:max-w-[240px] lg:max-w-[280px]">
                        <div className="relative w-full h-full bg-[#020617] rounded-[2rem] border-[6px] border-slate-100 shadow-2xl overflow-hidden ring-1 ring-slate-200/50">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#020617] rounded-b-2xl z-20" />

                          {isActive ? (
                            <iframe
                              src={`/japish/${demo.slug}`}
                              className="w-full h-full border-none"
                              title={`Demo ${demo.title}`}
                              loading="lazy"
                            />
                          ) : (
                            <Image
                              src={`/demos/${demo.name}.png`}
                              alt={`Demo ${demo.title}`}
                              fill
                              className="object-cover object-top"
                              sizes="220px"
                            />
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        {/* <span className="text-[#3b82f6] text-xs font-semibold uppercase tracking-wide">
                          {demo.category}
                        </span> */}
                        <h3
                          className="text-[#020617] font-bold text-lg mt-1"
                          style={{ fontFamily: 'var(--font-dm-sans)' }}
                        >
                          {demo.title}
                        </h3>
                      </div>

                      <a
                        href={`/japish/${demo.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-700 bg-slate-100 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6] px-4 py-2 rounded-lg transition-all font-semibold"
                      >
                        Ver demo completo
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Ir al demo ${index + 1}`}
                className={`h-2 rounded-full transition-all ${index === selectedIndex ? 'w-6 bg-[#3b82f6]' : 'w-2 bg-slate-300'
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}