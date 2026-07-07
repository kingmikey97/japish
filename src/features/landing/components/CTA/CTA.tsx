'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function CTA() {
  return (
    <section 
      className={`py-24 bg-white relative overflow-hidden ${dmSans.variable}`}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div 
          className="max-w-5xl mx-auto bg-white rounded-[3rem] p-10 sm:p-16 lg:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleUp}
        >
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Titulo */}
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#020617] leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              ¿Listo para dar el <br className="hidden sm:block" />
          
                salto al futuro?
           
            </h2>   
            
            {/* Descripcion */}
            <p 
              className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Únete a los profesionales y empresarios que ya están impresionando con su tarjeta digital JAPISH!
            </p>
            
            {/* Botones flotantes */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
              
              {/* CTA de WhatsApp */}
              <motion.a
                href="https://wa.me/64256727?text=Hola! Quiero mi tarjeta JAPISH"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4.5 bg-[#3b82f6] text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 active:scale-[0.97] shadow-lg shadow-blue-500/20"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={22} />
                Contactar por WhatsApp
              </motion.a>
              
              {/* Ver precios */}
              <motion.a
                href="#pricing"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4.5 bg-white text-[#020617] rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-[#3b82f6] transition-all duration-300 active:scale-[0.97]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Ver planes
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              
            </div>
            
            {/* Pildoras informativas */}
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              {[
                { text: "Listo en 24 horas" },
                { text: "Envios a toda Bolivia" },
                { text: "Soporte incluido" }
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-slate-600 font-semibold text-sm border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                  <span style={{ fontFamily: 'var(--font-dm-sans)' }}>{info.text}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
