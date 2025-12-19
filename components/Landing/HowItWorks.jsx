'use client';

import { CreditCard, Smartphone, Share2 } from 'lucide-react';

export default function HowItWorks() {
  
  const steps = [
    {
      number: "01",
      icon: CreditCard,
      title: "Obtén tu tarjeta",
      description: "Elige el diseño de tu pagina web, envianos tus datos con el diseño de tu tarjeta fisica y recibe tu tarjeta NFC en 24 horas.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      number: "02",
      icon: Smartphone,
      title: "Acerca y conecta",
      description: "Simplemente acerca tu tarjeta al smartphone de tu contacto. ¡JAPISH! Instantáneo.",
      color: "from-purple-400 to-pink-500"
    },
    {
      number: "03",
      icon: Share2,
      title: "Impacta y conecta",
      description: "Tu perfil o el de tu empresa se abre automáticamente. Redes sociales, contacto, una breve descripcion de lo que haces y todo en un solo lugar.",
      color: "from-orange-400 to-red-500"
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative">
      
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tan fácil como <span className="text-cyan-400">1-2-3</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            En menos de 1 dia tendrás tu PAGINA WEB y presencia digital lista!
          </p>
        </div>
        
        {/* Timeline de pasos */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Línea conectora (desktop) */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500"></div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={index} className="relative">
                  
                  {/* Círculo del número */}
                  <div className="relative z-10 flex flex-col items-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg ring-4 ring-slate-900`}>
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Card de contenido */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                    
                    {/* Ícono */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <Icon size={32} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    {/* Descripción */}
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                    
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
        
      </div>
    </section>
  );
}