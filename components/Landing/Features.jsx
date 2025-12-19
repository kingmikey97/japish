'use client';

import { Zap, Shield, Smartphone, RefreshCw, Globe, Leaf } from 'lucide-react';

export default function Features() {
  
  // Array con las características
  const features = [
    {
      icon: Zap,
      title: "Instantáneo",
      description: "Comparte tu información o la de tu empresa en menos de 1 segundo. Solo acerca o escanea tu tarjeta y LISTO!!!.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: RefreshCw,
      title: "Actualizable",
      description: "Actualiza tus datos cuando quieras. Sin reimprimir la tarjeta, sin desperdicios.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Universal",
      description: "Compatible con iPhone y Android. No necesitas apps adicionales. (si no tienes NFC, escanea el codigo QR)",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Seguro",
      description: "Comparte solo los datos que quieres mostrar, datos netamente de tu negocio o emprendimiento y si tu eres tu propio producto comparte tus datos profesionales y no personales.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Perfil Web",
      description: "Cada tarjeta tiene su URL única, al fin tendras presencia en el mundo profesional digital con tu propia PAGINA WEB. Compártela por cualquier medio.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Leaf,
      title: "Ecológico",
      description: "Reduce el papel. Una tarjeta JAPISH puede escanearse mas de 10000000000+ olvidate que tu tarjeta quede en la basura despues de ver tus datos (dinero perdido si el cliente no te contacta).",
      color: "from-lime-400 to-green-500"
    }
  ];
  
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        
        {/* Header de sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Por qué elegir <span className="text-cyan-400">JAPISH</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología NFC de última generación para profesionales y empresarios modernos
          </p>
        </div>
        
        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 hover:border-cyan-500/30"
              >
                {/* Ícono con gradiente */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}