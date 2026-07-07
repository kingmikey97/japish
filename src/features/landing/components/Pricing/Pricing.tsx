'use client';

import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Básico",
    price: "200 bs.",
    description: "Perfecto para empezar",
    features: [
      "1 tarjeta NFC/QR mas su impresion",
      "3 diseños a elegir",
      "Actualizaciones ilimitadas",
      "Hasta 5 links",
      "Soporte continuo",
    ],
    cta: "Comenzar",
    popular: false
  },
  {
    name: "Profesional",
    price: "250 bs.",
    description: "El más elegido",
    features: [
      "Todo del plan Básico",
      "5 diseños premium",
      "Breve apartado de productos o servicios",
      "Hasta 10 Links",
      "Soporte prioritario"
    ],
    cta: "Elegir Pro",
    popular: true
  },
  {
    name: "Premium",
    price: "350 bs.",
    description: "Máxima personalización",
    features: [
      "Todo del plan Profesional",
      "Diseño 100% único (lo hacemos contigo)",
      "Hasta tres apartados de tus servicios o productos",
      "Links Ilimitados",
      "Consultoria de Branding",
      "Soporte 24/7",  
      "(El precio puede variar de acuerdo a complejidad)"      
    ],
    cta: "Ir Premium",
    popular: false
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Pricing() {
  return (
    <section 
      id="pricing" 
      data-nav-bg="#020617"
      className={`py-24 relative overflow-hidden ${dmSans.variable}`}
      style={{ backgroundColor: '#020617' }}
    >

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Encabezado */}
        <motion.div
          className="mb-16 text-center flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideUp}
        >
          <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 text-[#3b82f6] px-4 py-1.5 rounded-full font-bold text-sm tracking-wide mb-6 uppercase">
            Inversión Única
          </div>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Planes para cada profesional
          </h2>
          <p 
            className="text-lg text-slate-400 font-medium max-w-[55ch]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Elige el plan que mejor se adapte a tus necesidades. Paga una vez, usa para siempre.
          </p>
        </motion.div>

        {/* Tarjetas de precios */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] p-8 sm:p-10 transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#3b82f6] text-white shadow-2xl shadow-blue-500/10 md:scale-105 z-10 border border-[#3b82f6]'
                  : 'bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.05]'
              }`}
              variants={slideUp}
            >
              
              {/* Insignia popular */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-white text-[#020617] text-sm font-extrabold px-5 py-2 rounded-full shadow-lg">
                  <Star size={16} fill="currentColor" />
                  <span style={{ fontFamily: 'var(--font-dm-sans)' }}>MÁS ELEGIDO</span>
                </div>
              )}

              {/* Encabezado de tarjeta */}
              <div className="mb-8">
                <h3 
                  className="text-2xl font-bold mb-2 tracking-tight text-white"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {plan.name}
                </h3>
                <p 
                  className={`text-[15px] min-h-[44px] ${plan.popular ? 'text-blue-100' : 'text-slate-400'}`}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span 
                    className="text-4xl lg:text-5xl font-extrabold tracking-tighter"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Lista de caracteristicas */}
              <ul className="flex-grow flex flex-col gap-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-[#3b82f6]/20'}`}>
                      <Check size={12} className={plan.popular ? 'text-white' : 'text-[#3b82f6]'} strokeWidth={3} />
                    </div>
                    <span 
                      className={`text-[15px] leading-snug font-medium ${plan.popular ? 'text-blue-50' : 'text-slate-300'}`}
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Boton de CTA */}
              <motion.a
                href={`https://wa.me/+59164256727?text=Hola! Quiero el plan ${plan.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto flex items-center justify-center gap-2 w-full px-6 py-4.5 rounded-2xl font-bold text-lg transition-all duration-300 active:scale-[0.97] ${
                  plan.popular
                    ? 'bg-white text-[#020617] hover:bg-slate-100'
                    : 'bg-white/10 text-white hover:bg-[#3b82f6] hover:border-transparent border border-white/20'
                }`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.cta}
                <ArrowRight size={18} className="transition-transform duration-300" />
              </motion.a>
              
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
