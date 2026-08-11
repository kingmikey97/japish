"use client";

import { MessageCircle } from "lucide-react";

// ============================================
// LAYOUT — SINGANI SAN PEDRO
// Destilería premium boliviana. Identidad: rojo
// intenso, blanco, detalles dorados, tradición
// y lujo sobrio (inspiración: Macallan, Hennessy).
// ============================================
export default function LayoutSinganiSanPedro({
  profileData,
  template,
  handleWhatsApp,
}) {
  return (
    <>
      <style>{`
        @keyframes sp-fade-up {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes sp-shine {
          0% { transform: translateX(-120%) rotate(8deg); }
          100% { transform: translateX(220%) rotate(8deg); }
        }
        @keyframes sp-glow-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }
        .sp-fade-up { animation: sp-fade-up 0.9s ease-out both; }
        .sp-fade-up-delay-1 { animation: sp-fade-up 0.9s ease-out 0.15s both; }
        .sp-fade-up-delay-2 { animation: sp-fade-up 0.9s ease-out 0.3s both; }
        .sp-shine-wrap { position: relative; overflow: hidden; }
        .sp-shine-wrap::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -20%;
          width: 40%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          animation: sp-shine 3.2s ease-in-out infinite;
          animation-delay: 1s;
          pointer-events: none;
        }
        .sp-glow { animation: sp-glow-pulse 4.5s ease-in-out infinite; }
        .sp-frame {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.7s ease;
        }
        .sp-frame:hover {
          transform: scale(1.015);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div
          className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden`}
        >
          {/* BANNER SUPERIOR */}
          <div className="relative bg-gradient-to-r from-[#7a0018] via-[#9b1224] to-[#5c000f] px-6 py-5 sp-shine-wrap">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="h-px w-5 md:w-8 bg-gradient-to-r from-transparent via-[#d4af6a] to-[#d4af6a]" />

              <span className="text-center uppercase tracking-[0.12em] md:tracking-[0.35em] text-[12px] md:text-[11px] font-semibold text-[#f3d9a4]">
                EL GENUINO SINGANI BOLIVIANO
              </span>

              <span className="h-px w-5 md:w-8 bg-gradient-to-l from-transparent via-[#d4af6a] to-[#d4af6a]" />
            </div>
          </div>

          {/* CUERPO — LAYOUT      */}
          <div className="relative px-6 md:px-10 py-10 md:py-14 bg-gradient-to-b from-black/0 via-black/0 to-black/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              {/*  vinitra*/}
              <div className="md:col-span-5 flex justify-center md:justify-start sp-fade-up">
                <div className="relative">
                  {/* Resplandor dorado detrás de la foto */}
                  <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#f44336]/30 via-transparent to-[#d4001f]/20 blur-2xl sp-glow" />
                  {/* marco dorado */}
                  <div className="relative p-[3px] rounded-[1.75rem] bg-gradient-to-br from-[#e8c988] via-[#000000] to-[#e8c988] shadow-2xl">
                    <div className="rounded-[1.6rem] bg-[#b12015] p-2">
                      <img
                        src={profileData.image}
                        alt={profileData.name}
                        className="sp-frame w-56 h-52 md:w-190 md:h-80 object-contain rounded-[1.25rem] shadow-xl"
                      />
                    </div>
                  </div>
                  {/* Base tipo vitrina */}
                  <div className="mx-auto mt-2 w-40 h-2 rounded-full bg-black/30 blur-md" />
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-7 text-center md:text-left">
                <h1
                  className={`sp-fade-up-delay-1 text-4xl md:text-5xl ${template.styles.font} font-bold ${template.colors.primary} mb-3 leading-tight`}
                >
                  {profileData.name}
                </h1>
                <p
                  className={`
                            sp-fade-up-delay-2
                            text-[15px] md:text-lg
                            font-light
                            leading-7
                            md:leading-8
                            tracking-wide
                            text-center
                            md:text-left
                            max-w-xl
                            ${template.colors.secondary}
                            mb-6
                        `}
                >
                  {profileData.title}
                </p>
                <p
                  className={`sp-fade-up-delay-2 text-base ${template.colors.secondary} mb-8`}
                >
                  <span className="font-semibold text-[#d4af6a]">
                    Especialización:
                  </span>{" "}
                  {profileData.especialization}
                </p>

                {/* Redes sociales — botones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {profileData.social_links?.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex flex-col items-center gap-2 ${template.colors.buttonSecondary} py-3 px-2 rounded-xl border border-[#d4af6a]/25 transition-all duration-500 hover:border-[#d4af6a]/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30`}
                      >
                        <Icon
                          size={19}
                          className="text-[#f3d9a4] drop-shadow-[0_0_6px_rgba(243,217,164,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                        />
                        <span
                          className={`text-[12px] tracking-wide opacity-80 ${template.colors.primary}`}
                        >
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Divisor inferior */}
            <div className="flex items-center gap-3 my-9">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af6a]/70" />
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent" />
            </div>

            {/* Botón WS */}
            {profileData.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className={`sp-shine-wrap relative w-full bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-semibold tracking-wide py-4 px-4 rounded-xl flex items-center justify-center gap-2 border border-[#d4af6a]/40 shadow-lg shadow-black/30 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl`}
              >
                <MessageCircle size={20} />
                Contactar por WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
