import { equipo } from "../data/equipo";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

export function EquipoSection() {
  return (
    <section className="w-full bg-[var(--near-black)] py-24 lg:py-32 overflow-hidden" id="equipo" data-nav-bg="var(--near-black)">
      <div className="w-full px-8 lg:px-16 2xl:px-32 mb-12 lg:mb-16">
        <SectionTitle eyebrow="Quiénes Somos" variant="dark" align="center">
          <h2 className="text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.08] text-white max-w-[900px]">
            Profesionales apasionados por la tecnología
          </h2>
        </SectionTitle>
      </div>

      <div className="w-full px-8 lg:px-16 2xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {equipo.map((miembro) => (
            <div 
              key={miembro.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 lg:p-10 hover:bg-white/[0.07] transition-colors duration-300"
            >
              {/* Placeholder de avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--blue)] to-[var(--blue-light)] mb-8 flex items-center justify-center text-4xl font-bold text-white/90 shadow-[0_4px_20px_rgba(30,58,143,0.2)]">
                {miembro.nombre.charAt(0)}
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-3">{miembro.nombre}</h3>
              <p className="text-[var(--blue-light)] text-[17px] font-medium mb-5 tracking-wide uppercase">
                {miembro.rol}
              </p>
              <p className="text-white/60 text-[17px] leading-relaxed">
                {miembro.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
