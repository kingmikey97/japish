'use client';

import { Phone } from 'lucide-react';

export default function LayoutBasic({ profileData, template, handleWhatsApp }) {
  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Card simple centrada */}
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} p-8`}>
        
        {/* Foto arriba */}
        <div className="flex justify-center mb-6">
          <img 
            src={profileData.image} 
            alt={profileData.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
          />
        </div>

        {/* Info centrada */}
        <div className="text-center mb-6">
          <h1 className={`text-2xl font-bold ${template.colors.primary} mb-2`}>
            {profileData.name}
          </h1>
          <p className={`${template.colors.accent} mb-1`}>
            {profileData.title}
          </p>
          <p className={`text-sm ${template.colors.secondary}`}>
            {profileData.company}
          </p>
        </div>

        {/* Botones en lista vertical */}
        <div className="space-y-2 mb-6">
          {profileData.social_links?.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 ${template.colors.buttonSecondary} py-3 px-4 ${template.styles.buttonRounded} ${template.colors.primary} hover:scale-105 transition-transform`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* WhatsApp */}
        {profileData.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Phone size={18} />
            Contactar
          </button>
        )}
        
      </div>
    </div>
  );
}