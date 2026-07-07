import { Miembro } from "../types";

export const equipo: Miembro[] = [
  {
    id: "m-1",
    nombre: "Equipo Técnico",
    rol: "Especialistas en Hardware",
    bio: "Profesionales certificados en diagnóstico, mantenimiento y reparación de equipos informáticos y electrónicos.",
    imagen: "/images/equipo/hardware.png",
    icono: "Wrench",
  },
  {
    id: "m-2",
    nombre: "Desarrolladores",
    rol: "Ingenieros de Software",
    bio: "Expertos en creación de soluciones web y móviles adaptadas a los requerimientos específicos de cada negocio.",
    imagen: "/images/equipo/software.png",
    icono: "Code2",
  },
  {
    id: "m-3",
    nombre: "Ingenieros de Red",
    rol: "Infraestructura y Seguridad",
    bio: "Especialistas en cableado estructurado, redes corporativas y sistemas integrales de videovigilancia.",
    imagen: "/images/equipo/red.png",
    icono: "Server",
  },
];
