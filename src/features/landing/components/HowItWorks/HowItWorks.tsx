'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Elige tu plan',
    description:
      'Selecciona el diseño de tu página web, envíanos tus datos con el diseño de tu tarjeta física y recibe tu tarjeta NFC en 24 horas.',
    image: '/images/landing/paso1.png',
  },
  {
    number: '02',
    title: 'Acerca y conecta',
    description:
      'Simplemente acerca tu tarjeta al smartphone de tu contacto. ¡JAPISH! Instantáneo, sin apps adicionales.',
    image: '/images/landing/paso2.png',
  },
  {
    number: '03',
    title: 'Impacta',
    description:
      'Tu perfil o el de tu empresa se abre automáticamente. Redes sociales, contacto y todo en un solo lugar.',
    image: '/images/landing/paso3.png',
  },
];

/* Cohesive blue palette gradients */
const gradients = [
  'from-[#2563eb] to-[#3b82f6]',
  'from-[#2563eb] to-[#3b82f6]',
  'from-[#1d4ed8] to-[#60a5fa]',
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startX = useRef(0);
  const total = steps.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const handleStepNav = useCallback((i: number) => {
    setActive(i);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { prev(); } else { next(); }
      }
    },
    [prev, next],
  );

  return (
    <section
      className={`py-24 md:py-32 bg-white relative overflow-hidden ${dmSans.variable}`}
    >
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200/60" />
      {/* Bottom separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200/60" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24">

          {/* LEFT: Header + Step Navigation */}
          <motion.div
            className="lg:w-[35%] xl:w-[32%] flex-shrink-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-5xl sm:text-6xl lg:text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] mb-4 [text-wrap:balance] tracking-tight text-[var(--near-black)] font-extrabold"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Elige. Conecta. Impacta.
            </h2>

            <p
              className="text-base sm:text-lg text-[var(--gray-text)] leading-relaxed mb-10 max-w-[40ch]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              En menos de 24 horas tendrás tu página web y presencia digital
              lista.
            </p>

            {/* Step navigation */}
            <div className="space-y-3">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepNav(i)}
                    className={`group flex items-center gap-4 w-full text-left p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-br shadow-md ' + gradients[i]
                        : 'hover:bg-slate-50'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Ir al paso ${step.number}: ${step.title}`}
                  >
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-[var(--near-black)] shadow-sm'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-[var(--gray-text)]'
                      }`}
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current step description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-sm text-[var(--gray-text)] leading-relaxed max-w-[35ch]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {steps[active].description}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Image */}
          <div className="lg:flex-1 min-w-0">
            <div
              className="relative w-full aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/3]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={(e) => {
                startX.current = e.touches[0].clientX;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={steps[active].image}
                    alt={steps[active].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                    className="object-contain"
                    draggable={false}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
