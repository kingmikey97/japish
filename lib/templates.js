// ============================================
// TEMPLATES - DISEÑOS DE TARJETAS JAPISH
// ============================================
// Cada template define: colores, estilos, animaciones
import LayoutCampañaPolitica from '@/components/profile-layouts/LayoutRevilla';


export const templates = {
  
  // ============================================
  // TEMPLATE 1 - BÁSICO (Minimalista)
  // ============================================
  1: {
    name: "Básico",
    plan: "basico",
    
    // Colores
    colors: {
      background: "from-gray-800 via-gray-900 to-black",
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
      card: "bg-white/10 backdrop-blur-lg",
      cardBorder: "border-white/20",
      primary: "text-white",
      secondary: "text-gray-300",
      accent: "text-cyan-400",
      buttonPrimary: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      buttonSecondary: "bg-white/5 hover:bg-white/10",
      ringColor: "from-blue-500 via-cyan-500 to-blue-500"
    },
    
    styles: {
      font: "font-sans",
      cardRounded: "rounded-3xl",
      buttonRounded: "rounded-xl",
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
      background: "from-slate-950 via-slate-900 to-slate-950",
      card: "bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm",
      cardBorder: "border-slate-700/50",
      primary: "text-slate-100",
      secondary: "text-slate-400",
      accent: "text-emerald-400",
      buttonPrimary: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      buttonSecondary: "bg-slate-800 hover:bg-slate-700",
      ringColor: "from-emerald-500 via-teal-500 to-emerald-500"
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
      background: "from-amber-950 via-black to-amber-950",
      card: "bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-md",
      cardBorder: "border-amber-700/30",
      primary: "text-amber-50",
      secondary: "text-amber-200",
      accent: "text-amber-400",
      buttonPrimary: "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700",
      buttonSecondary: "bg-amber-900/30 hover:bg-amber-900/50",
      ringColor: "from-amber-500 via-orange-500 to-amber-500"
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