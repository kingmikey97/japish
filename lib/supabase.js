// ============================================
// SUPABASE CLIENT
// ============================================
// Este archivo crea y exporta el cliente de Supabase
// Lo importaremos en otros archivos para hacer queries

import { createClient } from '@supabase/supabase-js';

// ============================================
// CREDENCIALES
// ============================================
// Obtiene las variables de entorno
// process.env.NEXT_PUBLIC_SUPABASE_URL es lo que pusiste en .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============================================
// VALIDACIÓN
// ============================================
// Verificar que las credenciales existan
// Si no, lanzar error descriptivo
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan las credenciales de Supabase. Verifica tu archivo .env.local'
  );
}

// ============================================
// CREAR CLIENTE
// ============================================
// createClient() inicializa la conexión con Supabase
// Este objeto lo usaremos para todas las operaciones de DB
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// EXPLICACIÓN:
// ============================================
// Este patrón se llama "singleton"
// Creas UNA instancia del cliente que se reutiliza
// Similar a crear un pool de conexiones en PostgreSQL