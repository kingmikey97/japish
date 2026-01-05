'use client';

import { Phone } from 'lucide-react';

export default function LayoutModern({ profileData, template, handleWhatsApp }) {
  return (
    <div className="max-w-2xl mx-auto">
      
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} p-8`}>
        
        {/* Foto con anillo animado */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${template.colors.ringColor} animate-spin [animation-duration:3s]`}></div>
            <div className="absolute inset-1 rounded-full bg-slate-800 overflow-hidden">
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${template.colors.primary} mb-2`}>
            {profileData.name}
          </h1>
          <p className={`text-xl ${template.colors.accent} mb-1`}>
            {profileData.title}
          </p>
          <p className={`text-lg ${template.colors.accent} font-semibold mb-3`}>
            @ {profileData.company}
          </p>
          <p className={template.colors.secondary}>
            {profileData.specialization}
          </p>
        </div>

        {/* Grid 2 columnas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {profileData.social_links?.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 ${template.colors.buttonSecondary} py-3 ${template.styles.buttonRounded} ${template.colors.primary} group transition-all hover:scale-105`}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">{link.label}</span>
              </a>
            );
          })}
        </div>

        {profileData.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 ${template.styles.buttonRounded} shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2`}
          >
            <Phone size={20} />
            Contactar por WhatsApp
          </button>
        )}
        
      </div>
    </div>
  );
}