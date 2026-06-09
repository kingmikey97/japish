'use client';

import {Linkedin, Github, Mail, Phone, Globe, Video, Instagram, Facebook, Twitter, Youtube, MessageCircle, X, ExternalLink, Search } from 'lucide-react';import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { getTemplate } from '@/lib/templates';
import LayoutBasic from './profile-layouts/LayoutBasic';
import LayoutModern from './profile-layouts/LayoutModern';
import LayoutProfessional from './profile-layouts/LayoutProfessional';
import LayoutElegant from './profile-layouts/LayoutElegant';
import LayoutPremium from './profile-layouts/LayoutPremium';
import { getLayoutComponent } from '@/lib/templates';
import EmbedVideo from './EmbedVideo';


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
      
      // ============================================
      // MANEJO MEJORADO DE ERRORES
      // ============================================
      if (error) {
        // Si el error es que no se encontró el registro
        if (error.code === 'PGRST116' || error.message?.includes('0 rows')) {
          console.log(`Perfil "${usernameActual}" no encontrado en base de datos`);
          setError(`El perfil "${usernameActual}" no existe.`);
        } else {
          // Otro tipo de error (conexión, permisos, etc)
          console.error('Error de Supabase:', error);
          setError(error.message || 'Error al cargar el perfil. Por favor intenta de nuevo.');
        }
        setLoading(false);
        return;
      }
      
      // ============================================
      // VERIFICAR QUE DATA EXISTE
      // ============================================
      if (!data) {
        console.log(`Perfil "${usernameActual}" no encontrado (data null)`);
        setError(`El perfil "${usernameActual}" no existe.`);
        setLoading(false);
        return;
      }
      
      // ============================================
      // TRANSFORMAR DATOS
      // ============================================
      if (data.social_links) {
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

      const template = getTemplate(data.template_id);
      
    } catch (err) {
      // Error inesperado (red, timeout, etc)
      console.error('Error inesperado al cargar perfil:', err);
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-2xl w-full">
        
        {/* Error card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
          
          {/* Icon */}
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Perfil no encontrado
          </h1>
          
          {/* Message */}
          <p className="text-xl text-gray-300 mb-8">
            {error || `El perfil "${username || 'mikey'}" no existe en nuestra base de datos.`}
          </p>
          
          {/* Suggestions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-white mb-3">Sugerencias:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Verifica que el username esté escrito correctamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Prueba buscar en la landing de JAPISH</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Ejemplos válidos: <code className="bg-white/10 px-2 py-1 rounded">mikey</code>, <code className="bg-white/10 px-2 py-1 rounded">demo-basico</code></span>
              </li>
            </ul>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/japish" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
        
              <Search size={20} />
              Buscar otro perfil
            </a>
            
            <a
              href="/"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              Ir al sitio web de ValhallaTechnology?
            </a>
          </div>
          
        </div>
        
        {/* Help text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          ¿Necesitas ayuda? <a href="https://wa.me/59177777777" className="text-cyan-400 hover:underline">Contáctanos</a>
        </p>
        
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

// ============================================
// CARGAR TEMPLATE
// ============================================
const template = getTemplate(profileData.template_id);

// Seleccionar layout según template
// ============================================
// SELECCIONAR LAYOUT
// ============================================


// Primero intentar obtener layout personalizado (templates 100+)
let LayoutComponent = getLayoutComponent(profileData.template_id);

// Si no hay layout personalizado, usar los layouts básicos (1-5)
if (!LayoutComponent) {
  LayoutComponent = {
    1: LayoutBasic,
    2: LayoutModern,
    3: LayoutProfessional,
    4: LayoutElegant,
    5: LayoutPremium
  }[profileData.template_id] || LayoutModern;
}

return (
  <div className={`min-h-screen bg-gradient-to-br ${template.colors.background} p-4 py-12`}>
    
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Renderizar layout específico */}
    <LayoutComponent 
      profileData={profileData}
      template={template}
      handleWhatsApp={handleWhatsApp}
    />      
      
   {/* APARTADOS DE SERVICIOS - Solo para templates 1-5 */}
{profileData.template_id <= 5 && profileData.services && profileData.services.length > 0 && (
  <div className="space-y-12">
    {profileData.services.map((section, sectionIdx) => (
      <div key={sectionIdx}>
        
        {/* Título de sección */}
        {section.title && (
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold ${template.colors.primary} mb-2`}>
              {section.title}
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r ${template.colors.ringColor} mx-auto rounded-full`}></div>
          </div>
        )}
        
        {/* Items de la sección (solo si existen) */}
        {section.items && Array.isArray(section.items) && (
 <div className="space-y-8">            
            {section.items.map((item, itemIdx) => {
              const isEven = itemIdx % 2 === 0;
              
              return (
                <div
                  key={itemIdx}
                  className={`${template.colors.card} border ${template.colors.cardBorder} ${template.styles.cardRounded} overflow-hidden hover:bg-white/10 transition-all`}
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                    
                   <div className={`relative h-64 md:h-full ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
  {/* Si tiene videoUrl, mostrar video; si no, mostrar imagen */}
  {item.videoUrl ? (
    <div className="w-full h-full">
      <EmbedVideo url={item.videoUrl} className="w-full h-full object-cover" />
    </div>
  ) : (
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  )}
  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
    {item.icon}
  </div>
</div>
                    
                    <div className={`p-8 flex flex-col justify-center ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}>
                      <h3 className={`text-2xl font-bold ${template.colors.primary} mb-4`}>
                        {item.name}
                      </h3>
                      <p className={template.colors.secondary + " leading-relaxed"}>
                        {item.description}
                      </p>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    ))}
  </div>
)}
      
      {/* FOOTER */}
      <div className={`text-center py-8 border-t ${template.colors.cardBorder}`}>
        <p className={`text-xs ${template.colors.secondary} mb-2`}>
          Powered by
        </p>
        <a href="/japish" className="inline-block">
          <span className={`${template.colors.accent} font-bold text-lg hover:opacity-80 transition`}>
            JAPISH
          </span>
        </a>
        <p className={`text-xs ${template.colors.secondary} mt-1`}>
          by ValhallaTechnology
        </p>
      </div>
      
    </div>
    
    {/* FLOATING CHAT BUTTON */}
    <div className="fixed bottom-6 right-6 z-50">
      
      {showChatBubble && (
        <div className="absolute bottom-20 right-0 mb-2 animate-bounce">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-xs">
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
            
            <div className="relative z-10">
              <button
                onClick={() => setShowChatBubble(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
              >
                <X size={14} className="text-gray-600" />
              </button>
              
              <p className="text-slate-900 font-semibold mb-2">
                ¿Quieres tu propia tarjeta?
              </p>
            </div>
          </div>
        </div>
      )}
      
      <a
        href="/japish"
        className={`group w-16 h-16 bg-gradient-to-br ${template.colors.buttonPrimary} rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-cyan-500/50 border-4 border-white`}
      >
        <span className="text-white text-2xl font-bold">si</span>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      </a>
      
    </div>
    
  </div>
);
}