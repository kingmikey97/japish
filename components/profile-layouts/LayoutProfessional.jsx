'use client';

import { Phone, MapPin, Briefcase, BriefcaseBusinessIcon, MessageCircle } from 'lucide-react';

export default function LayoutProfessional({ profileData, template, handleWhatsApp }) {
  return (
    <>
      <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
      <div className="max-w-5xl mx-auto">

        <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden`}>

          <div className="grid grid-cols-1 md:grid-cols-8">

            {/* SIDEBAR - Foto e info básica */}
            <div className="md:col-span-3 bg-gradient-to-b from-emerald-900/30 to-teal-900/30 p-8 text-center">

              {/* Foto cuadrada */}
              <div className="mb-6">
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className="w-65 h-65 rounded-2xl object-cover mx-auto shadow-xl border-4 border-emerald-500/30"
                />
              </div>

              <h1 className={`text-2xl justify-center font-bold ${template.colors.primary} mb-3`}>
                {profileData.name}
              </h1>

              <div className="space-y-3 text-left">
                <div className="flex items-start gap-2">
                  <BriefcaseBusinessIcon size={28} className="text-emerald-400 mt-1" />
                  <div>
                    <p className={`text-sm ${template.colors.accent} font-semibold`}>
                      {profileData.title}
                    </p>
                    <p className={`text-xs ${template.colors.secondary}`}>
                      {profileData.company}
                    </p>
                    <p className={`text-xs ${template.colors.secondary}`}>
                      {profileData.especialization}
                    </p>
                  </div>
                  
                </div>

                <div className="flex items-start gap-2">
                  {/* <MapPin size={18} className="text-emerald-400 mt-1" /> */}
                  <p className={`text-sm ${template.colors.secondary}`}>
                    {profileData.specialization}
                  </p>
                </div>
              </div>

            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="md:col-span-5 p-8">

              <h1 className={`text-xl text-justify font-bold ${template.colors.primary} mb-4`}>
                Conecta conmigo
              </h1>

              <div className="flex flex-col gap-2 mb-6">
                {profileData.social_links?.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-3 ${template.colors.buttonSecondary} py-4 px-4 ${template.styles.buttonRounded} transition-all group`}
                      style={{
                        animation: 'fadeUp 0.7s ease both',
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0,
                      }}


                    >
                      <Icon size={22} className={`${template.colors.accent} shrink-0`} />
                      <span className={`text-sm ${template.colors.primary}`}>{link.label}</span>

                    </a>
                  );
                })}
              </div>

              {profileData.whatsapp && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle size={20} />
                  Contactar por WhatsApp
                </button>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}