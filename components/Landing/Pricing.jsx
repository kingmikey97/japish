'use client';

import { Check, Star } from 'lucide-react';

export default function Pricing() {
  
  const plans = [
    {
      name: "Básico",
      price: "200",
      description: "Perfecto para empezar",
      features: [
        "1 tarjeta NFC/QR mas su impresion",
        "5 diseños a elegir",
        "Actualizaciones ilimitadas",
        "Hasta 5 links",
        "Soporte continuo",
      ],
      cta: "Comenzar",
      popular: false
    },
    {
      name: "Profesional",
      price: "250",
      description: "El más elegido",
      features: [
        "Todo del plan Básico",
        "10 diseños premium",
        "Breve apartado de productos o servicios",
        "Hasta 10 Links",
        "Soporte prioritario"
      ],
      cta: "Elegir Pro",
      popular: true
    },
    {
      name: "Premium",
      price: "350",
      description: "Máxima personalización",
      features: [
        "Todo del plan Profesional",
        "Diseño 100% único (lo hacemos contigo)",
        "Hasta tres apartados de tus servicios o productos",
        "Links Ilimitados",
        "Consultoria de Branding",
        "Soporte 24/7"        
      ],
      cta: "Ir Premium",
      popular: false
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-slate-900 relative">
      
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Planes para cada <span className="text-cyan-400">profesional</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>
        
        {/* Grid de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:scale-105 transition-all ${
                plan.popular 
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                  : 'border-white/10'
              }`}
            >
              
              {/* Badge "Más popular" */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} fill="white" />
                  Más popular
                </div>
              )}
              
              {/* Nombre del plan */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              
              {/* Descripción */}
              <p className="text-gray-400 mb-6">
                {plan.description}
              </p>
              
              {/* Precio */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">Bs.</span>
              </div>
              
              {/* CTA Button */}
              <a
                href={`https://wa.me/TU_NUMERO?text=Hola! Quiero el plan ${plan.name}`}
                className={`block w-full text-center py-3 rounded-xl font-bold mb-8 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {plan.cta}
              </a>
              
              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}