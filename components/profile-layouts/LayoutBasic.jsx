'use client';

import { MessageCircle, Phone } from 'lucide-react';

export default function LayoutBasic({ profileData, template, handleWhatsApp }) {
  return (
    <div className="max-w-2xl mx-auto">

      {/* Card simple centrada */}
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} p-8`}>

        {/* Foto arriba */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
  className="absolute inset-0 rounded-full animate-pulse"
  style={{ boxShadow: '0 0 30px 6px rgba(247, 247, 247, 0.6)' }}
/>
            <div
              className="rounded-full p-[3px]"
              style={{ background: 'linear-gradient(135deg, #a1a1aa, #52525b)' }}
            >
              <img
                src={profileData.image}
                alt={profileData.name}
                className="w-65 h-65 rounded-full object-cover block"
                style={{ border: '3px solid white' }}
              />
            </div>
          </div>
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
          <p className={`text-sm ${template.colors.secondary}`}>
            {profileData.especialization}
          </p>
        </div>

        {/* Botones en lista vertical */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {profileData.social_links?.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 ${template.colors.buttonSecondary} py-4 px-2 rounded-2xl ${template.colors.primary} hover:scale-105 transition-transform`}
              >
                <Icon size={22} />
                <span className="text-xs opacity-60">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* WhatsApp */}
        {profileData.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle size={22} />
            Contactar por WhatsApp
          </button>
        )}

      </div>
    </div>
  );
}