'use client';

import { Phone } from 'lucide-react';

// Este layout será la base, pero en producción lo personalizas 100% con el cliente
export default function LayoutPremium({ profileData, template, handleWhatsApp }) {
  
  // NOTA: Para clientes premium, este componente se duplica y personaliza
  // Cada cliente premium tiene su propio archivo: LayoutPremium_{username}.jsx
  
  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Hero section */}
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} p-12 mb-8 relative overflow-hidden`}>
        
        {/* Background effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl">
        </div>
        <h1 className={`text-5xl text-center font-bold ${template.colors.primary} mb-4`}>
              {profileData.name}
            </h1>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          
          {/* Info first */}
          <div>
           
            <p className={`text-2xl text-justify ${template.colors.accent} mb-3`}>
              {profileData.title}
            </p>
            <p className={`text-xl ${template.colors.accent} font-semibold mb-6`}>
              @ {profileData.company}
            </p>
            <p className={`text-lg ${template.colors.secondary} leading-relaxed`}>
              {profileData.especialization}
            </p>
          </div>
          
          {/* Foto con efectos */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="relative w-65 h-65 rounded-full object-cover shadow-2xl border-4 border-purple-500/50"
              />
            </div>
          </div>
          
        </div>
        
      </div>
      
      {/* Social grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {profileData.social_links?.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.type}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${template.colors.card} border ${template.colors.cardBorder} p-6 ${template.styles.cardRounded} hover:scale-105 transition-all group text-center`}
            >
              <Icon size={32} className={`${template.colors.accent} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <span className={`text-sm ${template.colors.primary} font-semibold`}>{link.label}</span>
            </a>
          );
        })}
      </div>
      
      {/* WhatsApp destacado */}
      {profileData.whatsapp && (
        <button
          onClick={handleWhatsApp}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl hover:shadow-purple-900/50 text-xl"
        >
          <Phone size={24} />
          Conectar por WhatsApp
        </button>
      )}
      
    </div>
  );
}