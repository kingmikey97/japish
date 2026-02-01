'use client';

import { useState, useEffect } from 'react';
import { Music, MapPin, Calendar, DollarSign, ArrowRight, Users, Sparkles } from 'lucide-react';

export default function NonStopMadness() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
  // Cargar asientos ocupados desde Supabase
  useEffect(() => {
    async function cargarAsientosOcupados() {
      try {
        const { obtenerAsientosNoDisponibles, expirarReservasVencidas } = await import('@/lib/database-nonstop');
        
        // IMPORTANTE: Expirar reservas vencidas ANTES de cargar los asientos
        // Esto asegura que siempre mostremos información actualizada
        await expirarReservasVencidas();
        
        // Ahora sí cargar los asientos no disponibles
        const asientosNoDisponibles = await obtenerAsientosNoDisponibles();
        setOccupiedSeats(asientosNoDisponibles);
      } catch (error) {
        console.error('Error cargando asientos:', error);
        // Continuar con array vacío si hay error
        setOccupiedSeats([]);
      } finally {
        setLoading(false);
      }
    }
    
    cargarAsientosOcupados();
    
    // Recargar cada 30 segundos para mantener actualizado
    const interval = setInterval(cargarAsientosOcupados, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const isSeatOccupied = (seatId) => occupiedSeats.includes(seatId);
  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);
  
  const toggleSeat = (seatId) => {
    if (isSeatOccupied(seatId)) return;
    
    if (isSeatSelected(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  
  const getSeatClass = (seatId) => {
    if (isSeatOccupied(seatId)) {
      return 'bg-red-500/30 border-red-500 cursor-not-allowed opacity-60';
    }
    if (isSeatSelected(seatId)) {
      return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300 shadow-lg shadow-yellow-500/50 scale-110';
    }
    return 'bg-purple-900/30 border-purple-400 hover:bg-purple-700/50 hover:border-yellow-400 hover:scale-105';
  };
  
  const totalPrice = selectedSeats.length * precioAsiento;
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      // Navegar al formulario de registro con los asientos como parámetro
      const seatsParam = selectedSeats.join(',');
      window.location.href = `/japish/nonstop/registro?seats=${seatsParam}`;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      
      {/* Header con animación */}
      <header className="relative overflow-hidden border-b-4 border-yellow-400">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
        
        <div className="relative container mx-auto px-4 py-8">
          <div className="text-center">
            {/* Badge del evento */}
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 font-black px-6 py-3 rounded-full mb-4 animate-bounce">
              <Sparkles size={24} />
              <span className="text-lg">EVENTO EXCLUSIVO</span>
              <Sparkles size={24} />
            </div>
            
            {/* Título principal */}
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-pulse">
                NON STOP MADNESS
              </span>
            </h1>
            
            {/* Subtítulo */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white text-lg md:text-xl">
              <div className="flex items-center gap-2">
                <MapPin className="text-yellow-400" size={24} />
                <span className="font-bold">La Paz → Cochabamba</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-pink-400" size={24} />
                <span className="font-bold">Próximo Evento</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="text-purple-400" size={24} />
                <span className="font-bold">Bus VIP Leito</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Detalles del viaje */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 p-1 rounded-2xl">
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-yellow-400 font-bold text-sm mb-1">ORIGEN</div>
                  <div className="text-white text-2xl font-black">La Paz</div>
                </div>
                <div>
                  <div className="text-pink-400 font-bold text-sm mb-1">DESTINO</div>
                  <div className="text-white text-2xl font-black">Cochabamba</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-sm mb-1">DURACIÓN</div>
                  <div className="text-white text-2xl font-black">6 horas</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-sm mb-1">PRECIO</div>
                  <div className="text-white text-2xl font-black">Bs. {precioAsiento}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leyenda */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-400 rounded-2xl p-6">
            <h3 className="text-yellow-400 font-black text-xl mb-4 text-center">
              LEYENDA DE ASIENTOS
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-900/30 border-2 border-purple-400 rounded-lg"></div>
                <span className="text-white font-bold">DISPONIBLE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300 rounded-lg"></div>
                <span className="text-white font-bold">SELECCIONADO</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/30 border-2 border-red-500 rounded-lg opacity-60"></div>
                <span className="text-white font-bold">OCUPADO</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bus de dos pisos */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* PISO ALTO (PA) */}
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-1 rounded-3xl">
            <div className="bg-gray-900 rounded-3xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 mb-2">
                  🔝 PISO ALTO
                </h2>
                <p className="text-yellow-400 font-bold">LEITO - Asientos Reclinables</p>
              </div>
              
              <div className="space-y-2">
                {/* Filas 1-11: Lado izquierdo (2 asientos) + PASILLO + Lado derecho */}
                {Array.from({ length: 11 }).map((_, row) => (
                  <div key={row} className="flex items-center gap-2">
                    {/* Número de fila */}
                    <div className="w-8 text-yellow-400 font-bold text-center text-sm">{row + 1}</div>
                    
                    {/* Lado izquierdo: 2 asientos (A, B) */}
                    {['A', 'B'].map(letter => {
                      const seatId = `PA-${row + 1}${letter}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isSeatOccupied(seatId)}
                          className={`w-16 h-12 rounded-lg border-2 font-bold text-white transition-all duration-200 ${getSeatClass(seatId)}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                    
                    {/* PASILLO */}
                    <div className="w-8 border-l-2 border-r-2 border-dashed border-purple-400/30 h-12 flex items-center justify-center">
                      <div className="w-1 h-full bg-purple-400/20"></div>
                    </div>
                    
                    {/* Lado derecho: Solo fila 1 tiene asiento C aislado */}
                    {row === 0 ? (
                      <button
                        onClick={() => toggleSeat('PA-1C')}
                        disabled={isSeatOccupied('PA-1C')}
                        className={`w-16 h-12 rounded-lg border-2 font-bold text-white transition-all duration-200 ${getSeatClass('PA-1C')}`}
                      >
                        C
                      </button>
                    ) : row === 1 ? (
                      /* Fila 2: ESCALERAS */
                      <div className="w-16 h-12 bg-yellow-400/20 border-2 border-yellow-400 border-dashed rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 font-black text-xs">🪜</span>
                      </div>
                    ) : (
                      /* Filas 3-11: Asientos individuales (C) */
                      <button
                        onClick={() => toggleSeat(`PA-${row + 1}C`)}
                        disabled={isSeatOccupied(`PA-${row + 1}C`)}
                        className={`w-16 h-12 rounded-lg border-2 font-bold text-white transition-all duration-200 ${getSeatClass(`PA-${row + 1}C`)}`}
                      >
                        C
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-purple-300 text-xs">
                  Total: 11x2 (izq) + 1 aislado + 9 continuos (der) = 32 asientos
                </p>
              </div>
            </div>
          </div>
          
          {/* PLANTA BAJA (PB) */}
          <div className="bg-gradient-to-br from-green-600 via-lime-600 to-yellow-600 p-1 rounded-3xl">
            <div className="bg-gray-900 rounded-3xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-lime-300 mb-2">
                  ⬇️ PLANTA BAJA
                </h2>
                <p className="text-green-400 font-bold">LEITO - Asientos Reclinables</p>
              </div>
              
              {/* Conductor */}
              <div className="mb-6">
                <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl py-3 px-4 text-center">
                  <span className="text-yellow-400 font-black text-lg">🚗 CONDUCTOR</span>
                </div>
              </div>
              
              {/* Layout: Lado izquierdo (4x2) + PASILLO + Lado derecho (4x1) */}
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, row) => (
                  <div key={row} className="flex items-center gap-2">
                    {/* Número de fila */}
                    <div className="w-8 text-green-400 font-bold text-center text-sm">{row + 1}</div>
                    
                    {/* Lado izquierdo: 2 asientos (A, B) */}
                    {['A', 'B'].map(letter => {
                      const seatId = `PB-${row + 1}${letter}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isSeatOccupied(seatId)}
                          className={`w-16 h-12 rounded-lg border-2 font-bold text-white transition-all duration-200 ${getSeatClass(seatId)}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                    
                    {/* PASILLO */}
                    <div className="w-8 border-l-2 border-r-2 border-dashed border-green-400/30 h-12 flex items-center justify-center">
                      <div className="w-1 h-full bg-green-400/20"></div>
                    </div>
                    
                    {/* Lado derecho: 1 asiento (C) */}
                    {['C'].map(letter => {
                      const seatId = `PB-${row + 1}${letter}`;
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isSeatOccupied(seatId)}
                          className={`w-16 h-12 rounded-lg border-2 font-bold text-white transition-all duration-200 ${getSeatClass(seatId)}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-green-300 text-xs">
                  Total: 4x2 (izq) + 4x1 (der) = 12 asientos
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de resumen y botón de continuar */}
        {selectedSeats.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 p-1 rounded-2xl animate-pulse">
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-yellow-400 font-black text-xl mb-3">
                      ASIENTOS SELECCIONADOS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-black px-4 py-2 rounded-lg">
                          {seat}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-white">
                      <p className="text-sm opacity-80">Cantidad de pasajeros</p>
                      <p className="text-3xl font-black text-yellow-400">{selectedSeats.length}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-pink-400 font-bold mb-2">TOTAL A PAGAR</p>
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 mb-4">
                      Bs. {totalPrice}
                    </p>
                    
                    <button
                      onClick={handleContinue}
                      className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-black text-xl px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/50 flex items-center gap-3 ml-auto"
                    >
                      CONTINUAR AL REGISTRO
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mensaje si no hay asientos seleccionados */}
        {selectedSeats.length === 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-purple-900/50 border-2 border-purple-400 rounded-2xl p-8 text-center">
              <Users size={48} className="text-purple-400 mx-auto mb-4" />
              <p className="text-white font-bold text-xl">
                Selecciona tus asientos para continuar
              </p>
              <p className="text-purple-300 mt-2">
                Haz clic en los asientos disponibles del bus
              </p>
            </div>
          </div>
        )}
        
      </div>
      
      {/* Footer */}
      <footer className="border-t-4 border-yellow-400 bg-black/50 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-bold">
            🎉 NON STOP MADNESS - La Paz → Cochabamba 🎉
          </p>
          <p className="text-purple-300 text-sm mt-2">
            Bus VIP Leito | Viaje Seguro y Cómodo
          </p>
        </div>
      </footer>
      
    </div>
  );
}
