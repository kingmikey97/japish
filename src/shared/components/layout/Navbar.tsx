"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { EMPRESA } from "@/shared/constants/empresa";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sectionBg, setSectionBg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [indicatorTarget, setIndicatorTarget] = useState(-1);
  const pathname = usePathname();
  
  const[hash, setHash] = useState("");

 

  const navPillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  //const activeIndex = NAV_LINKS.findIndex((link) => link.href === pathname);
  const activeIndex = NAV_LINKS.findIndex((link) => {
    if(pathname === "/" && hash){
      return link.href ===`/#${hash.slice(1)}`;
    }
    return link.href === pathname;
  })
  // ─── Montaje y movimiento reducido ───
  useEffect(() => {
    setMounted(true);
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // ─── Deteccion de scroll — lee data-nav-bg de secciones ───
  useEffect(() => {
    const onScroll = () => {
      const navbarHeight = 72;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-bg]");

      let bg: string | null = null;
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= navbarHeight / 2 && rect.bottom >= navbarHeight / 2) {
          bg = sec.getAttribute("data-nav-bg");
        }
      });

      setSectionBg(bg);
      setHash(window.location.hash);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Animacion del indicador deslizante ───
  const moveIndicator = useCallback(
    (targetEl: HTMLElement | null, animate = true) => {
      if (!targetEl || !indicatorRef.current || !navPillRef.current) return;

      const container = navPillRef.current.getBoundingClientRect();
      const target = targetEl.getBoundingClientRect();

      const props = {
        left: target.left - container.left,
        width: target.width,
        opacity: 1,
      };

      if (animate && !prefersReducedMotion.current) {
        gsap.to(indicatorRef.current, {
          ...props,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.set(indicatorRef.current, props);
      }
    },
    []
  );

  // ─── Posicionar indicador al montar y cambiar ruta ───
  useEffect(() => {
    if (!mounted || !indicatorRef.current) return;
    gsap.set(indicatorRef.current, { opacity: 0 });
  }, [mounted]);  // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Recalcular al redimensionar ───
  useEffect(() => {
    const onResize = () => {
      const idx = indicatorTarget;
      if (idx !== -1) {
        moveIndicator(linkRefs.current[idx], false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [indicatorTarget, moveIndicator]);  // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Manejadores de hover ───
  const handleLinkHover = (index: number) => {
    setIndicatorTarget(index);
    moveIndicator(linkRefs.current[index], true);
  };

  const handleNavLeave = () => {
    setIndicatorTarget(-1);
    // Matar cualquier animación pendiente y ocultar instantáneamente
    if (indicatorRef.current) {
      gsap.killTweensOf(indicatorRef.current);
      gsap.set(indicatorRef.current, { opacity: 0 });
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      )}
    >
      <div className="w-full px-4 lg:px-6 flex justify-between lg:grid lg:grid-cols-3 items-center h-16 lg:h-[72px]">
        {/* ─── Logo (izquierda) ─── */}
        <Link
          href="/"
          className="flex items-center shrink-0 group"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="ValhallaTechnology logo"
            width={740}
            height={445}
            className={cn(
              "mr-2 shrink-0 transition-all duration-500",
              sectionBg && "brightness-0 invert"
            )}
            style={{ width: "auto", height: "2rem" }}
            loading="eager"
          />
          <div className="flex items-center">
            <span
              className={cn(
                "text-[15px] font-bold tracking-[0.06em] uppercase transition-colors duration-300 group-hover:text-[var(--blue)]",
                sectionBg ? "text-white" : "text-[var(--near-black)]"
              )}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Valhalla
            </span>
            <span
              className="hidden sm:inline-block ml-1 text-[15px] font-bold tracking-[0.06em] text-[var(--blue)] uppercase"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Technology
            </span>
          </div>
        </Link>

        {/* ─── Navegacion de escritorio (centro) ─── */}
        <nav
          ref={navPillRef}
          className={cn(
            "hidden lg:flex items-center justify-self-center relative rounded-full border p-[5px] transition-colors duration-500 backdrop-blur-md",
            sectionBg
              ? "border-white/[0.08]"
              : "bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-[var(--near-black)]/[0.08]"
          )}
          style={
            sectionBg
              ? { backgroundColor: `color-mix(in oklab, ${sectionBg} 80%, transparent)` }
              : undefined
          }
          onMouseLeave={handleNavLeave}
        >
          <div
            ref={indicatorRef}
            className="absolute top-[5px] h-[calc(100%-10px)] rounded-full bg-[var(--blue)] pointer-events-none opacity-0"
            style={{ willChange: "transform, width, left" }}
            aria-hidden="true"
          />

          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              onMouseEnter={() => handleLinkHover(i)}
              onClick={() =>{
                const idx = link.href.indexOf("#");
                setHash(idx !== -1 ? link.href.slice(idx) : "");
              }}
              className={cn(
                "relative z-10 text-[13.5px] px-[18px] py-[7px] rounded-full font-medium transition-colors duration-200 select-none",
                indicatorTarget === i
                  ? "text-white"
                  : sectionBg
                  ? "text-white/60 hover:text-white"
                  : "text-[var(--near-black)]/65 hover:text-[var(--near-black)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ─── CTA escritorio + Alternar movil (derecha) ─── */}
        <div className="flex items-center lg:justify-self-end lg:col-start-3">
          {/* CTA de escritorio */}
          <Link
            href="/japish"
            //target="_blank"
            //rel="noopener noreferrer"
            className={cn(
              "hidden lg:flex group relative items-center gap-2 border rounded-full pl-5 pr-[5px] py-[5px] text-[13.5px] font-medium transition-all duration-300 backdrop-blur-md",
              sectionBg
                ? "border-white/[0.1] text-white hover:border-[var(--blue)]/50"
                : "bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-[var(--near-black)]/[0.08] text-[var(--near-black)] hover:border-[var(--blue)]/30 hover:text-[var(--blue)]"
            )}
            style={
              sectionBg
                ? { backgroundColor: `color-mix(in oklab, ${sectionBg} 80%, transparent)` }
                : undefined
            }
          >
          
            <span>Japish</span>
            <span className="w-[30px] h-[30px] bg-[var(--blue)] rounded-full flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </span>
          </Link>

          {/* Alternar menu movil */}
          <button
            className={cn(
              "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 active:scale-95",
              sectionBg
                ? "text-white/80 hover:bg-white/10 hover:text-white"
                : "text-[var(--near-black)]/70 hover:bg-neutral-100 hover:text-[var(--near-black)]"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? (
              <X className="w-[22px] h-[22px]" />
            ) : (
              <Menu className="w-[22px] h-[22px]" />
            )}
          </button>
        </div>
      </div>

      {/* ─── Navegacion movil ─── */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
      >
        <nav
          className={cn(
            "px-6 pt-2 pb-6 flex flex-col gap-1 border-t transition-colors duration-500",
            sectionBg
              ? "border-white/[0.06]"
              : "border-[var(--near-black)]/[0.06] bg-white"
          )}
          style={
            sectionBg
              ? { backgroundColor: sectionBg, borderColor: "rgba(255,255,255,0.06)" }
              : undefined
          }
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                "text-[15px] font-medium px-4 py-3 rounded-xl transition-colors duration-150",
                pathname === link.href
                  ? "text-white bg-[var(--blue)]"
                  : sectionBg
                  ? "text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10"
                  : "text-[var(--near-black)]/60 hover:text-[var(--near-black)] hover:bg-neutral-50 active:bg-neutral-100"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="pt-4 mt-3 border-t"
            style={{
              borderColor: sectionBg ? "rgba(255,255,255,0.06)" : "rgba(2,6,23,0.06)",
            }}
          >
            <Link
              href="/japish"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full bg-[var(--blue)] text-white py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 hover:bg-[var(--blue-dark)] active:scale-[0.98]"
            >
              Japish
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
