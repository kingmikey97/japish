'use client';

import { MessageCircle } from 'lucide-react';

export default function LayoutMedico({ profileData, template, handleWhatsApp }) {
    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ecgScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes crossPulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50%      { opacity: 0.07; transform: scale(1.04); }
        }
      `}</style>

            {/* FONDO FIJO */}
            <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-slate-950 via-teal-950 to-slate-950">

                {/* Cruz médica */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ animation: 'crossPulse 5s ease-in-out infinite' }}
                >
                    <div className="relative w-80 h-80">
                        <div className="absolute top-1/2 left-0 right-0 h-20 bg-cyan-300 -translate-y-1/2 rounded-2xl" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-20 bg-cyan-300 -translate-x-1/2 rounded-2xl" />
                    </div>
                </div>

                {/* Líneas ECG - múltiples filas scrolleando */}
                {[...Array(5)].map((_, row) => (
                    <div
                        key={`ecg-${row}`}
                        className="absolute w-[200%]"
                        style={{
                            top: `${10 + row * 20}%`,
                            opacity: 0.06 + (row === 2 ? 0.08 : 0),
                            animation: `ecgScroll ${14 + row * 3}s linear infinite`,
                        }}
                    >
                        <svg
                            viewBox="0 0 1200 60"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            className="w-full"
                            style={{ height: '60px' }}
                        >
                            {/* Patrón ECG × 2 para loop perfecto */}
                            <path
                                d="
                  M0,30 L90,30
                  C95,30 98,22 102,22 C106,22 109,30 114,30
                  L134,30 L138,36 L144,2 L150,58 L156,30
                  L176,30
                  C186,30 192,18 204,18 C216,18 222,30 232,30
                  L600,30
                  L690,30
                  C695,30 698,22 702,22 C706,22 709,30 714,30
                  L734,30 L738,36 L744,2 L750,58 L756,30
                  L776,30
                  C786,30 792,18 804,18 C816,18 822,30 832,30
                  L1200,30
                "
                                fill="none"
                                stroke="#5eead4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                ))}

            </div>
            {/* CONTENIDO */}
            <div className="max-w-2xl mx-auto px-4">
                <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden p-8`}>

                    {/* Nombre grande arriba */}
                    <h1 className={`text-3xl md:text-4xl text-center font-extrabold ${template.colors.primary} tracking-tight mb-1`}>
                        {profileData.name}
                    </h1>
                    <div className="grid grid-cols-2 gap-3 items-center">

                        {/* Botones izquierda — todos los links */}
                        <div className="flex flex-col gap-2">
                            {profileData.social_links?.map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.type}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex flex-col items-center justify-center gap-1 ${template.colors.buttonSecondary} py-3 px-2 ${template.styles.buttonRounded} transition-all`}
                                        style={{
                                            animation: 'fadeUp 0.7s ease both',
                                            animationDelay: `${i * 0.15}s`,
                                            opacity: 0,
                                        }}
                                    >
                                        <Icon size={20} className={`${template.colors.accent}`} />
                                        <span className={`text-xs ${template.colors.primary} text-center leading-tight`}>{link.label}</span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Centro — foto circular + whatsapp */}
                        <div className="flex flex-col items-justify gap-4">
                            <div className="relative">
                                <img
                                    src={profileData.image}
                                    alt={profileData.name}
                                    className="w-65 h-65 rounded-full object-cover shadow-1xl border-2 border-teal-300/40"
                                />

                            </div>
                        </div>
                        </div>
                    
                        {profileData.title && (
                            <p className={`text-center text-sm font-semibold ${template.colors.accent} uppercase tracking-widest mb-1`}>
                                {profileData.title}
                            </p>
                        )}
                        {profileData.company && (
                            <p className={`text-center text-sm ${template.colors.secondary} mb-6`}>
                                {profileData.company}
                            </p>
                        )}
                        {profileData.especialization && (
                            <p className={`text-xs text-center ${template.colors.secondary}`}>
                                {profileData.especialization}
                            </p>
                        )}
                    
                    {profileData.whatsapp && (
                        <button
                            onClick={handleWhatsApp}
                            className="w-full h-full bg-gradient-to-r from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition-all shadow-lg text-xs">
                            <MessageCircle size={14} />
                            Contactar por WhatsApp
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}