'use client';

import { MessageCircle } from 'lucide-react';

export default function LayoutInfluencer({ profileData, template, handleWhatsApp }) {
    console.log('profileData:', profileData);
    return (
        <>
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .gradient-text {
          background: linear-gradient(90deg, #f472b6, #a78bfa, #38bdf8, #f472b6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
        }
        .float { animation: floatY 3s ease-in-out infinite; }
        .link-card { animation: fadeUp 0.4s ease both; opacity: 0; }
      `}</style>

            <div className="max-w-md mx-auto px-4 py-8 relative">
                <div
                    className="fixed inset-0 -z-10"
                    style={{
                        backgroundImage: 'url(/influencer2.png)',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                {/* Foto con glow */}
                <div className="flex justify-center mb-6">
                    <div className="relative float">
                        <div
                            className="absolute -inset-3 rounded-full opacity-60 animate-pulse"
                            style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #38bdf8)', filter: 'blur(16px)' }}
                        />
                        <img
                            src={profileData.image}
                            alt={profileData.name}
                            className="relative w-65 h-65 rounded-full object-cover border-2 border-white/20"
                        />
                    </div>
                </div>

                {/* Nombre y título */}
                <div
                    className="text-center mb-8"
                    style={{ animation: 'fadeUp 0.5s 0.1s ease both', opacity: 0 }}
                >
                    <h1 className="text-3xl font-bold mb-1 gradient-text ">
                        {profileData.name}
                    </h1>
                    <p className="text-blue-800 text-sm mb-1">{profileData.title}</p>
                    <p className="text-gray-700 text-xs">{profileData.company}</p>
                </div>

                {/* Links en grid 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {profileData.social_links?.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.type}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-card flex flex-col items-center gap-2 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all group"
                                style={{ animationDelay: `${0.5 + i * 0.28}s` }}
                            >
                                <Icon size={26} className="text-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                                <span className="text-xs text-slate-600">{link.label}</span>
                            </a>
                        );
                    })}
                </div>

                {/* WhatsApp */}
                {profileData.whatsapp && (
                    <button
                        onClick={handleWhatsApp}
                        className="w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                        style={{
                            background: 'linear-gradient(90deg, #f472b6, #a78bfa, #38bdf8)',
                            backgroundSize: '200% 200%',
                            animation: 'fadeUp 0.4s 0.6s ease both, gradientShift 4s ease infinite',
                            opacity: 0,
                        }}
                    >
                        <MessageCircle size={20} />
                        Contacto por whatsApp
                    </button>
                )}

            </div>
        </>
    );
}