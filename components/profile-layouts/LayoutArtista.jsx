'use client';

import { MessageCircle, UserPlus } from 'lucide-react';

export default function LayoutArtista({ profileData, template, handleWhatsApp }) {

  const handleSaveContact = () => {
    

    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profileData.name || ''}`,
      profileData.company ? `ORG:${profileData.company}` : '',
      profileData.whatsapp ? `TEL;TYPE=CELL:${profileData.whatsapp}` : '',
      
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profileData.name || 'contacto'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatImg {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes floatShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.35; }
          50%      { transform: scaleX(0.75); opacity: 0.15; }
        }
        @keyframes bokeh {
          0%   { transform: translateY(20px) scale(1); opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.7; }
          100% { transform: translateY(-60px) scale(1.3); opacity: 0; }
        }
        @keyframes eqBar {
          0%, 100% { transform: scaleY(0.2); }
          50%      { transform: scaleY(1); }
        }
      `}</style>

      {/* FONDO FIJO - cubre toda la página, detrás de todo */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">

        {/* Luces flotantes (bokeh) - zona superior */}
        {[...Array(12)].map((_, i) => {
          const left = (i * 8.3 + (i % 3) * 5) % 100;
          const size = 40 + (i % 4) * 30;
          const delay = i * 1;
          const duration = 8 + (i % 5) * 2;
          const colors = ['bg-cyan-400', 'bg-indigo-400', 'bg-blue-400'];
          return (
            <div
              key={`bokeh-${i}`}
              className={`absolute rounded-full ${colors[i % 3]} blur-2xl`}
              style={{
                left: `${left}%`,
                top: `${(i * 17 + (i % 4) * 11) % 90}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0,
                animation: `bokeh ${duration}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}

        {/* Ecualizador disimulado - pegado abajo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-[0.08] px-4">
          {[...Array(40)].map((_, i) => (
            <div
              key={`eq-${i}`}
              className="flex-1 max-w-[20px] bg-cyan-300 rounded-t-sm origin-bottom"
              style={{
                height: `${70 + (i % 5) * 45}%`,
                animation: `eqBar ${0.8 + (i % 2) * 0.3}s ease-in-out ${i * 0.05}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-2xl mx-auto px-4">

        <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden p-8`}>

          {/* Foto grande tipo "afiche" */}
          <div className="relative w-65 h-65 mx-auto mb-6">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-65 h-65 rounded-2xl object-cover shadow-xl border-4 border-cyan-400/30"
              style={{ animation: 'floatImg 3.5s ease-in-out infinite' }}
            />
            <div
              className="w-3/4 h-4 bg-black rounded-full mx-auto blur-md mt-2"
              style={{ animation: 'floatShadow 3.5s ease-in-out infinite' }}
            />
          </div>

          {/* Nombre estilo cartel */}
          <h1 className={`text-3xl md:text-4xl text-center font-extrabold ${template.colors.primary} tracking-tight mb-2`}>
            {profileData.name}
          </h1>

          {profileData.title && (
            <p className={`text-center text-sm font-semibold ${template.colors.accent} uppercase tracking-widest mb-1`}>
              {profileData.title}
            </p>
          )}

          {profileData.company && (
            <p className={`text-center text-sm ${template.colors.secondary} mb-8`}>
              {profileData.company}
            </p>
          )}

          {/* Links sociales */}
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
                    animation: 'fadeUp 0.9s ease both',
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

          {/* WhatsApp */}
          {/* WhatsApp */}
          {profileData.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </button>
          )}

          {/* Guardar contacto */}
          <button
            onClick={handleSaveContact}
            className={`w-full mt-3 ${template.colors.buttonSecondary} ${template.colors.primary} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${template.colors.cardBorder}`}
          >
            <UserPlus size={20} />
            Guardar contacto
          </button>

        </div>
      </div>
    </>
  );
}