"use client";

import { useRef } from "react";
import { Proyecto } from "../types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface ProyectoCardProps {
  proyecto: Proyecto;
  size?: "sm" | "md" | "lg";
}

export function ProyectoCard({ proyecto, size = "md" }: ProyectoCardProps) {
  const isJapish = proyecto.slug === "japish";
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);

  const heightClass = {
    sm: "h-[260px]",
    md: "h-[340px]",
    lg: "h-[400px]",
  }[size];

  // ── Efecto tilt 3D (solo JAPISH) ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], reduce ? ["0deg", "0deg"] : ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], reduce ? ["0deg", "0deg"] : ["-10deg", "10deg"]);

  function handlePointerMove(e: React.PointerEvent) {
    if (!cardRef.current || !isJapish || reduce) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  // ── JAPISH — Card con efectos interactivos ──
  if (isJapish) {
    return (
      <motion.div
        className={heightClass}
        style={reduce ? undefined : { perspective: "1200px" }}
      >
        <motion.a
          ref={cardRef}
          href={proyecto.href || `/portafolio#${proyecto.slug}`}
          className="group relative block w-full h-full rounded-2xl overflow-hidden transition-shadow duration-500 ease-out hover:shadow-[0_8px_40px_rgba(26,61,196,0.15)]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* ── Borde con gradiente ── */}
          <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-[#5ee6ff]/55 via-[#1c3fd4]/25 to-white/10">
            {/* ── Fondo oscuro interior ── */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#05060a] isolate">
              {/* ── Textura puffy con Ken Burns ── */}
              {!reduce && (
                <motion.div
                  className="absolute inset-[-10px] bg-[url('/images/portfolio/bg-puffy.png')] bg-cover bg-center will-change-transform"
                  animate={{ scale: 1.16, x: -14, y: 10 }}
                  transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
                              )}
              {reduce && (
                <div className="absolute inset-[-10px] bg-[url('/images/portfolio/bg-puffy.png')] bg-cover bg-center" />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#070814]/18" />

              {/* ── Imagen del producto ── */}
              <div className="absolute inset-0 rounded-xl overflow-hidden drop-shadow-[0_14px_26px_rgba(0,0,0,0.55)]">
                <motion.img
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  className="w-full h-full object-contain"
                  style={{ transformOrigin: "56% 48%" }}
                  animate={reduce ? undefined : { scale: 1.06 }}
                  transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                  loading="lazy"
                />

                {/* ── Sheen (brillo diagonal) ── */}
                {!reduce && (
                  <motion.div
                    className="absolute top-[-30%] left-[-65%] w-[50%] h-[170%] bg-gradient-to-r from-transparent via-white/20 to-transparent mix-blend-screen pointer-events-none"
                    style={{ transform: "rotate(12deg)" }}
                    animate={{ x: ["-40%", "220%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                  />
                )}

                {/* ── NFC Glow ── */}
                {!reduce && (
                  <motion.div
                    className="absolute w-[30%] h-[30%] top-[30%] right-[12%] rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(120,200,255,0.85) 0%, rgba(94,230,255,0.2) 55%, rgba(94,230,255,0) 75%)",
                      filter: "blur(8px)",
                      mixBlendMode: "screen",
                    }}
                    animate={{ scale: [1, 1.25], opacity: [0.3, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                )}

                {/* ── Sombra interior ── */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 20px 6px rgba(0,0,0,0.3)" }}
                />
              </div>
            </div>
          </div>

          {/* ── Insignia de categoria ── */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/10">
              {proyecto.categoria}
            </span>
          </div>

          {/* ── Fecha ── */}
          <div className="absolute top-4 right-4 z-10">
            <span className="text-[10px] font-medium text-white/50">
              {proyecto.fecha}
            </span>
          </div>

          {/* ── Contenido inferior ── */}
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[17px] lg:text-[19px] font-bold text-white leading-[1.25] mb-2">
                  {proyecto.titulo}
                </h3>
                <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 max-w-[90%]">
                  {proyecto.descripcion}
                </p>
              </div>
              <div className="shrink-0 w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out border border-white/10">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </motion.a>
      </motion.div>
    );
  }

  // ── Card normal (demás proyectos) ──
  return (
    <Link
      href={proyecto.href || `/portafolio#${proyecto.slug}`}
      className={cn(
        "group relative block rounded-2xl overflow-hidden",
        heightClass,
        "transition-all duration-500 ease-out",
        "hover:shadow-[0_8px_40px_rgba(26,61,196,0.15)] hover:-translate-y-1"
      )}
    >
      <img
        src={proyecto.imagen}
        alt={proyecto.titulo}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDBoMjB2NDBIMTB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')]" />

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute top-4 left-4">
        <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/10">
          {proyecto.categoria}
        </span>
      </div>

      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-medium text-white/50">
          {proyecto.fecha}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] lg:text-[19px] font-bold text-white leading-[1.25] mb-2 transition-colors duration-300">
              {proyecto.titulo}
            </h3>
            <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 max-w-[90%]">
              {proyecto.descripcion}
            </p>
          </div>
          <div className="shrink-0 w-[36px] h-[36px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out border border-white/10">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
