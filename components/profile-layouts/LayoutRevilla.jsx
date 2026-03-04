'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LayoutCampañaPolitica({ profileData, handleWhatsApp }) {
  // ⭐ CORRECCIÓN: services es un array directo, no tiene section.items
  const servicios = profileData.services || [];
  
  // Separar propuestas (sin imagenes) de eventos (con imagenes)
  const propuestas = servicios.filter(s => !s.imagenes || !Array.isArray(s.imagenes));
  const eventos = servicios.filter(s => s.imagenes && Array.isArray(s.imagenes));

  

  return (
    <div className="space-y-8">
      
      {/* Header con foto y datos */}
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
            {profileData.especialization && (
              <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                {profileData.especialization}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Contacto */}
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
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center shadow-md">
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

      Propuestas (sin imágenes) 
     {propuestas.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Propuestas de Gobierno
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Plan de trabajo para La Paz</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propuestas.map((propuesta, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 border-yellow-300 hover:border-yellow-500 group hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <span className="text-4xl">{propuesta.icono || '📋'}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  {propuesta.titulo}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {propuesta.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      

      {/* Eventos con fotos (con imágenes) */}
      {eventos.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Eventos y Actividades
              </span>
            </h2>
            <p className="text-gray-300 text-lg">Recorridos y trabajo en terreno</p>
          </div>
          
          <div className="space-y-12">
            {eventos.map((evento, i) => (
              <EventoCard key={i} evento={evento} index={i} />
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

// Componente de tarjeta de evento con carrusel
function EventoCard({ evento, index }) {
  const [currentImage, setCurrentImage] = useState(0);
  const imagenes = evento.imagenes || [];
  
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
              {evento.titulo}
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {evento.descripcion}
            </p>
          </div>
        </div>
      </div>
      
      {/* Carrusel de imágenes */}
      {imagenes.length > 0 && (
        <div className="relative bg-gray-900 aspect-video">
          <img
            src={imagenes[currentImage]}
            alt={`${evento.titulo} - ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Controles del carrusel */}
          {imagenes.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
              >
                <ChevronLeft size={28} className="text-white" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
              >
                <ChevronRight size={28} className="text-white" />
              </button>
              
              {/* Indicadores */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all ${
                      i === currentImage 
                        ? 'bg-yellow-400 w-10 h-3' 
                        : 'bg-white/60 hover:bg-white/90 w-3 h-3'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Contador */}
          <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            📷 {currentImage + 1} / {imagenes.length}
          </div>
        </div>
      )}
    </div>
  );
}