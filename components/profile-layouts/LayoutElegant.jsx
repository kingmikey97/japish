'use client';

import { Phone, ExternalLink, MessageCircle } from 'lucide-react';

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
                className="relative w-65 h-65 rounded-3xl object-cover shadow-2xl transition-all duration-700 hover:rounded-[3rem] hover:scale-105 hover:shadow-1xl cursor-pointer"
              />
            </div>
          </div>

          {/* Info a la derecha */}
          <div className="md:col-span-3">
            <h1 className={`text-3xl ${template.styles.font} font-bold ${template.colors.primary} mb-3`}>
              {profileData.name}
            </h1>
            <p className={`text-2xl ${template.colors.accent} mb-2`}>
              {profileData.title}
            </p>
            <p className={`text-1xl ${template.colors.secondary} mb-1`}>
              {profileData.company}

            </p>
            <p className={`text-1xl ${template.colors.secondary} mb-4`}>
              {profileData.especialization}
            </p>


            {/* Grid de links */}
            <div className="grid grid-cols-4 gap-2">
              {profileData.social_links?.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 ${template.colors.buttonSecondary} py-3 px-2 rounded-2xl ${template.colors.primary} hover:scale-105 transition-all group border border-white/10`}
                  >
                    <Icon size={20} className="group-hover:rotate-10 group-hover:scale-110 transition-transform" />
                    <span className="text-xs opacity-60">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {profileData.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <MessageCircle size={20} className="transition-transform hover:rotate-50" />
            Contactar por WhatsApp
          </button>
        )}

      </div>
    </div>
  );
}