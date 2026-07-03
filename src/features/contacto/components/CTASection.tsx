import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { getWhatsAppLink } from "@/shared/utils/whatsapp";

const infoCards = [
  {
    slug: "servicio-tecnico",
    titulo: "Soporte Técnico",
    descripcion: "Mantenimiento y reparación de equipos con soporte presencial y remoto.",
  },
  {
    slug: "desarrollo-de-software",
    titulo: "Desarrollo Software",
    descripcion: "Aplicaciones web, móviles y sistemas personalizados para tu negocio.",
  },
  {
    slug: "infraestructura-tecnologica",
    titulo: "Infraestructura",
    descripcion: "Cableado, cámaras, servidores y control de acceso para empresas.",
  },
  {
    slug: "consultoria-tecnologica",
    titulo: "Consultoría IT",
    descripcion: "Asesoría en transformación digital y planificación tecnológica.",
  },
];

export function CTASection() {
  return (
    <section className="w-full bg-white py-24 lg:py-32 overflow-hidden" id="contacto">
      <div className="w-full px-8 lg:px-16 2xl:px-32">
        
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <SectionTitle eyebrow="Trabajemos Juntos" variant="light" align="center">
            <h2 className="text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.08] text-[var(--blue)] max-w-[900px] mb-16">
              Comienza tu proyecto tecnológico con nosotros
            </h2>
          </SectionTitle>
          
          <a
            href={getWhatsAppLink("")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-3 bg-[var(--blue)] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-[18px] lg:text-[20px] font-bold no-underline cursor-pointer transition-all duration-300 hover:bg-[var(--blue-dark)] hover:scale-105 shadow-[0_12px_40px_rgba(30,58,143,0.3)]"
          >
            Contáctanos Ahora
            <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </a>
        </div>

        {/* Tarjetas de informacion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16 lg:mt-20 pt-16 lg:pt-20 border-t border-[var(--border-light)]">
          {infoCards.map((card) => (
            <a
              key={card.slug}
              href={getWhatsAppLink(card.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--blue)]/15 rounded-2xl p-18 lg:p-22 hover:border-[var(--blue)]/30 hover:shadow-[0_8px_30px_rgba(30,58,143,0.08)] transition-all duration-300 block no-underline"
            >
              <p className="text-[14px] tracking-[0.2em] uppercase text-[var(--blue)] font-bold mb-6">{card.titulo}</p>
              <p className="text-[16px] text-[var(--gray-text)] leading-relaxed">{card.descripcion}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
