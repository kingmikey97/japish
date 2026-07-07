// ============================================
// MAPA DE COLORES DINÁMICOS (bg_color_id)
// Aplica solo a templates 1-5
// ============================================
export const colorMap = {
  1: {
    name: "Rojo",
    background: "from-yellow-500 via-red-500 to-rose-800",
    card: "bg-red-950/40 backdrop-blur-2xl",
    cardBorder: "border-red-400/30",
    secondary: "text-red-100",
    accent: "text-yellow-300",
    buttonPrimary: "from-red-500 to-rose-700 hover:from-red-600 hover:to-rose-800",
    buttonSecondary: "bg-red-500/10 hover:bg-red-500/20",
    ringColor: "from-yellow-400 via-red-500 to-rose-700"
  },
  2: {
    name: "Verde",
    background: "from-lime-400 via-emerald-500 to-teal-800",
    card: "bg-emerald-950/40 backdrop-blur-2xl",
    cardBorder: "border-emerald-400/30",
    secondary: "text-emerald-100",
    accent: "text-lime-300",
    buttonPrimary: "from-emerald-500 to-teal-700 hover:from-emerald-600 hover:to-teal-800",
    buttonSecondary: "bg-emerald-500/10 hover:bg-emerald-500/20",
    ringColor: "from-lime-400 via-emerald-500 to-teal-700"
  },
  3: {
    name: "Azul",
    background: "from-cyan-400 via-blue-500 to-indigo-800",
    card: "bg-blue-950/40 backdrop-blur-2xl",
    cardBorder: "border-blue-400/30",
    secondary: "text-blue-100",
    accent: "text-cyan-300",
    buttonPrimary: "from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800",
    buttonSecondary: "bg-blue-500/10 hover:bg-blue-500/20",
    ringColor: "from-cyan-400 via-blue-500 to-indigo-700"
  },
   4: {
    name: "Rosado",
    background: "from-fuchsia-400 via-pink-500 to-purple-800",
    card: "bg-pink-950/40 backdrop-blur-2xl",
    cardBorder: "border-pink-400/30",
    secondary: "text-pink-100",
    accent: "text-fuchsia-300",
    borderAccent: "border-fuchsia-300/50",
    glowSoft: "bg-fuchsia-300/10",
    buttonPrimary: "from-pink-500 to-purple-700 hover:from-pink-600 hover:to-purple-800",
    buttonSecondary: "bg-pink-500/10 hover:bg-pink-500/20",
    ringColor: "from-fuchsia-400 via-pink-500 to-purple-700"
  },
  5: {
    name: "Morado",
    background: "from-violet-400 via-purple-500 to-fuchsia-800",
    card: "bg-purple-950/40 backdrop-blur-2xl",
    cardBorder: "border-purple-400/30",
    secondary: "text-purple-100",
    accent: "text-violet-300",
    borderAccent: "border-violet-300/50",
    glowSoft: "bg-violet-300/10",
    buttonPrimary: "from-purple-500 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-800",
    buttonSecondary: "bg-purple-500/10 hover:bg-purple-500/20",
    ringColor: "from-violet-400 via-purple-500 to-fuchsia-700"
  }
};

export function getColorOverride(colorId) {
  return colorMap[colorId] || null;
}