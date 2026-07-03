const WHATSAPP_NUMBER = "59164256727";

const WHATSAPP_MESSAGES: Record<string, string> = {
  "servicio-tecnico":
    "Hola, me gustaría recibir información sobre el servicio de soporte técnico y mantenimiento de equipos. ¿Podrían ayudarme?",
  "desarrollo-de-software":
    "Hola, me gustaría recibir información sobre los servicios de desarrollo de software. ¿Podrían ayudarme?",
  "infraestructura-tecnologica":
    "Hola, me gustaría recibir información sobre los servicios de infraestructura tecnológica. ¿Podrían ayudarme?",
  "consultoria-tecnologica":
    "Hola, me gustaría recibir información sobre los servicios de consultoría tecnológica. ¿Podrían ayudarme?",
};

const DEFAULT_MESSAGE = "Hola, quiero información sobre sus servicios";

export function getWhatsAppLink(serviceSlug: string): string {
  const message = WHATSAPP_MESSAGES[serviceSlug] ?? DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
