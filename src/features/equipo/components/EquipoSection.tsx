"use client";

import { useReducedMotion, motion } from "framer-motion";
import Image from "next/image";
import { Wrench, Code2, Server } from "lucide-react";
import { equipo } from "../data/equipo";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Code2,
  Server,
};

export function EquipoSection() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-[var(--near-black)] py-24 lg:py-32 overflow-hidden" id="equipo" data-nav-bg="var(--near-black)">
      <div className="w-full px-8 lg:px-16 2xl:px-32 mb-16 lg:mb-20">
        <SectionTitle eyebrow="Quiénes Somos" variant="dark" align="center">
          <h2 className="text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.08] text-white max-w-[900px]">
            Profesionales apasionados por la tecnología
          </h2>
        </SectionTitle>
      </div>

      <div className="w-full px-8 lg:px-16 2xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
          {equipo.map((miembro, index) => {
            const Icon = iconMap[miembro.icono] ?? Wrench;

            const card = (
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-row-reverse border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[var(--blue-light)]/25 transition-all duration-500"
              >
                {/* ── Imagen ── */}
                <div className="relative w-[45%] min-h-[280px] overflow-hidden lg:-ml-[3%] 2xl:ml-0 z-10">
                  <Image
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                  />
                </div>

                {/* ── Contenido ── */}
                <div className="flex-1 pl-6 lg:pl-8 py-6 lg:py-8 pr-6 lg:pr-8 relative z-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--blue)]/15 flex items-center justify-center text-[var(--blue-light)] shrink-0">
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--blue-light)] font-semibold">
                      {miembro.rol}
                    </span>
                  </div>

                  <h3 className="text-[20px] lg:text-[22px] font-bold text-white leading-[1.25] mb-3">
                    {miembro.nombre}
                  </h3>

                  <p className="text-[14px] lg:text-[15px] text-white/50 leading-relaxed">
                    {miembro.bio}
                  </p>
                </div>
              </motion.div>
            );

            if (index === 2) {
              return (
                <div key={miembro.id} className="md:col-span-2 lg:col-span-2 2xl:col-span-1 flex justify-center">
                  {card}
                </div>
              );
            }

            return <div key={miembro.id}>{card}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
