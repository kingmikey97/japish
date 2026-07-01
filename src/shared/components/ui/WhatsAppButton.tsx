"use client";

import { MessageCircle } from "lucide-react";
import { EMPRESA } from "@/shared/constants/empresa";

export function WhatsAppButton() {
  return (
    <a
      href={EMPRESA.enlaces.whatsappBase}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="btn-press fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Anillo de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
    </a>
  );
}
