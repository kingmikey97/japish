'use client';

import { Phone, ExternalLink } from 'lucide-react';

export default function LayoutElegant({ profileData, template, handleWhatsApp }) {
  return (
    <div className="max-w-4xl mx-auto">
      
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} p-10`}>
        
        {/* Layout horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center mb-8">
          
          {/* Foto grande a la izquierda */}
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-30"></div>
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="relative w-full aspect-square rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
          
          {/* Info a la derecha */}
          <div className="md:col-span-3">
            <h1 className={`text-4xl ${template.styles.font} font-bold ${template.colors.primary} mb-3`}>
              {profileData.name}
            </h1>
            <p className={`text-2xl ${template.colors.accent} mb-2`}>
              {profileData.title}
            </p>
            <p className={`text-lg ${template.colors.secondary} mb-4`}>
              {profileData.company}
            </p>
            <p className={`${template.colors.secondary} leading-relaxed`}>
              {profileData.specialization}
            </p>
          </div>
          
        </div>
        
        {/* Botones en fila horizontal */}
        <div className="flex flex-wrap gap-3 mb-6">
          {profileData.social_links?.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${template.colors.buttonSecondary} py-2 px-4 rounded-full ${template.colors.primary} hover:bg-amber-900/50 transition-all group`}
              >
                <Icon size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="text-sm">{link.label}</span>
                <ExternalLink size={14} className="opacity-50" />
              </a>
            );
          })}
        </div>
        
        {profileData.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl"
          >
            <Phone size={20} />
            Iniciar conversación
          </button>
        )}
        
      </div>
    </div>
  );
}