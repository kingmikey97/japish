'use client';

import { motion } from 'framer-motion';
import { Zap, RefreshCw, Smartphone, Shield, Globe, Leaf } from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  size: 'large' | 'small';
}

const features: FeatureItem[] = [
  {
    icon: Zap,
    title: 'Instantáneo',
    description: 'Comparte tu información o la de tu empresa en menos de 1 segundo. Solo acerca o escanea tu tarjeta y LISTO!!!.',
    size: 'large',
  },
  {
    icon: RefreshCw,
    title: 'Actualizable',
    description: 'Actualiza tus datos cuando quieras. Sin reimprimir la tarjeta, sin desperdicios.',
    size: 'small',
  },
  {
    icon: Globe,
    title: 'Perfil Web',
    description: 'Cada tarjeta tiene su URL única, al fin tendras presencia en el mundo profesional digital con tu propia PAGINA WEB. Compártela por cualquier medio.',
    size: 'large',
  },
  {
    icon: Smartphone,
    title: 'Universal',
    description: 'Compatible con iPhone y Android. No necesitas apps adicionales. (si no tienes NFC, escanea el codigo QR)',
    size: 'small',
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Comparte solo los datos que quieres mostrar, datos netamente de tu negocio o emprendimiento y si tu eres tu propio producto comparte tus datos profesionales y no personales.',
    size: 'small',
  },
  {
    icon: Leaf,
    title: 'Ecológico',
    description: 'Reduce el papel. Una tarjeta JAPISH puede escanearse mas de 10000000000+ olvidate que tu tarjeta quede en la basura despues de ver tus datos (dinero perdido si el cliente no te contacta).',
    size: 'small',
  },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  return (
    <section className="py-24 bg-[var(--near-black)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center lg:text-left flex flex-col items-center lg:items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-[1.1] mb-5">
            ¿Por qué elegir <span className="text-[var(--blue)]">JAPISH</span>?
          </h2>
          <p className="text-lg text-white/60 font-medium max-w-[55ch]">
            Tecnología NFC de última generación para profesionales que quieren causar una primera impresión que se recuerde.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {/* Celda grande: Instantáneo */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 sm:p-10 flex flex-col justify-between group hover:border-[var(--blue)]/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-[var(--blue)]/10 transition-all duration-300"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="w-14 h-14 rounded-full bg-[var(--blue)]/20 flex items-center justify-center mb-8 group-hover:bg-[var(--blue)]/30 group-hover:scale-110 transition-all duration-300">
              <Zap size={26} className="text-[var(--blue)]" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Instantáneo</h3>
              <p className="text-white/60 text-lg max-w-[45ch] leading-relaxed">
                Comparte tu información o la de tu empresa en menos de 1 segundo. Solo acerca o escanea tu tarjeta y LISTO!!!.
              </p>
            </div>
          </motion.div>

          {/* Celda grande: perfil web */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 sm:p-10 flex flex-col justify-between group hover:border-[var(--blue)]/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-[var(--blue)]/10 transition-all duration-300 md:order-3 lg:order-none"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.15 } } }}
          >
            <div className="w-14 h-14 rounded-full bg-[var(--blue)]/20 flex items-center justify-center mb-8 group-hover:bg-[var(--blue)]/30 group-hover:scale-110 transition-all duration-300">
              <Globe size={26} className="text-[var(--blue)]" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Tu propio perfil web</h3>
              <p className="text-white/60 text-lg max-w-[45ch] leading-relaxed">
                Cada tarjeta tiene su URL única, al fin tendras presencia en el mundo profesional digital con tu propia PAGINA WEB. Compártela por cualquier medio.
              </p>
            </div>
          </motion.div>

          {/* Celdas pequeñas */}
          {features.slice(1).filter(f => f.size === 'small').map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-6 group hover:border-[var(--blue)]/40 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-[var(--blue)]/10 transition-all duration-300"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.1 * (i + 1) } } }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--blue)]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} className="text-white/80 group-hover:text-[var(--blue)] transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-base text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
