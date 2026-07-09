'use client';

// import { useState } from 'react';
import { Linkedin, Github, Mail, Phone, Globe, Video, Instagram, Facebook, Twitter, Youtube, MessageCircle, X, ExternalLink, Search, FileVideo, MonitorPlay, VideoIcon, ImagePlay, PlaySquareIcon, MapPin } from 'lucide-react'; import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { getTemplate } from '@/lib/templates';
import { getColorOverride } from '@/lib/colorMap';
import LayoutBasic from './profile-layouts/LayoutBasic';
import LayoutModern from './profile-layouts/LayoutModern';
import LayoutProfessional from './profile-layouts/LayoutProfessional';
import LayoutElegant from './profile-layouts/LayoutElegant';
import LayoutPremium from './profile-layouts/LayoutPremium';
import { getLayoutComponent } from '@/lib/templates';
import EmbedVideo from './EmbedVideo';
import LayoutInfluencer from './profile-layouts/LayoutInfluencer';


export default function ProfileCard({ username }) {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [lightbox, setLightbox] = useState(null);

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
            switch (link.type) {
              case 'linkedin': icon = Linkedin; break;
              case 'github': icon = Github; break;
              case 'email': icon = Mail; break;
              case 'website': icon = Globe; break;
              case 'tiktok': icon = VideoIcon; break;
              case 'youtube': icon = PlaySquareIcon; break;
              case 'instagram': icon = Instagram; break;
              case 'facebook': icon = Facebook; break;
              case 'twitter': icon = Twitter; break;
              case 'whatsapp': icon = MessageCircle; break;
              case 'map-pin': icon = MapPin; break;
              default: icon = Globe;
            }
            return { ...link, icon };
          });
        }

        setProfileData(data);
        setLoading(false);

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
  const baseTemplate = getTemplate(profileData.template_id);

  // Si el perfil es template 1-5 y tiene bg_color_id, sobreescribimos
  // fondo, botón principal y accent — el resto del template queda igual
  const colorOverride =
    profileData.template_id <= 5 ? getColorOverride(profileData.bg_color_id) : null;

  const template = colorOverride
    ? {
        ...baseTemplate,
        colors: {
          ...baseTemplate.colors,
          background: colorOverride.background,
          card: colorOverride.card,
          cardBorder: colorOverride.cardBorder,
          secondary: colorOverride.secondary,
          accent: colorOverride.accent,
          buttonPrimary: colorOverride.buttonPrimary,
          buttonSecondary: colorOverride.buttonSecondary,
          ringColor: colorOverride.ringColor
        }
      }
    : baseTemplate;

  // Primero intentar obtener layout personalizado (templates 100+)
  let LayoutComponent = getLayoutComponent(profileData.template_id);

  // Si no hay layout personalizado, usar los layouts básicos (1-5)
  if (!LayoutComponent) {
    LayoutComponent = {
      1: LayoutBasic,
      2: LayoutModern,
      3: LayoutProfessional,
      4: LayoutElegant,
      5: LayoutPremium,
      10: LayoutInfluencer
    }[profileData.template_id] || LayoutModern;
  }

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <div className={`min-h-screen ${profileData.template_id <= 5 ? `bg-gradient-to-br ${template.colors.background}` : ''} p-4 py-12`}>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Renderizar layout específico */}
          <LayoutComponent
            profileData={profileData}
            template={template}
            handleWhatsApp={handleWhatsApp}
          />

          {/* APARTADOS DE SERVICIOS - Solo para templates 1-5 */}
          {profileData.template_id <= 99 && profileData.services && profileData.services.length > 0 && (
            <div className="space-y-7">
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

                  {section.items && Array.isArray(section.items) && section.layout === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {section.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className={`${template.colors.card} border ${template.colors.cardBorder} ${template.styles.cardRounded} overflow-hidden hover:bg-white/10 transition-all flex flex-col`}
                        >
                          <div className="relative h-48">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover cursor-zoom-in"
                              onClick={() => setLightbox(item.image)}
                            />
                            {item.badges && item.badges.length > 0 && (
                              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-2">
                                {item.badges.map((badge, i) => (
                                  <span
                                    key={i}
                                    className="bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-lg text-center leading-tight"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.tag && (
                              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          <div className="p-4 flex flex-col flex-1">
                            <h3 className={`text-sm font-semibold ${template.colors.primary} mb-3 flex-1`}>
                              {item.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div>
                                {item.oldPrice && (
                                  <p className="text-xs line-through opacity-50">
                                    BS. {item.oldPrice.toLocaleString()}
                                  </p>
                                )}
                                <p className={`font-bold ${template.colors.accent}`}>
                                  BS. {item.price?.toLocaleString()}
                                </p>
                              </div>
                              {/* <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${template.colors.buttonPrimary} flex items-center justify-center`}>
                                <ExternalLink size={16} className="text-white" />
                              </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Items en modo fila (comportamiento original, sin layout: grid) */}
                  {section.items && Array.isArray(section.items) && section.layout !== 'grid' && (
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
                                    className="w-full h-full object-cover cursor-zoom-in"
                                    onClick={() => setLightbox(item.image)}
                                  />
                                )}
                                <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
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
                                {item.downloadable && (
                                  <button
                                    onClick={async () => {
                                      try {
                                        const res = await fetch(item.image);
                                        const blob = await res.blob();
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = item.name || 'imagen';
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                      } catch {
                                        window.open(item.image, '_blank');
                                      }
                                    }}
                                    className={`mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-semibold py-2 ${template.styles.buttonRounded} transition-all shadow-md text-sm`}
                                  >
                                    ⬇️ Descargar imagen
                                  </button>
                                )}
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
{/* 
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
          )} */}

          {/* <a
            href="/japish"
            className={`group w-16 h-16 bg-gradient-to-br ${template.colors.buttonPrimary} rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-cyan-500/50 border-4 border-white`}
          >
            <span className="text-white text-2xl font-bold">si</span>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
          </a> */}

        </div>

      </div>
      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="preview"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{ animation: 'fadeUp 0.2s ease both' }}
          />
        </div>
      )}
    </>
  );
}