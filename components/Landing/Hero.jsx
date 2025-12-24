'use client';

import { ArrowRight, Zap, Shield, Smartphone, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    
    // Limpiar el query (remover espacios, convertir a lowercase)
    const cleanQuery = searchQuery.trim().toLowerCase();
    
    // Redirigir al perfil
    router.push(`/japish/${cleanQuery}`);
    
    setSearching(false);
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold">
              Tecnología NFC del Futuro
            </span>
          </div>
          
          {/* Título */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tu Tarjeta de Presentación
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Inteligente
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Olvídate del papel. Comparte tu información profesional con un simple 
            <span className="text-cyan-400 font-semibold"> JAPISH </span> 
            usando tecnología NFC de última generación.
          </p>
          
          {/* ============================================ */}
          {/* BUSCADOR DE PERFILES - NUEVO */}
          {/* ============================================ */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                {/* Input */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar perfil por username... (ej: mikey)"
                  className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl px-6 py-5 pl-14 text-white placeholder-gray-400 text-lg focus:outline-none focus:border-cyan-500 transition-all"
                />
                {/* Sugerencias populares */}
         {/* Search icon */}
                <Search 
                  size={24} 
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!searchQuery.trim() || searching}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {searching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      Buscar
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              
              {/* Helper text */}
              <p className="text-sm text-gray-400 mt-3 text-left">
                💡 Ejemplo: busca <span className="text-cyan-400 font-semibold">mikey</span>, <span className="text-cyan-400 font-semibold">demo-basico</span>, o <span className="text-cyan-400 font-semibold">demo-premium</span>
              </p>
            </form>
          </div>
          
          {/* Divider */}
          <div className="flex items-center gap-4 my-8 max-w-2xl mx-auto">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-400 text-sm">O CONOCE MÁS</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          
          {/* Features rápidos */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-gray-300">
              <Smartphone size={20} className="text-cyan-400" />
              <span>Compatible con todos los smartphones</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Zap size={20} className="text-cyan-400" />
              <span>Actualización en tiempo real</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Shield size={20} className="text-cyan-400" />
              <span>Ecológico y profesional</span>
            </div>
          </div>
          
          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              Obtener mi tarjeta JAPISH
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="/japish/demo-premiun"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              Ver demo
            </a>
          </div>
          
          {/* Social proof */}
          <div className="mt-12 text-gray-400 text-sm">
            <p>Únete a <span className="text-cyan-400 font-semibold">100+</span> profesionales que ya usan JAPISH</p>
          </div>
          
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
    </section>
  );
}