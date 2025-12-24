'use client';

import { Shield, Server, Code, ArrowRight, Zap, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const servicios = [
    {
      icon: Shield,
      title: "Ciberseguridad",
      description: "Auditorías de seguridad, pentesting y protección avanzada de infraestructura",
      features: ["Análisis de vulnerabilidades", "Implementación de firewalls", "Respuesta a incidentes"]
    },
    {
      icon: Server,
      title: "Infraestructura Tecnologica",
      description: "Diseño, migración y optimización de arquitecturas o infraestructura tecnologica",
      features: ["Mejoramiento/implementacion de red wifi o cableada", "Instalaciones Electricas", "Citofonia", "Camaras de seguridad (analogicas y digitales)","Sistemas de alarmas"]
    },
    {
      icon: Code,
      title: "Desarrollo de Software",
      description: "Aplicaciones web, móviles y soluciones empresariales a medida",
      features: ["Apps web escalables", "Desarrollo móvil", "Integración de APIs"]
    }
  ];
  
  const stats = [
    { number: "50+", label: "Proyectos Completados" },
    { number: "98%", label: "Satisfacción de Clientes" },
    { number: "24/7", label: "Soporte Disponible" },
    { number: "5+", label: "Años de Experiencia" }
  ];
  
  return (
    <main className="bg-black">
      
      {/* ============================================ */}
      {/* HERO SECTION - PREMIUM */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Video/Grid background */}
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Animated orbs */}
          <div 
            className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s', transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
              <Award size={16} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold tracking-wide">
                TECNOLOGÍA DE CLASE MUNDIAL
              </span>
            </div>
            
            {/* Main title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">Construimos el</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 animate-gradient">
                Futuro Digital
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Soluciones tecnológicas empresariales de <span className="text-amber-400 font-semibold">nivel mundial</span>.
              Desde Servicio tecnico hasta Infraestructura tecnologica.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="https://wa.me/59164256727?text=Hola! Quiero información sobre servicios de ValhallaTechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-2"
              >
                Solicitar Consultoría
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="#servicios"
                className="bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10 hover:border-amber-500/30 flex items-center justify-center gap-2"
              >
                Ver Servicios
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-amber-500/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-amber-500 rounded-full animate-bounce"></div>
          </div>
        </div>
        
      </section>
      
      {/* ============================================ */}
      {/* SERVICIOS - PREMIUM CARDS */}
      {/* ============================================ */}
      <section id="servicios" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative">
        
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Servicios <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Empresariales</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Soluciones integrales diseñadas para impulsar tu transformación digital
            </p>
          </div>
          
          {/* Services grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;
              
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-3xl transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon size={32} className="text-amber-400" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">
                      {servicio.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {servicio.description}
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-3">
                      {servicio.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                </div>
              );
            })}
          </div>
          
        </div>
      </section>
      
      {/* ============================================ */}
      {/* PRODUCTO DESTACADO: JAPISH */}
      {/* ============================================ */}
      <section className="py-32 bg-black relative overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl">
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left - Content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                    <Zap size={16} className="text-white" />
                    <span className="text-white text-sm font-semibold">PRODUCTO INNOVADOR</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    JAPISH
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-8 leading-relaxed">
                    Tarjetas de presentación digitales con tecnología NFC. 
                    Revoluciona tu networking profesional con un simple toque.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/japish"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
                    >
                      Conocer JAPISH
                      <ArrowRight size={20} />
                    </a>
                    <a
                    
                      href="/japish/mikey"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
                    >
                      Ver Demo
                    </a>
                  </div>
                </div>
                
                {/* Right - Visual */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Card mockup */}
                    <div className="w-72 h-72 bg-white/10 backdrop-blur-2xl rounded-3xl border-2 border-white/30 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <div className="text-center">
                        <div className="text-8xl mb-4 animate-bounce">🃏</div>
                        <div className="text-white font-bold text-xl">NFC</div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-slate-900 font-bold shadow-xl animate-pulse">
                      <TrendingUp size={32} className="mb-1" />
                      <span className="text-xs">NUEVO</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* CTA FINAL */}
      {/* ============================================ */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 relative">
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">transformar</span> tu negocio?
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo podemos llevar tu empresa al siguiente nivel
            </p>
            
            <a
              href="https://wa.me/59164256727?text=Hola! Quiero agendar una consultoría gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black px-10 py-5 rounded-xl font-bold text-xl hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
            >
              <Users size={24} />
              Agendar Consultoría Gratuita
              <ArrowRight size={24} />
            </a>
            
          </div>
        </div>
      </section>
      
      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
              VALHALLA TECHNOLOGY
            </div>
            <p className="text-gray-400 mb-6">
              Excelencia tecnológica desde Bolivia para el mundo
            </p>
            <p className="text-sm text-gray-600">
              © 2025 Valhalla Technology. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
    </main>
  );
}
