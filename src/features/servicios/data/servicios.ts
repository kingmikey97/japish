import { Servicio } from '../types';

export const servicios: Servicio[] = [
  {
    id: 's-1',
    slug: 'servicio-tecnico',
    titulo: 'Servicio Técnico',
    descripcion: 'Mantenimiento preventivo y correctivo de computadoras y laptops. Reparación de hardware, optimización y recuperación de datos.',
    caracteristicas: [
      'Cambio de piezas y limpieza profunda',
      'Formateo e instalación de OS',
      'Soporte técnico remoto y presencial',
      'Venta de repuestos y accesorios'
    ],
    icono: 'Wrench',
    imagen: '/images/servicios/soporte-tecnico.png'
  },
  {
    id: 's-2',
    slug: 'desarrollo-de-software',
    titulo: 'Desarrollo de Software',
    descripcion: 'Desarrollo de aplicaciones web, móviles y de escritorio. Sistemas personalizados y automatización de procesos empresariales.',
    caracteristicas: [
      'Aplicaciones móviles (Android/iOS)',
      'Sistemas a medida para empresas',
      'Automatización de procesos',
      'Mantenimiento de software existente'
    ],
    icono: 'Code2',
    imagen: '/images/servicios/desarrollo-software.png'
  },
  {
    id: 's-3',
    slug: 'infraestructura-tecnologica',
    titulo: 'Infraestructura Tecnológica',
    descripcion: 'Cableado estructurado, instalación de cámaras de seguridad y montaje de servidores para oficinas y hogares.',
    caracteristicas: [
      'Cámaras de seguridad (analógico/IP)',
      'Sistemas de control de acceso',
      'Montaje y administración de servidores',
      'Mantenimiento de infraestructura'
    ],
    icono: 'Server',
    imagen: '/images/servicios/redes-infraestructura.png'
  },
  {
    id: 's-4',
    slug: 'consultoria-tecnologica',
    titulo: 'Consultoría Tecnológica',
    descripcion: 'Asesoría estratégica para transformación digital, evaluación de infraestructura y consultoría en ciberseguridad.',
    caracteristicas: [
      'Planificación de proyectos tecnológicos',
      'Asesoría para transformación digital',
      'Consultoría en ciberseguridad',
      'Provisión de equipos a instituciones'
    ],
    icono: 'LineChart',
    imagen: '/images/servicios/consultoria-tecnologica.png'
  }
];
