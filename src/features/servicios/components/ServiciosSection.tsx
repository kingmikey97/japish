"use client";

import { useEffect, useRef } from "react";
import { servicios } from "../data/servicios";
import { ServicioCard } from "./ServicioCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServiciosSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const cardCount = cards.length;

      const getTrackDistance = () => {
        const trackW = track.scrollWidth;
        const viewW = window.innerWidth;
        // Distancia perfecta para desplazar horizontalmente
        return Math.max(0, trackW - viewW);
      };

      // ── Animacion de scroll horizontal ──
      gsap.to(track, {
        x: () => -getTrackDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Relacion 1:1: 1px scroll vertical = 1px movimiento horizontal
          end: () => `+=${getTrackDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // 0.5 es muy responsivo y rapido, menos lento que 1
          anticipatePin: 1, // Evita tiron repentino al iniciar el anclaje
          invalidateOnRefresh: true,
        },
      });

      // ── Efecto de profundidad por tarjeta ──
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getTrackDistance()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardCenter = i / (cardCount - 1);
            const dist = Math.abs(progress - cardCenter);

            const scale = gsap.utils.clamp(0.85, 1.0, 1.0 - dist * 0.6);
            const rotY = gsap.utils.clamp(-5, 5, (progress - cardCenter) * 12);

            gsap.set(card, {
              scale,
              rotateY: rotY,
              opacity: 1,
              transformOrigin: "center center",
              force3D: true,
            });
          },
        });
      });

      // Establecer estados iniciales
      gsap.set(cards, { scale: 0.85, opacity: 1 });
      gsap.set(cards[0], { scale: 1.0, opacity: 1, rotateY: 0 });

      // ── Animacion de entrada del encabezado ──
      const headerEls = [eyebrowRef.current, subtitleRef.current].filter(Boolean);
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        headerEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Desplazamientos verticales escalonados reducidos para evitar que se corten en pantallas pequeñas
  const getCardOffset = (index: number) => {
    const offsets = [0, 40, 15, 50];
    return offsets[index % offsets.length];
  };

  return (
    <div ref={wrapperRef} className="relative w-full bg-[var(--dark-bg)]" data-nav-bg="var(--dark-bg)">
      <section
        ref={sectionRef}
        id="servicios"
        className="relative w-full flex flex-col overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* ── Encabezado de seccion ── */}
        <div ref={headerRef} className="absolute top-0 left-0 right-0 z-10 pt-20 lg:pt-28 px-8 lg:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-none">
          <div>
            <p ref={eyebrowRef} className="text-[var(--blue-light)] text-[11px] tracking-[0.22em] uppercase font-semibold mb-4">
              Nuestros servicios
            </p>
            <h2
              ref={titleRef}
              className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] text-white max-w-[800px]"
              style={{ letterSpacing: "-0.025em", textWrap: "balance" } as React.CSSProperties}
            >
              Servicios adaptados<br className="hidden sm:block" /> a tus necesidades
            </h2>
          </div>
          <p ref={subtitleRef} className="text-white/50 text-[14px] leading-[1.7] max-w-[320px] md:text-right font-medium">
            Soluciones tecnológicas completas para empresas y particulares en Bolivia.
          </p>
        </div>

        {/* ── Contenedor de pista de tarjetas ── */}
        <div className="absolute inset-x-0 bottom-0 top-[240px] lg:top-[260px] flex items-center justify-start pb-10">
          <div
            ref={trackRef}
            className="flex items-start gap-6 lg:gap-10 w-max"
            style={{
              paddingLeft: "clamp(300px, 30vw, 450px)",
              paddingRight: "clamp(200px, 25vw, 400px)",
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {servicios.map((servicio, index) => (
              <div
                key={servicio.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="flex-shrink-0 will-change-transform"
                style={{
                  width: "clamp(320px, 30vw, 450px)",
                  transformStyle: "preserve-3d",
                  marginTop: `${getCardOffset(index)}px`,
                }}
              >
                <ServicioCard servicio={servicio} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Vinetas de desvanecimiento en bordes ── */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--dark-bg)] to-transparent z-20 pointer-events-none hidden md:block" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--dark-bg)] to-transparent z-20 pointer-events-none hidden md:block" />
      </section>

      {/* ── Espaciador entre secciones ── */}
      <div className="h-24 lg:h-32" />
    </div>
  );
}
