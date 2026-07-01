import { Metadata } from "next";
import { CTASection } from "@/features/contacto/components/CTASection";

export const metadata: Metadata = {
  title: "Contacto | ValhallaTechnology",
  description: "Contáctate con ValhallaTechnology en La Paz, Bolivia. Estamos listos para ayudarte con tus proyectos tecnológicos.",
};

export default function ContactoPage() {
  return (
    <main className="flex flex-col pt-14">
      <CTASection />
    </main>
  );
}
