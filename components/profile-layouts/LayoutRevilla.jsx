'use client';


import { Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';  // ⭐ AGREGAR useEffect

export default function LayoutCampañaPolitica({ profileData, template, handleWhatsApp }) {

  // ============================================
  // PROCESAR SERVICES
  // ============================================
  const sections = profileData.services || [];

  // Separar secciones normales (con items) de posts (con imagenes)
  const seccionesNormales = sections.filter(s => s.items && Array.isArray(s.items));
  const posts = sections.filter(s => s.imagenes && Array.isArray(s.imagenes));

  return (
    <div className="space-y-8">

      {/* ========================================
          HEADER CON FOTO Y DATOS
          ======================================== */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-300">
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* Foto del candidato */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white p-2 shadow-2xl">
              <img
                src={profileData.image || '/profile.png'}
                alt={profileData.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-3xl">🏛️</span>
            </div>
          </div>

          {/* Info del candidato */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
              {profileData.name}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-yellow-100 mb-3">
              {profileData.title}
            </p>
            {/* {profileData.especialization && (
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                {profileData.especialization}
              </p>
            )} */}
          </div>
        </div>
      </div>

      {/* ========================================
          CONTACTO
          ======================================== */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {profileData.whatsapp && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md">
                <Phone className="text-white" size={26} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">WhatsApp</p>
                <button
                  onClick={handleWhatsApp}
                  className="text-gray-900 font-bold hover:text-yellow-600 transition-colors"
                >
                  {profileData.whatsapp}
                </button>
              </div>
            </div>
          )}
          {profileData.company && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md">
                <MapPin className="text-white" size={26} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Organización</p>
                 
                <p className="text-gray-900 font-bold">{profileData.company}</p>
              </div>
            </div>
          )}

          {profileData.social_links && profileData.social_links.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center shadow-md">
                <Mail className="text-white" size={26} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Redes Sociales</p>
                <div className="flex gap-2">
                  {profileData.social_links.slice(0, 3).map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-yellow-600 transition-colors"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          SECCIONES NORMALES (con items e imagen)
          Ejemplo: Propuestas, Habitaciones, etc.
          ======================================== */}
      {seccionesNormales.map((section, sectionIdx) => (
        <div key={sectionIdx}>

          {/* Título de la sección */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                <span className="text-white">
                  {section.title}
                </span>
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Items de la sección */}
          <div className="space-y-8">
            {section.items.map((item, itemIdx) => {
              const isEven = itemIdx % 2 === 0;

              return (
                <div
                  key={itemIdx}
                  className="bg-white/10 backdrop-blur-lg border-4 border-yellow-400 rounded-3xl overflow-hidden hover:bg-white/20 transition-all shadow-2xl"
                >
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isEven ? '' : 'md:grid-flow-dense'}`}>

                    {/* Imagen */}
                    <div className={`relative h-64 md:h-full ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Icono sobre la imagen */}
                      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white">
                        {item.icon}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className={`p-8 flex flex-col justify-center ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}>
                      <h3 className="text-3xl font-black text-white mb-4">
                        {item.name}
                      </h3>
                      <p className="text-black text-lg leading-relaxed">
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

      {/* ========================================
          POSTS CON CARRUSEL (con imagenes)
          Ejemplo: Eventos, Actividades, etc.
          ======================================== */}
      {posts.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-3xl p-8">

          {/* Título de eventos */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                <span className="text-white">
                  Eventos y Actividades
                </span>

              </span>
            </h2>
            <p className="text-gray-500 text-lg">Recorridos y Trabajo en terreno</p>
          </div>

          {/* Posts */}
    <div className="space-y-12">
      {posts.slice(0, 37).map((post, i) => (
        <PostCard key={i} post={post} index={i} />
      ))}
    </div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-3xl p-8">

          {/* Título de eventos */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              <span className="text-white">
                Plan de Gobierno
              </span>
            </h2>
            <p className="text-gray-500 text-lg">
              
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-12">
      {posts.slice(37, 44).map((post, i) => (
        <PostCard key={i} post={post} index={i} />
      ))}
    </div>

        </div>
      )}

    </div>
  );
}

// ============================================
// COMPONENTE: POST CON CARRUSEL
// ============================================
// ============================================
// COMPONENTE: POST CON CARRUSEL
// ============================================
function PostCard({ post, index }) {
  const [currentImage, setCurrentImage] = useState(0);
  const imagenes = post.imagenes || [];

  // ⭐ AUTO-PLAY: Cambiar imagen cada 3 segundos
  useEffect(() => {
    if (imagenes.length <= 1) return; // No hacer nada si solo hay 1 imagen

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagenes.length);
    }, 3000); // 3000ms = 3 segundos

    return () => clearInterval(interval); // Limpiar al desmontar
  }, [imagenes.length]);

  const nextImage = () => setCurrentImage((p) => (p + 1) % imagenes.length);
  const prevImage = () => setCurrentImage((p) => (p - 1 + imagenes.length) % imagenes.length);

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400">

      {/* Título y descripción */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-2xl font-black text-white">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-3">
              {post.titulo}
            </h3>
            {/* ⭐ TEXTO NEGRO en móvil y desktop */}
            <p className="text-base md:text-lg text-gray-900 leading-relaxed">
              {post.descripcion}
            </p>
          </div>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      {imagenes.length > 0 && (
        <div className="relative bg-gray-900 aspect-video">
          <img
            src={imagenes[currentImage]}
            alt={`${post.titulo} - ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Controles del carrusel */}
          {imagenes.length > 1 && (
            <>
              {/* ⭐ BOTÓN IZQUIERDO */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={24} className="text-white md:w-7 md:h-7" />
              </button>

              {/* ⭐ BOTÓN DERECHO */}
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
                aria-label="Foto siguiente"
              >
                <ChevronRight size={24} className="text-white md:w-7 md:h-7" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all ${i === currentImage
                      ? 'bg-yellow-400 w-8 md:w-10 h-2 md:h-3'
                      : 'bg-white/60 hover:bg-white/90 w-2 md:w-3 h-2 md:h-3'
                      }`}
                    aria-label={`Ir a foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Contador */}
          <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/80 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
            📷 {currentImage + 1} / {imagenes.length}
          </div>
        </div>
      )}
    </div>
  );
}