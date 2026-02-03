// ============================================
// FUNCIONES DE BASE DE DATOS - NON STOP MADNESS
// ============================================

import { supabase } from './supabase';

// ============================================
// 1. OBTENER CONFIGURACIÓN
// ============================================
export async function obtenerConfiguracion() {
  const { data, error } = await supabase
    .from('configuracion')
    .select('*');
  
  if (error) {
    console.error('Error obteniendo configuración:', error);
    return null;
  }
  
  // Convertir array a objeto clave-valor
  const config = {};
  data.forEach(item => {
    config[item.clave] = item.valor;
  });
  
  return config;
}

// ============================================
// 2. OBTENER ASIENTOS DEL BUS
// ============================================
export async function obtenerAsientosBus(busId = 'bus-001') {
  // Primero obtenemos el ID del bus por su código
  const { data: bus, error: busError } = await supabase
    .from('buses')
    .select('id')
    .eq('codigo', busId)
    .single();
  
  if (busError) {
    console.error('Error obteniendo bus:', busError);
    return null;
  }
  
  // Luego obtenemos todos los asientos
  const { data: asientos, error } = await supabase
    .from('asientos')
    .select('*')
    .eq('bus_id', bus.id)
    .order('piso', { ascending: false }) // Piso alto primero
    .order('fila', { ascending: true })
    .order('letra', { ascending: true });
  
  if (error) {
    console.error('Error obteniendo asientos:', error);
    return null;
  }
  
  return asientos;
}

// ============================================
// 3. OBTENER ASIENTOS OCUPADOS/RESERVADOS
// ============================================
export async function obtenerAsientosNoDisponibles(busId = 'bus-001') {
  const { data: bus, error: busError } = await supabase
    .from('buses')
    .select('id')
    .eq('codigo', busId)
    .single();
  
  if (busError) return [];
  
  const { data: asientos, error } = await supabase
    .from('asientos')
    .select('codigo')
    .eq('bus_id', bus.id)
    .in('estado', ['reservado', 'ocupado']);
  
  if (error) {
    console.error('Error obteniendo asientos no disponibles:', error);
    return [];
  }
  
  return asientos.map(a => a.codigo);
}

// ============================================
// 4. CREAR RESERVA
// ============================================
export async function crearReserva({
  busId = 'bus-001',
  asientos, // Array de códigos: ['PB-1A', 'PA-3C']
  codigoDeposito,
  bebidaPreferida,
  pasajeros, // Array de objetos con datos de cada pasajero
  totalPagar
}) {
  try {
    // 1. Obtener ID del bus
    const { data: bus, error: busError } = await supabase
      .from('buses')
      .select('id')
      .eq('codigo', busId)
      .single();
    
    if (busError) throw busError;
    
    // 2. Verificar que los asientos estén disponibles
    const { data: asientosActuales, error: asientosError } = await supabase
      .from('asientos')
      .select('codigo, estado')
      .eq('bus_id', bus.id)
      .in('codigo', asientos);
    
    if (asientosError) throw asientosError;
    
    const noDisponibles = asientosActuales.filter(a => a.estado !== 'disponible');
    if (noDisponibles.length > 0) {
      throw new Error(`Asientos ya no disponibles: ${noDisponibles.map(a => a.codigo).join(', ')}`);
    }
    
    // 3. Obtener tiempo de expiración desde configuración
    const config = await obtenerConfiguracion();
    const tiempoMinutos = parseInt(config?.tiempo_reserva_minutos) || 20;
    
    // 4. Calcular tiempo de expiración
    const ahora = new Date();
    const expira = new Date(ahora.getTime() + tiempoMinutos * 60 * 1000);
    
    // 5. Crear la reserva
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .insert({
        bus_id: bus.id,
        codigo_deposito: codigoDeposito,
        asientos,
        bebida_preferida: bebidaPreferida,
        estado: 'reservado',
        total_pagar: totalPagar,
        expira: expira.toISOString()
      })
      .select()
      .single();
    
    if (reservaError) throw reservaError;
    
    // 5. Insertar datos de cada pasajero
    const pasajerosData = pasajeros.map(p => ({
      reserva_id: reserva.id,
      asiento: p.asiento,
      nombre_completo: p.nombreCompleto,
      carnet_identidad: p.carnetIdentidad,
      whatsapp: p.whatsapp
    }));
    
    const { error: pasajerosError } = await supabase
      .from('pasajeros')
      .insert(pasajerosData);
    
    if (pasajerosError) throw pasajerosError;
    
    // 6. Actualizar estado de asientos a 'reservado'
    const { error: updateError } = await supabase
      .from('asientos')
      .update({ 
        estado: 'reservado',
        reserva_id: reserva.id
      })
      .eq('bus_id', bus.id)
      .in('codigo', asientos);
    
    if (updateError) throw updateError;
    
    return { success: true, reserva };
    
  } catch (error) {
    console.error('Error creando reserva:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 5. CONFIRMAR PAGO (ADMIN)
// ============================================
export async function confirmarPago(codigoDeposito, confirmedBy = 'admin') {
  try {
    // 1. Actualizar estado de la reserva
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .update({
        estado: 'pagado',
        confirmado_en: new Date().toISOString(),
        confirmado_por: confirmedBy
      })
      .eq('codigo_deposito', codigoDeposito)
      .select()
      .single();
    
    if (reservaError) throw reservaError;
    
    // 2. Actualizar asientos a 'ocupado'
    const { error: asientosError } = await supabase
      .from('asientos')
      .update({ estado: 'ocupado' })
      .eq('reserva_id', reserva.id);
    
    if (asientosError) throw asientosError;
    
    return { success: true };
    
  } catch (error) {
    console.error('Error confirmando pago:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 6. CANCELAR RESERVA
// ============================================
export async function cancelarReserva(codigoDeposito) {
  try {
    // 1. Obtener la reserva
    const { data: reserva, error: reservaError } = await supabase
      .from('reservas')
      .select('id, bus_id, asientos')
      .eq('codigo_deposito', codigoDeposito)
      .single();
    
    if (reservaError) throw reservaError;
    
    // 2. Actualizar estado de la reserva
    await supabase
      .from('reservas')
      .update({ estado: 'cancelado' })
      .eq('codigo_deposito', codigoDeposito);
    
    // 3. Liberar asientos
    const { error: asientosError } = await supabase
      .from('asientos')
      .update({ 
        estado: 'disponible',
        reserva_id: null
      })
      .eq('bus_id', reserva.bus_id)
      .in('codigo', reserva.asientos);
    
    if (asientosError) throw asientosError;
    
    return { success: true };
    
  } catch (error) {
    console.error('Error cancelando reserva:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 7. EXPIRAR RESERVAS VENCIDAS
// ============================================
export async function expirarReservasVencidas() {
  try {
    // Llamar a la función de Postgres
    const { error } = await supabase.rpc('expirar_reservas');
    
    if (error) throw error;
    
    return { success: true };
    
  } catch (error) {
    console.error('Error expirando reservas:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// 8. OBTENER RESERVAS ACTIVAS
// ============================================
export async function obtenerReservasActivas() {
  const { data, error } = await supabase
    .from('vista_reservas_activas')
    .select('*')
    .order('minutos_restantes', { ascending: true });
  
  if (error) {
    console.error('Error obteniendo reservas activas:', error);
    return [];
  }
  
  return data;
}

// ============================================
// 9. OBTENER URL DEL QR DE PAGO
// ============================================
export async function obtenerQRPago() {
  const { data, error } = await supabase
    .from('configuracion')
    .select('valor')
    .eq('clave', 'qr_pago_url')
    .single();
  
  if (error) {
    console.error('Error obteniendo QR:', error);
    return null;
  }
  
  return data.valor;
}

// ============================================
// 10. SUBIR IMAGEN QR AL STORAGE
// ============================================
export async function subirQRPago(file) {
  const fileName = `qr-pago-${Date.now()}.png`;
  
  const { data, error } = await supabase.storage
    .from('imagenes')
    .upload(`qr-pagos/${fileName}`, file);
  
  if (error) {
    console.error('Error subiendo QR:', error);
    return { success: false, error: error.message };
  }
  
  // Obtener URL pública
  const { data: urlData } = supabase.storage
    .from('imagenes')
    .getPublicUrl(`qr-pagos/${fileName}`);
  
  // Actualizar configuración con la nueva URL
  await supabase
    .from('configuracion')
    .update({ valor: urlData.publicUrl })
    .eq('clave', 'qr_pago_url');
  
  return { success: true, url: urlData.publicUrl };
}

// ============================================
// 11. OBTENER ESTADÍSTICAS DEL BUS
// ============================================
export async function obtenerEstadisticas(busId = 'bus-001') {
  const { data, error } = await supabase
    .from('vista_ocupacion_buses')
    .select('*')
    .eq('bus_codigo', busId)
    .single();
  
  if (error) {
    console.error('Error obteniendo estadísticas:', error);
    return null;
  }
  
  return data;
}

// ============================================
// 12. OBTENER TODAS LAS RESERVAS (ADMIN)
// ============================================
export async function obtenerReservasAdmin(busId = 'bus-001') {
  try {
    // 1. Obtener ID del bus
    const { data: bus, error: busError } = await supabase
      .from('buses')
      .select('id')
      .eq('codigo', busId)
      .single();
    
    if (busError) {
      console.error('Error obteniendo bus:', busError);
      return [];
    }
    
    // 2. Obtener todas las reservas
    const { data: reservas, error: reservasError } = await supabase
      .from('reservas')
      .select('*')
      .eq('bus_id', bus.id)
      .order('timestamp', { ascending: false });
    
    if (reservasError) {
      console.error('Error obteniendo reservas:', reservasError);
      return [];
    }
    
    // 3. Para cada reserva, obtener sus pasajeros
    const reservasConPasajeros = await Promise.all(
      reservas.map(async (reserva) => {
        const { data: pasajeros, error: pasajerosError } = await supabase
          .from('pasajeros')
          .select('asiento, nombre_completo, carnet_identidad, whatsapp')
          .eq('reserva_id', reserva.id);
        
        if (pasajerosError) {
          console.error('Error obteniendo pasajeros:', pasajerosError);
        }
        
        return {
          ...reserva,
          pasajeros: pasajeros || [],
          total_pasajeros: pasajeros?.length || 0
        };
      })
    );
    
    return reservasConPasajeros;
    
  } catch (error) {
    console.error('Error obteniendo reservas admin:', error);
    return [];
  }
}