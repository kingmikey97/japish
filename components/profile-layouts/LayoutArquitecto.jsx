'use client';

import { MessageCircle, BriefcaseBusinessIcon } from 'lucide-react';

export default function LayoutArquitecto({ profileData, template, handleWhatsApp }) {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          0%   { stroke-dashoffset: 1000; opacity: 0; }
          10%  { opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { opacity: 0.4; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes drawShape {
          0%   { stroke-dashoffset: 600; opacity: 0; }
          10%  { opacity: 0.8; }
          70%  { stroke-dashoffset: 0; opacity: 0.8; }
          90%  { opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>

      {/* FONDO FIJO — imagen + overlay + blueprint */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Imagen de fondo */}
        <img
          src="/arquitecto.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay oscuro para que se lean los blueprint */}
        <div className="absolute inset-0 bg-slate-900/70" />

        {/* Blueprint SVG animado */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.35 }}
        >
          {/* Grilla de fondo fija */}
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94a3b8" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.4" />

          {/* Líneas horizontales dibujándose */}
          {[15, 35, 55, 72, 88].map((y, i) => (
            <line
              key={`hl-${i}`}
              x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
              stroke="#d97706"
              strokeWidth="0.8"
              strokeDasharray="1000"
              style={{
                animation: `drawLine ${6 + i * 1.5}s ease-in-out ${i * 2}s infinite`,
              }}
            />
          ))}

          {/* Líneas verticales dibujándose */}
          {[10, 28, 50, 70, 90].map((x, i) => (
            <line
              key={`vl-${i}`}
              x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%"
              stroke="#94a3b8"
              strokeWidth="0.6"
              strokeDasharray="1000"
              style={{
                animation: `drawLine ${7 + i * 1.2}s ease-in-out ${i * 1.5 + 1}s infinite`,
              }}
            />
          ))}

          {/* Formas arquitectónicas — rectángulos dibujándose */}
          <rect x="5%" y="10%" width="20%" height="35%"
            fill="none" stroke="#d97706" strokeWidth="1"
            strokeDasharray="600"
            style={{ animation: 'drawShape 8s ease-in-out 0.5s infinite' }}
          />
          <rect x="60%" y="50%" width="30%" height="40%"
            fill="none" stroke="#94a3b8" strokeWidth="1"
            strokeDasharray="600"
            style={{ animation: 'drawShape 9s ease-in-out 2s infinite' }}
          />
          <rect x="30%" y="5%" width="15%" height="25%"
            fill="none" stroke="#d97706" strokeWidth="0.8"
            strokeDasharray="600"
            style={{ animation: 'drawShape 7s ease-in-out 3.5s infinite' }}
          />

          {/* Dimensiones — líneas de cota */}
          <line x1="5%" y1="8%" x2="25%" y2="8%"
            stroke="#64748b" strokeWidth="0.6" strokeDasharray="400"
            style={{ animation: 'drawLine 5s ease-in-out 1s infinite' }}
          />
          <line x1="5%" y1="7%" x2="5%" y2="9%"
            stroke="#64748b" strokeWidth="0.6" />
          <line x1="25%" y1="7%" x2="25%" y2="9%"
            stroke="#64748b" strokeWidth="0.6" />

          <line x1="62%" y1="48%" x2="88%" y2="48%"
            stroke="#64748b" strokeWidth="0.6" strokeDasharray="400"
            style={{ animation: 'drawLine 6s ease-in-out 2.5s infinite' }}
          />
          <line x1="62%" y1="47%" x2="62%" y2="49%"
            stroke="#64748b" strokeWidth="0.6" />
          <line x1="88%" y1="47%" x2="88%" y2="49%"
            stroke="#64748b" strokeWidth="0.6" />
        </svg>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-2xl mx-auto px-4">
        <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden`}>

          {/* HEADER — foto | nombre | info */}
          <div className="flex items-center gap-5 p-6 border-b border-slate-200/80">

            {/* Foto circular */}
            <div className="shrink-0">
              <img
                src={profileData.image}
                alt={profileData.name}
                className="w-65 h-65 rounded-full object-cover border-2 border-amber-500/50 shadow-lg"
              />
            </div>

            {/* Nombre + info */}
            <div
              className="flex-1 min-w-0"
              style={{ animation: 'fadeUp 0.6s ease both', opacity: 0 }}
            >
              <h1 className={`text-2xl font-bold ${template.colors.primary} leading-tight truncate`}>
                {profileData.name}
              </h1>
              {profileData.title && (
                <p className={`text-sm font-semibold ${template.colors.accent} uppercase tracking-wider mt-0.5`}>
                  {profileData.title}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-1">
                <BriefcaseBusinessIcon size={14} className="text-slate-400 shrink-0" />
                <p className={`text-xs ${template.colors.secondary} truncate`}>
                  {profileData.company}{profileData.especialization ? ` · ${profileData.especialization}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* BOTONES EN GRID */}
          <div
            className="grid grid-cols-4 gap-2 p-5"
            style={{ animation: 'fadeUp 0.6s ease 0.15s both', opacity: 0 }}
          >
            {profileData.social_links?.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.type}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-1.5 ${template.colors.buttonSecondary} py-3 px-2 ${template.styles.buttonRounded} transition-all`}
                >
                  <Icon size={20} className={template.colors.accent} />
                  <span className={`text-xs text-center leading-tight`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* WHATSAPP */}
          {profileData.whatsapp && (
            <div
              className="px-5 pb-5"
              style={{ animation: 'fadeUp 0.6s ease 0.25s both', opacity: 0 }}
            >
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
              >
                <MessageCircle size={18} />
                Contactar por WhatsApp
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}