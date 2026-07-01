'use client';

import { MessageCircle, BriefcaseBusinessIcon } from 'lucide-react';

export default function LayoutAbogado({ profileData, template, handleWhatsApp }) {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes goldFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-stone-950 via-rose-950/80 to-stone-950">

        {/* Partículas doradas flotando */}
        {[...Array(25)].map((_, i) => {
          const left = (i * 4.1 + (i % 5) * 3) % 100;
          const size = 2 + (i % 4);
          const delay = i * 0.8;
          const duration = 10 + (i % 7) * 2;
          const opacity = 0.3 + (i % 3) * 0.2;
          return (
            <div
              key={`gold-${i}`}
              className="absolute rounded-full bg-yellow-400"
              style={{
                left: `${left}%`,
                bottom: '-10px',
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0,
                boxShadow: `0 0 ${size * 2}px ${size}px rgba(234,179,8,${opacity})`,
                animation: `goldFloat ${duration}s ease-in ${delay}s infinite`,
              }}
            />
          );
        })}

        {/* Viñeta vino en bordes */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-rose-950/60 pointer-events-none" />
      </div>

      {/* CONTENIDO */}
      <div className="max-w-2xl mx-auto px-4">
        <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-5">

            {/* IZQUIERDA — foto */}
            <div className="md:col-span-2 bg-gradient-to-b from-rose-950/40 to-stone-950/40 p-6 flex items-center justify-center">
              <div className="w-full max-w-[180px] mx-auto">
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className="w-full aspect-square rounded-xl object-cover shadow-2xl border-2 border-yellow-600/40"
                />
              </div>
            </div>

            {/* DERECHA — nombre, info, botones, whatsapp */}
            <div className="md:col-span-3 p-6 flex flex-col gap-4">

              {/* Nombre */}
              <div
                style={{ animation: 'fadeUp 0.6s ease both', opacity: 0 }}
              >
                <h1 className={`text-2xl font-bold ${template.colors.primary} leading-tight`}>
                  {profileData.name}
                </h1>
                {profileData.title && (
                  <p className={`text-sm font-semibold ${template.colors.accent} uppercase tracking-widest mt-1`}>
                    {profileData.title}
                  </p>
                )}
              </div>

              {/* Info */}
              <div
                className="flex items-start gap-2"
                style={{ animation: 'fadeUp 0.6s ease 0.1s both', opacity: 0 }}
              >
                <BriefcaseBusinessIcon size={18} className="text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  {profileData.company && (
                    <p className={`text-xs ${template.colors.secondary}`}>{profileData.company}</p>
                  )}
                  {profileData.especialization && (
                    <p className={`text-xs ${template.colors.secondary}`}>{profileData.especialization}</p>
                  )}
                </div>
              </div>

              {/* Botones en cuadrícula */}
              <div
                className="grid grid-cols-3 gap-2"
                style={{ animation: 'fadeUp 0.6s ease 0.2s both', opacity: 0 }}
              >
                {profileData.social_links?.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-1 ${template.colors.buttonSecondary} py-3 px-2 ${template.styles.buttonRounded} transition-all aspect-square`}
                    >
                      <Icon size={20} className={template.colors.accent} />
                      <span className={`text-xs ${template.colors.primary} text-center leading-tight`}>
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* WhatsApp */}
              {profileData.whatsapp && (
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
                  style={{ animation: 'fadeUp 0.6s ease 0.3s both', opacity: 0 }}
                >
                  <MessageCircle size={18} />
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