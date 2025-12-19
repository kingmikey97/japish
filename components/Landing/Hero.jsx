'use client';

import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* ============================================ */}
      {/* BACKGROUND CON GRADIENTE ANIMADO */}
      {/* ============================================ */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Círculos decorativos animados */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>
      
      {/* ============================================ */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ============================================ */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge/Etiqueta superior */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold">
              Tecnología NFC del Futuro
            </span>
          </div>
          
          {/* ============================================ */}
          {/* TÍTULO PRINCIPAL */}
          {/* ============================================ */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tu Tarjeta de Presentación
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Inteligente
            </span>
          </h1>
          
          {/* ============================================ */}
          {/* SUBTÍTULO */}
          {/* ============================================ */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Olvídate del papel. Comparte tu información profesional o de tu negocio con un simple 
            <span className="text-cyan-400 font-semibold"> JAPISH </span> 
            usando tecnología NFC de última generación.
          </p>
          
          {/* ============================================ */}
          {/* FEATURES RÁPIDOS (3 iconos) */}
          {/* ============================================ */}
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
          
          {/* ============================================ */}
          {/* BOTONES CTA */}
          {/* ============================================ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* Botón principal */}
            <a
              href="#pricing"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2">
              Obtener mi tarjeta JAPISH
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Botón secundario */}
            <a
              href="/profile/mikey"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2">
              Ver demo
            </a>
          </div>
          
          {/* ============================================ */}
          {/* SOCIAL PROOF */}
          {/* ============================================ */}
          <div className="mt-12 text-gray-400 text-sm">
            <p>Únete al mundo digital con profesionales, emprendedores y empresarios que ya usan <span className="text-cyan-400 font-semibold">JAPISH</span> </p>
          </div>          
        </div>
      </div>
      
      {/* ============================================ */}
      {/* SCROLL INDICATOR */}
      {/* ============================================ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
    </section>
  );
}