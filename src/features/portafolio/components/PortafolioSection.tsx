"use client";

import { useRef } from "react";
import { Pointer } from "lucide-react";
import { useReducedMotion, motion, useScroll, useTransform } from "framer-motion";
import { portafolio } from "../data/portafolio";
import { ProyectoCard } from "./ProyectoCard";


const DISPLAY_COUNT = 4;

const BENTO_LAYOUT = [
  { span: "lg" as const, cols: "lg:col-span-2 lg:row-span-2" },
  { span: "md" as const, cols: "lg:col-span-1 lg:row-span-1" },
  { span: "md" as const, cols: "lg:col-span-1 lg:row-span-1" },
  { span: "sm" as const, cols: "lg:col-span-2 lg:row-span-1" },
];

export function PortafolioSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const clipY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const clipPath = useTransform(clipY, (v) => `inset(0 0 ${v}% 0)`);

  //const featured = portafolio.slice(0, DISPLAY_COUNT);

  const featured = portafolio.filter((p) => p.slug === "japish");
  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-24 lg:py-32 overflow-hidden relative"
      id="portafolio"
    >
      <motion.div
        className="w-full px-8 lg:px-16 2xl:px-32"
        style={reduce ? undefined : { clipPath }}
      >
        {/* ── Encabezado ── */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12 lg:mb-16"
        >
          <p className="text-[var(--blue)] text-[11px] tracking-[0.22em] uppercase font-semibold mb-5">
            Casos de Éxito
          </p>
          <h2 className="text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.08] text-[var(--near-black)] max-w-[900px]">
            Proyectos Destacados
          </h2>
        </motion.div>

        {/* ── Cuadricula ── */}
        {/*<div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          style={reduce ? undefined : { perspective: "1200px" }}
        >*/}
          <div className="flex justify-center">
            {featured.map((proyecto)=>(
              <div key={proyecto.id} className="w-full max-w-[800px] relative">
                <ProyectoCard proyecto={proyecto} size="lg"/>

              </div>
            ))}
          </div>

          {!reduce && (
            <motion.div
              className="flex justify-center mt-8 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2.5 text-gray-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Pointer className="w-7 h-7" />
                <span className="text-[15px] font-semibold tracking-wider">Toca aquí</span>
              </motion.div>
            </motion.div>
          )}

          {/*{featured.map((proyecto, i) => {
            const layout = BENTO_LAYOUT[i];
            const entrance = [
              { opacity: 0, y: 60, x: -20, scale: 0.92 },
              { opacity: 0, y: 50, x: 0, scale: 0.94 },
              { opacity: 0, y: 50, x: 20, scale: 0.94 },
              { opacity: 0, y: 40, x: 0, scale: 0.95 },
            ][i];
            return (
              <motion.div
                key={proyecto.id}
                initial={reduce ? undefined : entrance}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: 0.2 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={layout.cols}
              >
                <ProyectoCard
                  proyecto={proyecto}
                  size={layout.span}
                />
              </motion.div>
            );
          })}
        </div>*/}
      </motion.div>
    </section>
  );
}
