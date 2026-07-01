import { Metadata } from "next";
import { PortafolioSection } from "@/features/portafolio/components/PortafolioSection";

export const metadata: Metadata = {
  title: "Portafolio | ValhallaTechnology",
  description: "Explora los proyectos y casos de éxito desarrollados por ValhallaTechnology. Desarrollo web, sistemas y soluciones tecnológicas.",
};

export default function PortafolioPage() {
  return (
    <main className="flex flex-col pt-14">
      <PortafolioSection />
    </main>
  );
}
