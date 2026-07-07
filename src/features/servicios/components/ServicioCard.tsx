"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Servicio } from "../types";
import { getWhatsAppLink } from "@/shared/utils/whatsapp";

interface ServicioCardProps {
  servicio: Servicio;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  forwardRef?: React.RefObject<HTMLDivElement | null>;
}

export function ServicioCard({ servicio, index, className = "", style, forwardRef }: ServicioCardProps) {
  const categoryTags = ["Soporte", "Software", "Redes & Seguridad", "Estrategia"];

  return (
    <div
      ref={forwardRef}
      style={style}
      className={`group ${className}`}
    >
      <a
        href={getWhatsAppLink(servicio.slug)}
        target="_blank"
        rel="noopener noreferrer"
        className="servicio-card rounded-2xl p-8 lg:p-10 flex flex-col justify-between min-h-[420px] lg:min-h-[480px] relative overflow-hidden transition-all duration-400 ease-[var(--ease-out)] group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] cursor-pointer will-change-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
      >
        {/* Imagen de fondo que ocupa todo el card */}
        <Image
          src={servicio.imagen}
          alt={servicio.titulo}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay oscuro para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-[1] transition-opacity duration-400 group-hover:from-black/85 group-hover:via-black/50 group-hover:to-black/30" />

        {/* Overlay con brillo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none z-[2]" />

        {/* Encabezado */}
        <div className="flex items-start justify-between relative z-10">
          <span className="text-[11px] tracking-[0.14em] uppercase bg-black/30 text-white/90 px-3 py-1.5 rounded-md font-medium backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--blue)]">
            {categoryTags[index] ?? "Servicio"}
          </span>
          <div className="w-10 h-10 bg-white/15 group-hover:bg-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-sm">
            <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[var(--blue)] transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Espaciador flexible */}
        <div className="flex-1" />

        {/* Pie */}
        <div className="relative z-10">
          <h3 className="text-[22px] font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {servicio.titulo}
          </h3>
          <p className="text-[14px] leading-[1.7] text-white/85 group-hover:text-white transition-colors duration-300 max-w-[95%] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            {servicio.descripcion}
          </p>
        </div>
      </a>
    </div>
  );
}
