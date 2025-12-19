'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Showcase() {
  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      
      {/* Background con círculos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ve cómo funciona <span className="text-cyan-400">en acción</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Esta es la tarjeta digital del fundador de JAPISH
          </p>
        </div>
        
        {/* Demo container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Izquierda - Texto */}
              <div>
                <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                  <span className="text-cyan-400 text-sm font-semibold">Demo en vivo</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  Michael B. Mamani Cruz
                </h3>
                
                <p className="text-gray-400 mb-6">
                  CEO & Founder de ValhallaTechnology.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                    <span>Perfil web personalizado</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                    <span>Enlaces a redes sociales</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                    <span>Contacto directo por WhatsApp</span>
                  </li>
                </ul>
                
                <a
                  href="/profile/mikey"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50"
                >
                  Ver perfil completo
                  <ExternalLink size={18} />
                </a>
              </div>
              
              {/* Derecha - Preview de tarjeta */}
              <div className="relative">
                <div className="aspect-[9/16] max-w-xs mx-auto">
                  {/* Mockup de smartphone */}
                  <div className="relative w-full h-full bg-slate-900 rounded-[3rem] border-8 border-slate-700 shadow-2xl overflow-hidden">
                    
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-700 rounded-b-3xl z-20"></div>
                    
                    {/* Iframe con tu perfil */}
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-auto">
                      <iframe
                        src="/profile/mikey"
                        className="w-full h-full border-none"
                        title="Demo de tarjeta JAPISH"
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}