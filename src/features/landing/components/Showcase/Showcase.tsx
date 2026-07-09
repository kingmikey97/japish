'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Check } from 'lucide-react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Showcase() {
  return (
    <section 
      className={`py-24 bg-white relative overflow-hidden ${dmSans.variable}`}
    >
      
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Encabezado */}
        <motion.div 
          className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#020617] mb-5 leading-[1.1]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ve cómo funciona en acción con datos reales
          </h2>
          <p 
            className="text-lg text-slate-600 font-medium max-w-[45ch]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Esta es la tarjeta digital del fundador de JAPISH
          </p>
        </motion.div>
        
        {/* Contenedor de demo */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
            
            {/* Izquierda - Texto y pildoras flotantes */}
            <motion.div 
              className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left relative"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-5 py-2 mb-8 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] animate-pulse" />
                <span 
                  className="text-[#3b82f6] text-sm font-bold tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  Demo en vivo
                </span>
              </motion.div>
              
              <h3 
                className="text-3xl sm:text-4xl font-extrabold text-[#020617] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Michael B. Mamani Cruz
              </h3>
              
              <p 
                className="text-slate-500 text-lg sm:text-xl font-medium mb-10"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                CEO & Founder de ValhallaTechnology.
              </p>
              
              {/* Pildoras de caracteristicas */}
              <div className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start">
                {[
                  "Perfil web personalizado",
                  "Enlaces a redes sociales",
                  "Contacto directo por WhatsApp"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm rounded-2xl px-5 py-3 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-[#3b82f6]" strokeWidth={3} />
                    </div>
                    <span 
                      className="text-slate-700 font-bold"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <motion.a
                href="japish/mikey"
                target="_blank"
                className="group inline-flex items-center justify-center gap-2 bg-[#3b82f6] text-white px-8 py-4.5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 active:scale-[0.97] shadow-lg shadow-blue-500/20"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver perfil completo
                <ExternalLink size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

            </motion.div>
            
            {/* Derecha - Vista previa de tarjeta en 3D */}
            <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end perspective-1000">
              <motion.div 
                className="relative w-full max-w-[320px] aspect-[9/19]"
                initial={{ opacity: 1, y: 50, rotateX: 10, rotateY: -15, rotateZ: 5 }}
                whileInView={{ y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
              >
                {/* Sombra 3D en el suelo */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-slate-900/10 blur-xl rounded-[100%]" />

                {/* Maqueta de smartphone */}
                <div className="relative w-full h-full bg-[#020617] rounded-[3rem] border-[8px] border-slate-100 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1),-10px_-10px_40px_0px_rgba(255,255,255,0.8)] overflow-hidden ring-1 ring-slate-200/50 backface-hidden" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Notch/Isla dinamica moderna */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-[#020617] rounded-[20px] z-20 flex items-center justify-between px-3 shadow-sm">
                     <div className="w-10 h-1.5 rounded-full bg-slate-800" />
                     <div className="w-3.5 h-3.5 rounded-full bg-[#0a0a0a] border border-slate-700/50 shadow-inner" />
                  </div>
                  
                  {/* Iframe con el perfil */}
                  <div className="w-full h-full bg-white relative backface-hidden" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Estado de carga debajo del iframe */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                       <div className="w-8 h-8 border-3 border-[#3b82f6]/30 border-t-[#3b82f6] rounded-full animate-spin" />
                       <span className="text-slate-400 text-sm font-medium" style={{ fontFamily: 'var(--font-dm-sans)' }}>Cargando demo...</span>
                    </div>
                    <iframe
                      src="/japish/mikey"
                      className="w-full h-full border-none relative z-10 bg-transparent"
                      title="Demo de tarjeta JAPISH"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Indicador de inicio */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-slate-300 rounded-full z-20" />
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
