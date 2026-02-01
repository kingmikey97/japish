'use client';

import { useState } from 'react';
import { Bus, Calendar, MapPin, Users, ArrowRight, Check } from 'lucide-react';
import SeatSelector from '@/components/SeatSelector';

export default function ReservasPage() {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fecha: '',
    pasajeros: 1
  });

  // Datos de ejemplo de rutas disponibles
  const rutas = [
    { id: 1, origen: 'La Paz', destino: 'Santa Cruz', precio: 150, duracion: '14 horas' },
    { id: 2, origen: 'La Paz', destino: 'Cochabamba', precio: 80, duracion: '8 horas' },
    { id: 3, origen: 'Santa Cruz', destino: 'Sucre', precio: 120, duracion: '10 horas' },
    { id: 4, origen: 'Cochabamba', destino: 'Oruro', precio: 60, duracion: '5 horas' },
  ];

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    if (step === 1 && formData.origen && formData.destino && formData.fecha) {
      setStep(2);
    } else if (step === 2 && selectedSeats.length > 0) {
      setStep(3);
    }
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const totalPrice = selectedSeats.length * 150; // Precio por asiento

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bus className="text-cyan-400" size={32} />
              <h1 className="text-2xl font-bold text-white">JAPISH Bus</h1>
            </div>
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
              <Check size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-semibold">PREMIUM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {[
              { num: 1, label: 'Seleccionar Ruta' },
              { num: 2, label: 'Elegir Asientos' },
              { num: 3, label: 'Confirmar' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= s.num 
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                      : 'bg-white/10 text-white/50'
                  }`}>
                    {step > s.num ? <Check size={24} /> : s.num}
                  </div>
                  <span className={`mt-2 text-sm ${step >= s.num ? 'text-white' : 'text-white/50'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    step > s.num ? 'bg-cyan-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* STEP 1: Seleccionar Ruta */}
          {step === 1 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Selecciona tu viaje</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Origen */}
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    <MapPin className="inline mr-2" size={18} />
                    Origen
                  </label>
                  <select
                    name="origen"
                    value={formData.origen}
                    onChange={handleFormChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  >
                    <option value="">Selecciona origen</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="Oruro">Oruro</option>
                  </select>
                </div>

                {/* Destino */}
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    <MapPin className="inline mr-2" size={18} />
                    Destino
                  </label>
                  <select
                    name="destino"
                    value={formData.destino}
                    onChange={handleFormChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  >
                    <option value="">Selecciona destino</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="Sucre">Sucre</option>
                  </select>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    <Calendar className="inline mr-2" size={18} />
                    Fecha de viaje
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleFormChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                {/* Pasajeros */}
                <div>
                  <label className="block text-white mb-2 font-semibold">
                    <Users className="inline mr-2" size={18} />
                    Pasajeros
                  </label>
                  <input
                    type="number"
                    name="pasajeros"
                    value={formData.pasajeros}
                    onChange={handleFormChange}
                    min="1"
                    max="10"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              {/* Rutas disponibles */}
              {formData.origen && formData.destino && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Rutas disponibles</h3>
                  <div className="grid gap-4">
                    {rutas
                      .filter(r => r.origen === formData.origen && r.destino === formData.destino)
                      .map(ruta => (
                        <div key={ruta.id} className="bg-white/5 border border-cyan-500/30 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-4 mb-2">
                                <span className="text-white font-bold text-lg">{ruta.origen}</span>
                                <ArrowRight className="text-cyan-400" />
                                <span className="text-white font-bold text-lg">{ruta.destino}</span>
                              </div>
                              <p className="text-gray-400">Duración: {ruta.duracion}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-cyan-400">Bs. {ruta.precio}</div>
                              <p className="text-sm text-gray-400">por asiento</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={!formData.origen || !formData.destino || !formData.fecha}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar a Selección de Asientos
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: Seleccionar Asientos */}
          {step === 2 && (
            <div>
              <SeatSelector 
                onSeatSelect={handleSeatSelect}
                maxSeats={formData.pasajeros}
              />
              
              <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Resumen de Selección</h3>
                    <p className="text-gray-400">
                      {selectedSeats.length} asiento{selectedSeats.length !== 1 ? 's' : ''} seleccionado{selectedSeats.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total a pagar</p>
                    <p className="text-4xl font-bold text-cyan-400">Bs. {totalPrice}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={selectedSeats.length === 0}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar a Confirmación
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmación */}
          {step === 3 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={40} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">¡Reserva Confirmada!</h2>
                <p className="text-gray-400">Tu reserva ha sido procesada exitosamente</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Detalles de tu viaje</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Ruta:</span>
                    <span className="font-semibold text-white">{formData.origen} → {formData.destino}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fecha:</span>
                    <span className="font-semibold text-white">{formData.fecha}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Asientos:</span>
                    <span className="font-semibold text-white">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
                    <span className="text-lg">Total pagado:</span>
                    <span className="text-2xl font-bold text-cyan-400">Bs. {totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setSelectedSeats([]);
                  setFormData({ origen: '', destino: '', fecha: '', pasajeros: 1 });
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                Hacer otra reserva
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
