'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { CreditCard, Smartphone, Share2 } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: CreditCard,
    title: 'Elige tu plan',
    description: 'Elige el diseño de tu pagina web, envianos tus datos con el diseño de tu tarjeta fisica y recibe tu tarjeta NFC en 24 horas.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Acerca y conecta',
    description: 'Simplemente acerca tu tarjeta al smartphone de tu contacto. ¡JAPISH! Instantáneo.',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Impacta y conecta',
    description: 'Tu perfil o el de tu empresa se abre automáticamente. Redes sociales, contacto, una breve descripcion de lo que haces y todo en un solo lugar.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--near-black)]/[0.06]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--near-black)]/[0.06]" />

      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[var(--near-black)] leading-[1.1] mb-5">
            Tan fácil como <span className="text-[var(--blue)]">1–2–3</span>
          </h2>
          <p className="text-lg text-[var(--gray-text)] font-medium">
            En menos de 24 horas tendrás tu página web y presencia digital lista.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--near-black)]/[0.07] rounded-2xl border border-[var(--near-black)]/[0.07] overflow-hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="bg-white p-8 lg:p-10 flex flex-col gap-6 hover:bg-zinc-50 transition-colors group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as any }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-6xl font-black text-[var(--near-black)]/[0.06] select-none leading-none">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center group-hover:bg-[var(--blue)]/20 transition-colors">
                    <Icon size={22} className="text-[var(--blue)]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--near-black)] mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[var(--gray-text)] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}