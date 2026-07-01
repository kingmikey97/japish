"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { EMPRESA } from "@/shared/constants/empresa";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      // ── Desvanecimiento activado por scroll ──
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── Dibujo de subrayado y animacion continua ──
      const path = underlinePathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length, opacity: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            delay: 1.4,
            ease: "power3.out",
            onComplete: () => {
              gsap.to(path, {
                opacity: 0.5,
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full bg-white flex items-center overflow-hidden pt-20 lg:pt-24 selection:bg-[var(--blue)] selection:text-white">
      {/* Lienzo de red interactivo GSAP */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Superposicion de textura de ruido */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
      />

      <div ref={contentRef} className="w-full px-6 md:px-12 lg:px-24 2xl:px-32 relative z-10 will-change-transform">
        <div className="flex flex-col items-start text-left max-w-3xl">

          {/* Etiqueta de encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 text-[var(--blue)] font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] bg-[var(--blue)]/5 border border-[var(--blue)]/15 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] animate-pulse" />
              Tecnología Para Todos
            </span>
          </motion.div>

          {/* Titulo principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(44px,6.5vw,96px)] font-bold leading-[1.05] tracking-tight text-[var(--near-black)] mb-8"
          >
            La solución
            <br />
            tecnológica
            <br />
            que <span className="relative inline-block text-[var(--blue)]">
              necesitas
              <svg
                className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 text-[var(--blue)]/40"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  ref={underlinePathRef}
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg lg:text-[19px] text-[var(--gray-text)] max-w-xl leading-relaxed mb-10"
          >
            Ofrecemos servicio técnico, desarrollo de software, infraestructura y consultoría tecnológica diseñada a tu medida.
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href={EMPRESA.enlaces.whatsappBase}
              target="_blank"
              className="group flex items-center justify-center gap-2 bg-[var(--near-black)] hover:bg-[var(--near-black)] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-[var(--near-black)]/20"
            >
              Comenzar proyecto
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/servicios"
              className="flex items-center justify-center gap-2 bg-transparent text-[var(--gray-text)] hover:text-[var(--near-black)] border border-[var(--near-black)]/[0.1] hover:border-[var(--near-black)]/[0.25] px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-[var(--off-white)] active:scale-[0.98]"
            >
              Explorar servicios
            </Link>
          </motion.div>

          {/* Barra de metricas y prueba social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center gap-6 text-sm text-[var(--gray-mid)] font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--blue)]" />
              <span>Soporte 24/7</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[var(--gray-mid)]" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--blue)]" />
              <span>Garantía de calidad</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Desvanecimiento inferior para transicion suave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
    </section>
  );
}
