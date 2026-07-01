import Link from "next/link";
import { EMPRESA } from "@/shared/constants/empresa";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#contacto", label: "Contacto" },
];

const SERVICIOS_LINKS = [
  { label: "Servicio Técnico", href: "/servicios#tecnico" },
  { label: "Desarrollo de Software", href: "/servicios#software" },
  { label: "Infraestructura", href: "/servicios#infraestructura" },
  { label: "Consultoría", href: "/servicios#consultoria" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--dark-bg)] text-white" id="footer">
      <div className="w-full px-8 lg:px-16 2xl:px-32 pt-20 lg:pt-28">
        {/* Parte superior — 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-20 lg:pb-28 min-w-0">
          {/* Columna CTA */}
          <div className="lg:pr-8">
            <h3 className="text-[22px] sm:text-[28px] lg:text-[35px] font-bold leading-[1.1] mb-8 text-white/90 break-words">
              Habla con un
              <br />
              experto en ValhallaTechnology
            </h3>
            <div className="flex w-full min-w-0">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="min-w-0 flex-1 bg-white/[0.05] border border-white/10 border-r-0 text-white px-4 sm:px-6 py-4 text-[15px] sm:text-[16px] rounded-l-xl outline-none placeholder:text-white/30 focus:border-white/20 transition-colors"
              />
              <button className="bg-[var(--blue)] border border-[var(--blue)] text-white px-4 sm:px-6 lg:px-8 py-4 text-[14px] sm:text-[16px] font-medium rounded-r-xl cursor-pointer transition-colors hover:bg-[var(--blue-dark)] btn-press whitespace-nowrap">
                Enviar
              </button>
            </div>
          </div>

          {/* Columna de navegacion */}
          <div>
              <h4 className="text-[14px] tracking-[0.2em] uppercase text-white/40 mb-8 font-semibold">
                Navegación
              </h4>
              <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-[16px] no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna de servicios */}
          <div>
              <h4 className="text-[14px] tracking-[0.2em] uppercase text-white/40 mb-8 font-semibold">
                Servicios
              </h4>
              <ul className="flex flex-col gap-4">
              {SERVICIOS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-[16px] no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna de contacto y redes */}
          <div>
              <h4 className="text-[14px] tracking-[0.2em] uppercase text-white/40 mb-8 font-semibold">
                Contacto
              </h4>
              <ul className="flex flex-col gap-4 text-[16px] text-white/70">
              <li className="flex items-start gap-6">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white/40" />
                <span className="leading-relaxed">{EMPRESA.direccion}</span>
              </li>
              <li className="flex items-center gap-6">
                <MessageCircle className="w-5 h-5 shrink-0 text-white/40" />
                <a
                  href={EMPRESA.enlaces.whatsappBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-white"
                >
                  {EMPRESA.telefonos.whatsapp1}
                </a>
              </li>
              <li className="flex items-center gap-6">
                <Phone className="w-5 h-5 shrink-0 text-white/40" />
                <span>{EMPRESA.telefonos.whatsapp2}</span>
              </li>
            </ul>

            <h4 className="text-[14px] tracking-[0.2em] uppercase text-white/40 mb-8 mt-12 font-semibold">
              Redes Sociales
            </h4>
            <ul className="flex gap-12">
              <li>
                <a
                  href={EMPRESA.enlaces.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-[16px] transition-colors duration-150 hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={EMPRESA.enlaces.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-[16px] transition-colors duration-150 hover:text-white"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie de pagina inferior */}
        <div className="border-t border-white/[0.06] py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 flex-wrap">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 w-full md:w-auto">
            <span className="text-[18px] sm:text-[24px] lg:text-[32px] font-extrabold tracking-[0.06em] text-white/40 font-mono text-center leading-tight">
              VALHALLATECHNOLOGY
            </span>
          </div>

          <span className="text-[13px] sm:text-[15px] text-white/30 text-center">
            &copy;{currentYear} {EMPRESA.nombre}
          </span>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              href="/contacto"
              className="text-[13px] sm:text-[15px] text-white/40 no-underline transition-colors duration-150 hover:text-white/80 whitespace-nowrap"
            >
              Politica de Privacidad
            </Link>
            <Link
              href="/contacto"
              className="text-[13px] sm:text-[15px] text-white/40 no-underline transition-colors duration-150 hover:text-white/80 whitespace-nowrap"
            >
              Terminos y Condiciones
            </Link>
          </div>

          <span className="text-[13px] sm:text-[15px] text-white/30 text-center">
            Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
