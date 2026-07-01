import { Metadata } from "next";
import { ServiciosSection } from "@/features/servicios/components/ServiciosSection";

export const metadata: Metadata = {
  title: "Servicios | ValhallaTechnology",
  description: "Servicio técnico, desarrollo de software, infraestructura tecnológica y consultoría en La Paz, Bolivia. Soluciones tecnológicas para todos.",
};

export default function ServiciosPage() {
  return (
    <main className="flex flex-col pt-14">
      <ServiciosSection />
    </main>
  );
}
