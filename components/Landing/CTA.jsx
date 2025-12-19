'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Título */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ¿Listo para dar el salto al futuro?
          </h2>
          
          {/* Descripción */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a los profesionales y empresarios que ya están impresionando con su tarjeta digital JAPISH!
          </p>
          
          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/64256727?text=Hola! Quiero mi tarjeta JAPISH"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} />
              Contactar por WhatsApp
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Ver pricing */}
            <a
              href="#pricing"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30 flex items-center justify-center gap-2"
            >
              Ver planes
            </a>
            
          </div>
          
          {/* Footer info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Listo en 24 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Envios a toda Bolivia </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Soporte incluido</span>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Footer bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 JAPISH by <span className="text-cyan-400 font-semibold">ValhallaTechnology</span>.Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}