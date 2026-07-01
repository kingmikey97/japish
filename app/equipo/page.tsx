import { Metadata } from "next";
import { EquipoSection } from "@/features/equipo/components/EquipoSection";

export const metadata: Metadata = {
  title: "Nuestro Equipo | ValhallaTechnology",
  description: "Conoce al equipo de profesionales detrás de ValhallaTechnology. Expertos en tecnología listos para ayudarte a impulsar tu negocio.",
};

export default function EquipoPage() {
  return (
    <main className="flex flex-col pt-14">
      <EquipoSection />
    </main>
  );
}
