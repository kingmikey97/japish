'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Users, DollarSign, RefreshCw, Eye, Filter, Lock } from 'lucide-react';

// ============================================
// CREDENCIALES DE ADMIN (Cambiar según necesites)
// ============================================
const ADMIN_CREDENTIALS = [
  { username: 'admin', password: 'nonstop2025' },
  { username: 'miguel', password: 'miguel123' },
  { username: 'juan', password: 'juan123' },
];

export default function PanelAdmin() {
  // ⚠️ IMPORTANTE: Todos los hooks ANTES de cualquier return condicional
  const [autenticado, setAutenticado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState('');
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas');
  const [stats, setStats] = useState({
    total: 0,
    reservadas: 0,
    pagadas: 0,
    canceladas: 0,
    totalIngresos: 0
  });

  // Cargar reservas
  const cargarReservas = async () => {
    try {
      setLoading(true);
      const { obtenerReservasAdmin } = await import('@/lib/database-nonstop');
      
      const data = await obtenerReservasAdmin();
      setReservas(data || []);
      
      // Calcular estadísticas
      const reservadas = data.filter(r => r.estado === 'reservado').length;
      const pagadas = data.filter(r => r.estado === 'pagado').length;
      const canceladas = data.filter(r => r.estado === 'cancelado').length;
      const totalIngresos = data
        .filter(r => r.estado === 'pagado')
        .reduce((sum, r) => sum + parseFloat(r.total_pagar || 0), 0);
      
      setStats({
        total: data.length,
        reservadas,
        pagadas,
        canceladas,
        totalIngresos
      });
    } catch (error) {
      console.error('Error cargando reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect - solo cargar si está autenticado
  useEffect(() => {
    if (autenticado) {
      cargarReservas();
      const interval = setInterval(cargarReservas, 30000);
      return () => clearInterval(interval);
    }
  }, [autenticado]);

  // Confirmar pago
  const confirmarPago = async (codigoDeposito) => {
    if (!confirm('¿Confirmar que el pago fue recibido?')) return;

    try {
      const { confirmarPago: confirmarPagoFn } = await import('@/lib/database-nonstop');
      const resultado = await confirmarPagoFn(codigoDeposito, usuarioActual);
      
      if (resultado.success) {
        alert('✅ Pago confirmado exitosamente');
        cargarReservas();
      } else {
        alert('❌ Error: ' + resultado.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al confirmar pago');
    }
  };

  // Cancelar reserva
  const cancelarReserva = async (codigoDeposito) => {
    if (!confirm('¿Cancelar esta reserva? Los asientos se liberarán.')) return;

    try {
      const { cancelarReserva: cancelarReservaFn } = await import('@/lib/database-nonstop');
      const resultado = await cancelarReservaFn(codigoDeposito);
      
      if (resultado.success) {
        alert('✅ Reserva cancelada');
        cargarReservas();
      } else {
        alert('❌ Error: ' + resultado.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al cancelar reserva');
    }
  };

  // Filtrar reservas
  const reservasFiltradas = reservas.filter(r => {
    if (filtro === 'todas') return true;
    return r.estado === filtro;
  });

  // Formato de fecha
  const formatFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ✅ AHORA SÍ: Return condicional DESPUÉS de todos los hooks
  if (!autenticado) {
    return <PantallaLogin onLogin={(username) => {
      setAutenticado(true);
      setUsuarioActual(username);
    }} />;
  }

  // Render del panel admin
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Panel de Administración
              </h1>
              <p className="text-gray-400">Non Stop Madness - Gestión de Reservas</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                <p className="text-gray-400 text-sm">Sesión:</p>
                <p className="text-white font-bold">{usuarioActual}</p>
              </div>
              
              <button
                onClick={cargarReservas}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all"
                title="Recargar"
              >
                <RefreshCw size={20} />
              </button>
              
              <button
                onClick={() => {
                  if (confirm('¿Cerrar sesión?')) {
                    setAutenticado(false);
                    setUsuarioActual('');
                  }
                }}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all font-bold"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users size={24} />
              <span className="text-sm opacity-80">Total</span>
            </div>
            <div className="text-3xl font-black">{stats.total}</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Clock size={24} />
              <span className="text-sm opacity-80">Reservadas</span>
            </div>
            <div className="text-3xl font-black">{stats.reservadas}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={24} />
              <span className="text-sm opacity-80">Pagadas</span>
            </div>
            <div className="text-3xl font-black">{stats.pagadas}</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <XCircle size={24} />
              <span className="text-sm opacity-80">Canceladas</span>
            </div>
            <div className="text-3xl font-black">{stats.canceladas}</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={24} />
              <span className="text-sm opacity-80">Ingresos</span>
            </div>
            <div className="text-2xl font-black">Bs. {stats.totalIngresos.toFixed(2)}</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter size={20} className="text-gray-400" />
            <button
              onClick={() => setFiltro('todas')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filtro === 'todas' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Todas ({stats.total})
            </button>
            <button
              onClick={() => setFiltro('reservado')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filtro === 'reservado' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Pendientes ({stats.reservadas})
            </button>
            <button
              onClick={() => setFiltro('pagado')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filtro === 'pagado' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Pagadas ({stats.pagadas})
            </button>
            <button
              onClick={() => setFiltro('cancelado')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filtro === 'cancelado' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Canceladas ({stats.canceladas})
            </button>
          </div>
        </div>

        {/* Lista de Reservas */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Cargando reservas...</p>
          </div>
        ) : reservasFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 text-xl">No hay reservas {filtro !== 'todas' ? `con estado "${filtro}"` : ''}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservasFiltradas.map((reserva) => (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                onConfirmar={confirmarPago}
                onCancelar={cancelarReserva}
                formatFecha={formatFecha}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ============================================
// COMPONENTE DE LOGIN
// ============================================
function PantallaLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const usuarioValido = ADMIN_CREDENTIALS.find(
      cred => cred.username === username && cred.password === password
    );

    if (usuarioValido) {
      setTimeout(() => {
        onLogin(username);
      }, 500);
    } else {
      setLoading(false);
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-400">Non Stop Madness</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-bold mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Ingresa tu usuario"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 text-red-400 font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black py-4 rounded-xl transition-all ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-yellow-500 hover:to-orange-600 hover:scale-105'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Verificando...
                </div>
              ) : (
                'INICIAR SESIÓN'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              ¿Olvidaste tu contraseña? Contacta al administrador principal
            </p>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-400 text-sm font-bold mb-2">👨‍💻 Usuarios de prueba:</p>
            <div className="text-blue-300 text-xs space-y-1 font-mono">
              {ADMIN_CREDENTIALS.map(cred => (
                <div key={cred.username}>• {cred.username} / {cred.password}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE INDIVIDUAL DE RESERVA
// ============================================
function ReservaCard({ reserva, onConfirmar, onCancelar, formatFecha }) {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'reservado': return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'pagado': return 'bg-green-500/20 border-green-500 text-green-400';
      case 'cancelado': return 'bg-red-500/20 border-red-500 text-red-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-400';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'reservado': return <Clock size={16} />;
      case 'pagado': return <CheckCircle size={16} />;
      case 'cancelado': return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-2xl font-black text-white">{reserva.codigo_deposito}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 flex items-center gap-2 ${getEstadoColor(reserva.estado)}`}>
                {getEstadoIcon(reserva.estado)}
                {reserva.estado.toUpperCase()}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Fecha</p>
                <p className="text-white font-bold">{formatFecha(reserva.timestamp)}</p>
              </div>
              <div>
                <p className="text-gray-400">Asientos</p>
                <p className="text-white font-bold">{reserva.asientos?.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-400">Pasajeros</p>
                <p className="text-white font-bold">{reserva.total_pasajeros || reserva.asientos?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-400">Total</p>
                <p className="text-yellow-400 font-black text-lg">Bs. {reserva.total_pagar}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMostrarDetalle(!mostrarDetalle)}
            className="ml-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            title={mostrarDetalle ? 'Ocultar detalles' : 'Ver detalles'}
          >
            <Eye size={20} className="text-white" />
          </button>
        </div>

        {mostrarDetalle && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-white font-bold mb-3">👥 Detalles de Pasajeros:</h4>
            
            {reserva.pasajeros && reserva.pasajeros.length > 0 ? (
              <div className="grid gap-3">
                {reserva.pasajeros.map((pasajero, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Asiento</p>
                        <p className="text-yellow-400 font-black text-lg">{pasajero.asiento}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Nombre</p>
                        <p className="text-white font-bold">{pasajero.nombre_completo}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">CI</p>
                        <p className="text-white font-bold">{pasajero.carnet_identidad}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">WhatsApp</p>
                        <p className="text-green-400 font-bold">{pasajero.whatsapp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-400 text-sm">
                ⚠️ No se encontraron datos de pasajeros
              </div>
            )}
            
            <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-purple-300 text-sm">
                🍹 Bebida: <span className="text-white font-bold uppercase">{reserva.bebida_preferida || 'No especificada'}</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-3 flex-wrap">
          {reserva.estado === 'reservado' && (
            <>
              <button
                onClick={() => onConfirmar(reserva.codigo_deposito)}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                CONFIRMAR PAGO
              </button>
              <button
                onClick={() => onCancelar(reserva.codigo_deposito)}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <XCircle size={20} />
                CANCELAR
              </button>
            </>
          )}
          
          {reserva.estado === 'pagado' && reserva.confirmado_por && (
            <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-sm">
              <p className="text-green-400">
                ✓ Confirmado por <span className="font-bold">{reserva.confirmado_por}</span>
                {reserva.confirmado_en && ` el ${formatFecha(reserva.confirmado_en)}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
