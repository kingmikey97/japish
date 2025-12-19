'use client';

import { Linkedin, Github, Mail, Phone, Globe, Video, Instagram, Facebook, Twitter, Youtube, MessageCircle, X, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function ProfileCard({ username }) {
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatBubble, setShowChatBubble] = useState(true);
  
  useEffect(() => {
    async function fetchProfile() {
      try {
        const usernameActual = username || 'mikey';
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', usernameActual)
          .single();
        
        if (error) {
          console.error('Error al obtener perfil:', error);
          setError(error.message);
          setLoading(false);
          return;
        }
        
        if (data && data.social_links) {
          data.social_links = data.social_links.map(link => {
            let icon;
            switch(link.type) {
              case 'linkedin': icon = Linkedin; break;
              case 'github': icon = Github; break;
              case 'email': icon = Mail; break;
              case 'website': icon = Globe; break;
              case 'tiktok':
              case 'youtube': icon = Video; break;
              case 'instagram': icon = Instagram; break;
              case 'facebook': icon = Facebook; break;
              case 'twitter': icon = Twitter; break;
              case 'whatsapp': icon = MessageCircle; break;
              default: icon = Globe;
            }
            return { ...link, icon };
          });
        }
        
        setProfileData(data);
        setLoading(false);
        
      } catch (err) {
        console.error('Error inesperado:', err);
        setError('Error al cargar el perfil');
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [username]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl">Cargando perfil...</p>
        </div>
      </div>
    );
  }
  
  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">😕 Usuario no encontrado</h1>
          <p className="text-xl text-gray-300 mb-6">
            {error || `El perfil "${username || 'mikey'}" no existe.`}
          </p>
          <a 
            href="/japish" 
            className="inline-block bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-600 transition"
          >
            Ir a JAPISH
          </a>
        </div>
      </div>
    );
  }
  
  const handleWhatsApp = () => {
    const message = "Hola! Vi tu tarjeta digital y me gustaría conectar.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${profileData.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 py-12">
      
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ============================================ */}
        {/* CARD PRINCIPAL */}
        {/* ============================================ */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-spin [animation-duration:3s]"></div>
              <div className="absolute inset-1 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
                <img 
                  src={profileData.image} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {profileData.name}
            </h1>
            <p className="text-xl text-cyan-400 mb-1">
              {profileData.title}
            </p>
            <p className="text-lg text-blue-300 font-semibold mb-3">
              @ {profileData.company}
            </p>
            <p className="text-gray-300">
              {profileData.specialization}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {profileData.social_links && profileData.social_links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.type}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition rounded-xl py-3 text-white group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{link.label}</span>
                </a>
              );
            })}
          </div>

          {profileData.whatsapp && (
            <button
              onClick={handleWhatsApp}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Contactar por WhatsApp
            </button>
          )}
          
        </div>
        
        {/* ============================================ */}
        {/* APARTADOS DE SERVICIOS - ESTILO SHOWCASE */}
        {/* ============================================ */}
        {profileData.services && profileData.services.length > 0 && (
          <div className="space-y-12">
            {profileData.services.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                
                {/* Título de sección */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {section.title}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </div>
                
                {/* Items - Estilo alternado (izq-der-izq) */}
                <div className="space-y-8">
                  {section.items.map((item, itemIdx) => {
                    const isEven = itemIdx % 2 === 0;
                    
                    return (
                      <div
                        key={itemIdx}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all"
                      >
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                          
                          {/* Imagen */}
                          <div className={`relative h-64 md:h-full ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {/* Overlay con icono */}
                            <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
                              {item.icon}
                            </div>
                          </div>
                          
                          {/* Contenido */}
                          <div className={`p-8 flex flex-col justify-center ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}>
                            <h3 className="text-2xl font-bold text-white mb-4">
                              {item.name}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
            ))}
          </div>
        )}
        
        {/* ============================================ */}
        {/* FOOTER */}
        {/* ============================================ */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-2">
            Powered by
          </p>
          <a 
            href="/japish"
            className="inline-block"
          >
            <span className="text-cyan-400 font-bold text-lg hover:text-cyan-300 transition">
              JAPISH
            </span>
          </a>
          <p className="text-xs text-gray-500 mt-1">
            by Valhalla Technology
          </p>
        </div>
        
      </div>
      
      {/* ============================================ */}
      {/* FLOATING CHAT BUTTON - AD NO INVASIVO */}
      {/* ============================================ */}
      <div className="fixed bottom-6 right-6 z-50">
        
        {/* Burbuja de chat */}
        {showChatBubble && (
          <div className="absolute bottom-20 right-0 mb-2 animate-bounce">
            <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-xs">
              {/* Flecha */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
              
              {/* Contenido */}
              <div className="relative z-20">
                <button
                  onClick={() => setShowChatBubble(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                
                <p className="text-slate-900 font-semibold mb-1">
                  ¿Quieres tu propia tarjeta?
                </p>                
              </div>
            </div>
          </div>
        )}
        
        {/* Botón flotante */}
        <a
          href="/japish"
          className="group w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-cyan-500/50 border-4 border-white"
        >
          {/* Logo o inicial */}
          <span className="text-white text-2xl font-bold">V</span>
          
          {/* Badge pulsante */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
        </a>        
      </div>
    </div>
  );
}