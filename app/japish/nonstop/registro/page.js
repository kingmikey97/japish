'use client';

import { useState, useEffect, use } from 'react';
import { X, Download, Music, Volume2, VolumeX, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MusicPlayer from '@/components/MusicPlayer';

export default function RegistroNonStop({ searchParams }) {
  const router = useRouter();
  
  // Los asientos seleccionados vienen como parámetro de URL
  // Ejemplo: /japish/nonstop/registro?seats=PB-1A,PA-3C
  // En Next.js 15+, searchParams es una Promise que debe ser unwrapped
  const params = use(searchParams);
  const selectedSeats = params?.seats?.split(',') || [];
  
  const [formData, setFormData] = useState({});
  const [bebidaPreferida, setBebidaPreferida] = useState('');
  const [codigoDeposito, setCodigoDeposito] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [precioAsiento, setPrecioAsiento] = useState(220);
  
  // Cargar precio desde configuración
  useEffect(() => {
    async function cargarPrecio() {
      try {
        const { obtenerConfiguracion } = await import('@/lib/database-nonstop');
        const config = await obtenerConfiguracion();
        if (config && config.precio_asiento) {
          setPrecioAsiento(parseInt(config.precio_asiento));
        }
      } catch (error) {
        console.error('Error cargando precio:', error);
      }
    }
    cargarPrecio();
  }, []);
  
  // Generar código de depósito al cargar - SOLO UNA VEZ
  useEffect(() => {
    if (selectedSeats.length > 0 && !codigoDeposito) {
      const codigo = generarCodigoDeposito(selectedSeats);
      setCodigoDeposito(codigo);
      
      // Inicializar formData con campos vacíos para cada asiento
      const initialData = {};
      selectedSeats.forEach(seat => {
        initialData[seat] = {
          nombreCompleto: '',
          carnetIdentidad: '',
          whatsapp: ''
        };
      });
      setFormData(initialData);
    }
  }, [selectedSeats.length]); // Solo depende de la cantidad de asientos
  
  // Generar código alfanumérico de 4 caracteres
  const generarCodigoAleatorio = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 4; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo.toLowerCase();
  };
  
  // Generar código completo: nstm-[asientos]-[random]
  const generarCodigoDeposito = (seats) => {
    const asientosStr = seats.map(s => s.toLowerCase()).join('%');
    const codigoRandom = generarCodigoAleatorio();
    return `nstm-${asientosStr}-${codigoRandom}`;
  };
  
  // Manejar cambios en los inputs
  const handleInputChange = (seat, field, value) => {
    setFormData(prev => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value
      }
    }));
    
    // Limpiar error del campo
    if (errors[`${seat}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${seat}-${field}`];
        return newErrors;
      });
    }
  };
  
  // Validar formulario
  const validarFormulario = () => {
    const newErrors = {};
    
    selectedSeats.forEach(seat => {
      const data = formData[seat];
      
      if (!data.nombreCompleto.trim()) {
        newErrors[`${seat}-nombreCompleto`] = 'Campo requerido';
      }
      
      if (!data.carnetIdentidad.trim()) {
        newErrors[`${seat}-carnetIdentidad`] = 'Campo requerido';
      }
      
      if (!data.whatsapp.trim()) {
        newErrors[`${seat}-whatsapp`] = 'Campo requerido';
      } else if (!/^\d{8,15}$/.test(data.whatsapp.replace(/\s/g, ''))) {
        newErrors[`${seat}-whatsapp`] = 'Número inválido';
      }
    });
    
    if (!bebidaPreferida) {
      newErrors['bebida'] = 'Selecciona una bebida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      setLoading(true);
      
      try {
        // Importar función de base de datos
        const { crearReserva } = await import('@/lib/database-nonstop');
        
        // Preparar datos de pasajeros
        const pasajeros = selectedSeats.map(seat => ({
          asiento: seat,
          nombreCompleto: formData[seat].nombreCompleto,
          carnetIdentidad: formData[seat].carnetIdentidad,
          whatsapp: formData[seat].whatsapp
        }));
        
        // Calcular total
        const totalPagar = selectedSeats.length * precioAsiento;
        
        // Guardar en Supabase
        const resultado = await crearReserva({
          asientos: selectedSeats,
          codigoDeposito,
          bebidaPreferida,
          pasajeros,
          totalPagar
        });
        
        if (resultado.success) {
          // Mostrar modal con QR
          setShowQRModal(true);
        } else {
          alert('Error al crear la reserva: ' + resultado.error);
        }
        
      } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la reserva. Por favor intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Toggle música
  const toggleMusic = () => {
    setMusicMuted(!musicMuted);
    // TODO: Implementar reproducción de audio
  };
  
  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
        <div className="bg-gray-900 border-2 border-yellow-400 rounded-2xl p-8 text-center">
          <AlertCircle size={48} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">No hay asientos seleccionados</h2>
          <p className="text-gray-400 mb-6">Debes seleccionar asientos primero</p>
          <button
            onClick={() => router.push('/japish/nonstop')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black px-6 py-3 rounded-xl hover:scale-105 transition-all"
          >
            Volver a Selección
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative">
      
      {/* Header */}
      <header className="border-b-4 border-yellow-400 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
              REGISTRO DE PASAJEROS
            </h1>
            <p className="text-yellow-400 font-bold mt-2">Non Stop Madness | La Paz → Cochabamba</p>
          </div>
        </div>
      </header>
      
      {/* Contenido */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Resumen de asientos seleccionados */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 p-1 rounded-2xl">
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-yellow-400 font-black text-xl mb-4">ASIENTOS SELECCIONADOS</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {selectedSeats.map(seat => (
                  <div key={seat} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black px-4 py-2 rounded-lg text-lg">
                    {seat}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-gray-400 text-sm">Cantidad de pasajeros</p>
                  <p className="text-2xl font-black text-yellow-400">{selectedSeats.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total a pagar</p>
                  <p className="text-2xl font-black text-pink-400">Bs. {selectedSeats.length * precioAsiento}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          
          {/* Datos por cada asiento */}
          <div className="space-y-6 mb-8">
            {selectedSeats.map((seat, index) => (
              <div key={seat} className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-2xl">
                <div className="bg-gray-900 rounded-2xl p-6">
                  <h3 className="text-2xl font-black text-yellow-400 mb-4 flex items-center gap-3">
                    <span className="bg-yellow-400 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    PASAJERO - ASIENTO {seat}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Nombre Completo */}
                    <div>
                      <label className="block text-white font-bold mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={formData[seat]?.nombreCompleto || ''}
                        onChange={(e) => handleInputChange(seat, 'nombreCompleto', e.target.value)}
                        className={`w-full bg-white/10 border-2 ${errors[`${seat}-nombreCompleto`] ? 'border-red-500' : 'border-purple-400'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all`}
                        placeholder="Ej: Juan Pérez López"
                      />
                      {errors[`${seat}-nombreCompleto`] && (
                        <p className="text-red-400 text-sm mt-1">{errors[`${seat}-nombreCompleto`]}</p>
                      )}
                    </div>
                    
                    {/* Carnet de Identidad */}
                    <div>
                      <label className="block text-white font-bold mb-2">
                        Carnet de Identidad *
                      </label>
                      <input
                        type="text"
                        value={formData[seat]?.carnetIdentidad || ''}
                        onChange={(e) => handleInputChange(seat, 'carnetIdentidad', e.target.value)}
                        className={`w-full bg-white/10 border-2 ${errors[`${seat}-carnetIdentidad`] ? 'border-red-500' : 'border-purple-400'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all`}
                        placeholder="Ej: 12345678 LP"
                      />
                      {errors[`${seat}-carnetIdentidad`] && (
                        <p className="text-red-400 text-sm mt-1">{errors[`${seat}-carnetIdentidad`]}</p>
                      )}
                    </div>
                    
                    {/* WhatsApp */}
                    <div>
                      <label className="block text-white font-bold mb-2">
                        Número de WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={formData[seat]?.whatsapp || ''}
                        onChange={(e) => handleInputChange(seat, 'whatsapp', e.target.value)}
                        className={`w-full bg-white/10 border-2 ${errors[`${seat}-whatsapp`] ? 'border-red-500' : 'border-purple-400'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all`}
                        placeholder="Ej: 77123456"
                      />
                      {errors[`${seat}-whatsapp`] && (
                        <p className="text-red-400 text-sm mt-1">{errors[`${seat}-whatsapp`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Selección de bebida */}
          <div className="bg-gradient-to-r from-green-600 to-lime-600 p-1 rounded-2xl mb-8">
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-2xl font-black text-green-400 mb-4">
                🍹 ¿QUÉ BEBIDA PREFIERES?
              </h3>
              <p className="text-white mb-4">Selecciona tu bebida de cortesía para el viaje</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setBebidaPreferida('mojito')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    bebidaPreferida === 'mojito'
                      ? 'bg-gradient-to-r from-green-400 to-lime-400 border-green-300 scale-105'
                      : 'bg-white/10 border-green-400 hover:bg-white/20'
                  }`}
                >
                  <div className="text-6xl mb-2">🍸</div>
                  <div className={`text-2xl font-black ${bebidaPreferida === 'mojito' ? 'text-gray-900' : 'text-white'}`}>
                    MOJITO
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setBebidaPreferida('sangria')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    bebidaPreferida === 'sangria'
                      ? 'bg-gradient-to-r from-red-400 to-pink-400 border-red-300 scale-105'
                      : 'bg-white/10 border-red-400 hover:bg-white/20'
                  }`}
                >
                  <div className="text-6xl mb-2">🍷</div>
                  <div className={`text-2xl font-black ${bebidaPreferida === 'sangria' ? 'text-gray-900' : 'text-white'}`}>
                    SANGRÍA
                  </div>
                </button>
              </div>
              
              {errors['bebida'] && (
                <p className="text-red-400 text-center mt-4 font-bold">{errors['bebida']}</p>
              )}
            </div>
          </div>
          
          {/* Código de depósito */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-2xl mb-8">
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <h3 className="text-yellow-400 font-black text-xl mb-2">
                CÓDIGO DE DEPÓSITO
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                COPIA ESTE CODIGOOOO, es importante...
              </p>
              <div className="bg-black/50 border-2 border-yellow-400 rounded-xl p-4 inline-block">
                <code className="text-3xl md:text-4xl font-black text-yellow-400 tracking-wider">
                  {codigoDeposito}
                </code>
              </div>
            </div>
          </div>
          
          {/* Botón enviar */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-black text-2xl py-6 rounded-2xl transition-all shadow-lg shadow-pink-500/50 flex items-center justify-center gap-3 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                PROCESANDO...
              </>
            ) : (
              <>
                <CheckCircle size={32} />
                CONFIRMAR Y VER QR DE PAGO
              </>
            )}
          </button>
          
        </form>
        
      </div>
      
      {/* Botón de música (esquina inferior izquierda) */}
    
  <div className="min-h-screen...">
   
    <MusicPlayer />
  </div>

      
      {/* Modal de QR */}
      {showQRModal && (
        <QRModal
          codigoDeposito={codigoDeposito}
          selectedSeats={selectedSeats}
          formData={formData}
          bebidaPreferida={bebidaPreferida}
          onClose={() => setShowQRModal(false)}
        />
      )}
      
    </div>
  );
}

// Componente del Modal de QR
function QRModal({ codigoDeposito, selectedSeats, formData, bebidaPreferida, onClose }) {
  const [qrUrl, setQrUrl] = useState('');
  const [whatsappPagos, setWhatsappPagos] = useState('');
  const [precioAsiento, setPrecioAsiento] = useState(220);
  const [loading, setLoading] = useState(true);
  
  // Cargar configuración desde Supabase
  useEffect(() => {
    async function cargarConfiguracion() {
      try {
        const { obtenerConfiguracion } = await import('@/lib/database-nonstop');
        const config = await obtenerConfiguracion();
        
        if (config) {
          setQrUrl(config.qr_pago_url || '');
          setWhatsappPagos(config.whatsapp_pagos || '591XXXXXXXX');
          setPrecioAsiento(parseInt(config.precio_asiento) || 220);
        }
      } catch (error) {
        console.error('Error cargando configuración:', error);
      } finally {
        setLoading(false);
      }
    }
    
    cargarConfiguracion();
  }, []);
  
  const totalPagar = selectedSeats.length * precioAsiento;
  
  const descargarQR = () => {
    if (qrUrl) {
      // Crear un enlace temporal para descargar
      const link = document.createElement('a');
      link.href = qrUrl;
      link.download = 'qr-pago-nonstop.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('QR no disponible');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header del modal */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-t-3xl flex items-center justify-between z-10">
          <h2 className="text-3xl font-black text-gray-900">¡RESERVA CONFIRMADA!</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-all"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Cargando información...</p>
          </div>
        ) : (
          <div className="p-8">
            
            {/* QR y botón de descarga */}
            <div className="bg-white rounded-2xl p-8 mb-8 text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-4">ESCANEA PARA PAGAR</h3>
              
              {/* Imagen del QR desde Supabase */}
              {qrUrl ? (
                <div className="mb-4">
                  <img 
                    src={qrUrl} 
                    alt="QR de Pago" 
                    className="w-64 h-64 mx-auto rounded-xl object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="bg-gray-200 w-64 h-64 mx-auto rounded-xl hidden items-center justify-center">
                    <p className="text-gray-600 font-bold text-center px-4">Error cargando QR<br/>Contacta con soporte</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-200 w-64 h-64 mx-auto rounded-xl flex items-center justify-center mb-4">
                  <p className="text-gray-600 font-bold text-center px-4">QR no configurado<br/>Contacta con soporte</p>
                </div>
              )}
              
              <button
                onClick={descargarQR}
                disabled={!qrUrl}
                className={`bg-gradient-to-r from-green-500 to-lime-500 text-white font-black px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all ${
                  qrUrl ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Download size={20} />
                DESCARGAR QR
              </button>
            </div>
            
            {/* Instrucciones */}
            <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
              <h3 className="text-yellow-400 font-black text-xl mb-4">📱 INSTRUCCIONES DE PAGO</h3>
              <ol className="text-white space-y-2 list-decimal list-inside">
                <li className="font-bold">Realiza el depósito de <span className="text-yellow-400">Bs.  {totalPagar}</span> por cada asiento</li>
                <li className="font-bold">En la descripción o concepto del depósito incluye: <code className="bg-black/50 px-2 py-1 rounded text-yellow-400">{codigoDeposito}</code></li>
                <li className="font-bold">Envía el comprobante por WhatsApp al: <a href={`https://wa.me/${whatsappPagos}`} target="_blank" rel="noopener noreferrer" className="text-green-400 underline hover:text-green-300">+{whatsappPagos}</a> o tu staff favorito</li>
                <li className="font-bold">Recibirás confirmación en máximo 2 horas</li>
              </ol>
              
              <div className="mt-4 bg-red-500/20 border-2 border-red-400 rounded-xl p-4">
                <p className="text-red-400 font-black text-center">
                  ⏰ TU RESERVA ESTÁ ACTIVA POR 20 MINUTOS
                </p>
                <p className="text-white text-sm text-center mt-2">
                  Después de este tiempo, si no confirmamos tu pago, los asientos estarán disponibles nuevamente
                </p>
              </div>
            </div>
            
            {/* Resumen de datos */}
            <div className="bg-white/10 border-2 border-white/30 rounded-2xl p-6">
              <h3 className="text-white font-black text-xl mb-4">📋 RESUMEN DE TU RESERVA</h3>
              
              {selectedSeats.map((seat, index) => (
                <div key={seat} className="bg-white/10 rounded-xl p-4 mb-4">
                  <h4 className="text-yellow-400 font-black mb-2">PASAJERO {index + 1} - {seat}</h4>
                  <div className="text-white space-y-1">
                    <p><span className="text-gray-400">Nombre:</span> {formData[seat]?.nombreCompleto}</p>
                    <p><span className="text-gray-400">CI:</span> {formData[seat]?.carnetIdentidad}</p>
                    <p><span className="text-gray-400">WhatsApp:</span> {formData[seat]?.whatsapp}</p>
                  </div>
                </div>
              ))}
              
              <div className="bg-gradient-to-r from-green-500 to-lime-500 rounded-xl p-4 mt-4">
                <p className="text-gray-900 font-black">
                  🍹 Bebida seleccionada: <span className="uppercase">{bebidaPreferida}</span>
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t-2 border-white/30">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">TOTAL A PAGAR:</span>
                  <span className="text-yellow-400 font-black text-3xl">Bs. {totalPagar}</span>
                </div>
              </div>
            </div>
            
          </div>
        )}
        
      </div>
    </div>

    
  );
}
