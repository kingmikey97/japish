'use client';

import { Shield, Server, Code, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  
  const servicios = [
    {
      icon: Shield,
      title: "Ciberseguridad",
      description: "Protección integral de tu infraestructura digital",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Server,
      title: "Infraestructura",
      description: "Diseño e implementación de arquitecturas cloud",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Code,
      title: "Desarrollo",
      description: "Software a medida para tu negocio",
      color: "from-purple-500 to-pink-500"
    }
  ];
  
  return (
    <main className="bg-slate-900">
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Valhalla
              </span>
              <br />
              Technology
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-12">
              Soluciones tecnológicas de <span className="text-cyan-400 font-semibold">nivel empresarial</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {servicios.map((servicio, index) => {
                const Icon = servicio.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${servicio.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {servicio.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {servicio.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/japish"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
              >
                Ver JAPISH
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://wa.me/59177777777?text=Hola! Quiero información sobre servicios de Valhalla Technology"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                Contactar
              </a>
            </div>
            
          </div>
        </div>
        
      </section>
      
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
                    <Zap size={16} className="text-white" />
                    <span className="text-white text-sm font-semibold">Producto Destacado</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    JAPISH
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-6">
                    Tarjetas de presentación digitales con tecnología NFC. 
                    El futuro del networking profesional.
                  </p>
                  
                  <a
                    href="/japish"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    Conocer más
                    <ArrowRight size={20} />
                  </a>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/30 flex items-center justify-center">
                      <span className="text-6xl">🃏</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900">
                      NFC
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      <footer className="py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 <span className="text-cyan-400 font-semibold">Valhalla Technology</span>. 
            Todos los derechos reservados.
          </p>
        </div>
      </footer>
      
    </main>
  );
}