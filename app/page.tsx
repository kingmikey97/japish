import { HeroSection } from "@/features/hero/components/HeroSection";
import { ServiciosSection } from "@/features/servicios/components/ServiciosSection";
import { PortafolioSection } from "@/features/portafolio/components/PortafolioSection";
import { EquipoSection } from "@/features/equipo/components/EquipoSection";
import { CTASection } from "@/features/contacto/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiciosSection />
      <PortafolioSection />
      <EquipoSection />
      <CTASection />
    </>
  );
}
