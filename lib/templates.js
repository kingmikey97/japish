// ============================================
// TEMPLATES - DISEÑOS DE TARJETAS JAPISH
// ============================================
// Cada template define: colores, estilos, animaciones
import LayoutCampañaPolitica from '@/components/profile-layouts/LayoutRevilla';
import LayoutArtista from '@/components/profile-layouts/LayoutArtista';
import LayoutMedico from '@/components/profile-layouts/LayoutMedico';
import LayoutAbogado from '@/components/profile-layouts/LayoutAbogado';
import LayoutArquitecto from '@/components/profile-layouts/LayoutArquitecto';


export const templates = {

  // ============================================
  // TEMPLATE 1 - BÁSICO (Minimalista)
  // ============================================
  1: {
    name: "Básico",
    plan: "basico",

    // Colores
    colors: {
      background: "from-zinc-900 via-zinc-900 to-zinc-950",
      card: "bg-white/5",
      cardBorder: "border-white/10",
      primary: "text-gray-100",
      secondary: "text-gray-400",
      accent: "text-blue-400",
      buttonPrimary: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      buttonSecondary: "bg-white/5 hover:bg-white/10",
      ringColor: "from-blue-400 via-blue-500 to-blue-400"
    },

    // Estilos
    styles: {
      font: "font-sans",
      cardRounded: "rounded-2xl",
      buttonRounded: "rounded-lg",
      shadow: "shadow-lg"
    },

    // Features
    features: {
      animations: false,
      glassmorphism: false,
      gradient: false
    }
  },

  // ============================================
  // TEMPLATE 2 - MODERNO (Actual)
  // ============================================
  2: {
    name: "Moderno",
    plan: "basico",

    colors: {
      background: "from-slate-900 via-blue-900 to-slate-800",
      card: "bg-white/3 backdrop-blur-lg",
      cardBorder: "border-white/20",
      primary: "text-white",
      secondary: "text-gray-300",
      accent: "text-cyan-500",
      buttonPrimary: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      buttonSecondary: "bg-white/5 hover:bg-white/10",
      ringColor: "from-teal-800 via-cyan-400 to-teal-800"
    },

    styles: {
      font: "font-serif",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-4xl",
      shadow: "shadow-2xl"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    }
  },

  // ============================================
  // TEMPLATE 3 - PROFESIONAL (Corporativo)
  // ============================================
  3: {
    name: "Profesional",
    plan: "profesional",

    colors: {
      background: "from-slate-850 via-slate-700 to-slate-850",
      card: "bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm",
      cardBorder: "border-slate-100/30",
      primary: "text-slate-100",
      secondary: "text-slate-300",
      accent: "text-emerald-500",
      buttonPrimary: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      buttonSecondary: "bg-slate-800 hover:bg-slate-700",
      ringColor: "from-emerald-700 via-teal-500 to-emerald-700"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-2xl",
      buttonRounded: "rounded-lg",
      shadow: "shadow-xl shadow-emerald-900/20"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    }
  },

  // ============================================
  // TEMPLATE 4 - ELEGANTE (Premium Gold)
  // ============================================
  4: {
    name: "Elegante",
    plan: "profesional",

    colors: {
      background: "from-zinc-900 via-zinc-800 to-zinc-900",
      card: "bg-gradient-to-br from-yellow-900/20 to-rose-900/10 backdrop-blur-md",
      cardBorder: "border-yellow-600/30",
      primary: "text-yellow-50",
      secondary: "text-yellow-200/70",
      accent: "text-yellow-400",
      buttonPrimary: "from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
      buttonSecondary: "bg-yellow-900/20 hover:bg-yellow-800/40",
      ringColor: "from-yellow-400 via-rose-500 to-yellow-500"
    },

    styles: {
      font: "font-serif",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-full",
      shadow: "shadow-2xl shadow-amber-900/40"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    }
  },

  // ============================================
  // TEMPLATE 5 - PREMIUM (Ultra Modern)
  // ============================================
  5: {
    name: "Premium",
    plan: "premium",

    colors: {
      background: "from-purple-950 via-slate-900 to-pink-950",
      card: "bg-white/10 backdrop-blur-2xl",
      cardBorder: "border-purple-500/30",
      primary: "text-white",
      secondary: "text-purple-200",
      accent: "text-purple-400",
      buttonPrimary: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      buttonSecondary: "bg-white/10 hover:bg-white/20",
      ringColor: "from-purple-500 via-pink-500 to-purple-500"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-2xl",
      shadow: "shadow-2xl shadow-purple-900/50"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    }

  },
  10: {
    name: "Influencer",
    plan: "premium",

    colors: {
      background: "from-transparent via-transparent to-transparent",
      // card: "bg-white/5 backdrop-blur-xl",
      cardBorder: "border-white/10",
      primary: "text-blue-600",
      secondary: "text-slate-700",
      accent: "text-white-400",
      buttonPrimary: "from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700",
      buttonSecondary: "bg-white/5 hover:bg-white/10",
      ringColor: "from-pink-500 via-violet-500 to-pink-500"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-2xl",
      shadow: "shadow-2xl"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    }
  },
  11: {
    name: "Artista",
    plan: "premium",

    colors: {
      background: "from-transparent via-transparent to-transparent",
      cardBorder: "border-cyan-400/20",
      primary: "text-white",
      secondary: "text-indigo-200/70",
      accent: "text-cyan-400",
      buttonPrimary: "from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700",
      buttonSecondary: "bg-white/5 hover:bg-white/10",
      ringColor: "from-cyan-400 via-indigo-500 to-cyan-400"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-2xl",
      shadow: "shadow-2xl shadow-indigo-900/40"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    },
    layoutComponent: LayoutArtista
  },
  12: {
    name: "Médico",
    plan: "premium",

    colors: {
      background: "from-transparent via-transparent to-transparent",
      // card: "bg-white/5 backdrop-blur-xl",
      cardBorder: "border-teal-300/20",
      primary: "text-white",
      secondary: "text-sky-200/60",
      accent: "text-teal-300",
      buttonPrimary: "from-teal-400 to-sky-500 hover:from-teal-500 hover:to-sky-600",
      buttonSecondary: "bg-white/5 hover:bg-teal-400/10",
      ringColor: "from-teal-300 via-sky-400 to-teal-300"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-2xl",
      buttonRounded: "rounded-lg",
      shadow: "shadow-xl shadow-cyan-900/30"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    },

    layoutComponent: LayoutMedico
  },
  13: {
    name: "Abogado",
    plan: "premium",

    colors: {
      background: "from-transparent via-transparent to-transparent",

      cardBorder: "border-yellow-700/30",
      primary: "text-yellow-50",
      secondary: "text-yellow-200/60",
      accent: "text-yellow-400",
      buttonPrimary: "from-yellow-600 to-yellow-800 hover:from-yellow-700 hover:to-yellow-900",
      buttonSecondary: "bg-yellow-900/20 hover:bg-yellow-800/30 border border-yellow-700/30",
      ringColor: "from-yellow-400 via-yellow-600 to-yellow-400"
    },

    styles: {
      font: "font-serif",
      cardRounded: "rounded-2xl",
      buttonRounded: "rounded-lg",
      shadow: "shadow-2xl shadow-yellow-900/30"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    },

    layoutComponent: LayoutAbogado
  },
  14: {
    name: "Arquitecto",
    plan: "premium",

    colors: {
      background: "from-transparent via-transparent to-transparent",
      // card: "bg-slate-50/90 backdrop-blur-md",
      cardBorder: "border-slate-300/60",
      primary: "text-white",
      secondary: "text-slate-500",
      accent: "text-amber-600",
      buttonPrimary: "from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800",
      buttonSecondary: "bg-slate-100 hover:bg-slate-200 border border-slate-300",
      ringColor: "from-amber-400 via-amber-600 to-amber-400"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-2xl",
      buttonRounded: "rounded-lg",
      shadow: "shadow-2xl shadow-slate-900/30"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: false
    },

    layoutComponent: LayoutArquitecto
  },
  101: {
    name: "Campaña Política",
    plan: "premium",

    // Colores para vista previa en búsqueda
    colors: {
      background: "from-yellow-500 via-yellow-400 to-yellow-600",
      card: "bg-white/95 backdrop-blur-lg",
      cardBorder: "border-yellow-400",
      primary: "text-gray-900",
      secondary: "text-gray-700",
      accent: "text-yellow-600",
      buttonPrimary: "from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600",
      buttonSecondary: "bg-yellow-100 hover:bg-yellow-200",
      ringColor: "from-yellow-400 via-yellow-500 to-yellow-400"
    },

    styles: {
      font: "font-sans",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-xl",
      shadow: "shadow-2xl shadow-yellow-500/20"
    },

    features: {
      animations: true,
      glassmorphism: true,
      gradient: true
    },

    // ⭐ COMPONENTE DE LAYOUT PERSONALIZADO
    layoutComponent: LayoutCampañaPolitica
  }

};

// ============================================
// FUNCIÓN HELPER: Obtener template por ID
// ============================================
export function getTemplate(templateId) {
  return templates[templateId] || templates[4]; // Default: Moderno
}

// ============================================
// FUNCIÓN: Obtener componente de layout personalizado
// ============================================
export function getLayoutComponent(templateId) {
  const template = templates[templateId];
  return template?.layoutComponent || null;
}