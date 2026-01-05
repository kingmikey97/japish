'use client';

import { Phone, MapPin, Briefcase } from 'lucide-react';

export default function LayoutProfessional({ profileData, template, handleWhatsApp }) {
  return (
    <div className="max-w-5xl mx-auto">
      
      <div className={`${template.colors.card} ${template.styles.cardRounded} ${template.styles.shadow} border ${template.colors.cardBorder} overflow-hidden`}>
        
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* SIDEBAR - Foto e info básica */}
          <div className="md:col-span-1 bg-gradient-to-b from-emerald-900/30 to-teal-900/30 p-8 text-center">
            
            {/* Foto cuadrada */}
            <div className="mb-6">
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-xl border-4 border-emerald-500/30"
              />
            </div>
            
            <h1 className={`text-2xl font-bold ${template.colors.primary} mb-3`}>
              {profileData.name}
            </h1>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-2">
                <Briefcase size={18} className="text-emerald-400 mt-1" />
                <div>
                  <p className={`text-sm ${template.colors.accent} font-semibold`}>
                    {profileData.title}
                  </p>
                  <p className={`text-xs ${template.colors.secondary}`}>
                    {profileData.company}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-emerald-400 mt-1" />
                <p className={`text-sm ${template.colors.secondary}`}>
                  {profileData.specialization}
                </p>
              </div>
            </div>
            
          </div>
          
          {/* CONTENIDO PRINCIPAL */}
          <div className="md:col-span-2 p-8">
            
            <h2 className={`text-xl font-bold ${template.colors.primary} mb-4`}>
              Conecta conmigo
            </h2>
            
            {/* Grid 3 columnas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {profileData.social_links?.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.type}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 ${template.colors.buttonSecondary} py-4 ${template.styles.buttonRounded} hover:bg-emerald-900/40 transition-all group`}
                  >
                    <Icon size={24} className={`${template.colors.accent} group-hover:scale-110 transition-transform`} />
                    <span className={`text-xs ${template.colors.primary}`}>{link.label}</span>
                  </a>
                );
              })}
            </div>
            
            {profileData.whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Phone size={20} />
                Enviar mensaje
              </button>
            )}
            
          </div>
          
        </div>
        
      </div>
    </div>
  );
}