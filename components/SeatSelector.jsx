'use client';

import { useState } from 'react';
import { Armchair, Steering, X } from 'lucide-react';

export default function SeatSelector({ onSeatSelect, maxSeats = 10 }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Configuración del autobús: 12 filas, 4 asientos por fila (2-2)
  const rows = 12;
  const seatsPerRow = 4;
  
  // Asientos ya ocupados (simulación)
  const occupiedSeats = ['1A', '2B', '3C', '5A', '7D', '8B', '10C', '11A'];
  
  const getSeatLabel = (row, seat) => {
    const letters = ['A', 'B', 'C', 'D'];
    return `${row}${letters[seat]}`;
  };
  
  const isSeatOccupied = (seatLabel) => {
    return occupiedSeats.includes(seatLabel);
  };
  
  const isSeatSelected = (seatLabel) => {
    return selectedSeats.includes(seatLabel);
  };
  
  const handleSeatClick = (seatLabel) => {
    if (isSeatOccupied(seatLabel)) return;
    
    let newSelectedSeats;
    
    if (isSeatSelected(seatLabel)) {
      // Deseleccionar
      newSelectedSeats = selectedSeats.filter(s => s !== seatLabel);
    } else {
      // Seleccionar (si no excede el máximo)
      if (selectedSeats.length >= maxSeats) {
        alert(`Solo puedes seleccionar hasta ${maxSeats} asientos`);
        return;
      }
      newSelectedSeats = [...selectedSeats, seatLabel];
    }
    
    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };
  
  const getSeatColor = (seatLabel) => {
    if (isSeatOccupied(seatLabel)) {
      return 'bg-red-500/20 border-red-500/50 cursor-not-allowed';
    }
    if (isSeatSelected(seatLabel)) {
      return 'bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50 scale-105';
    }
    return 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-cyan-500/50 hover:scale-105';
  };
  
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Selecciona tus asientos</h2>
        <p className="text-gray-400">
          Haz clic en los asientos disponibles para seleccionarlos
        </p>
      </div>
      
      {/* Leyenda */}
      <div className="flex flex-wrap gap-6 mb-8 p-6 bg-white/5 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 border-2 border-white/30 rounded-lg"></div>
          <span className="text-white text-sm">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 border-2 border-cyan-400 rounded-lg"></div>
          <span className="text-white text-sm">Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500/20 border-2 border-red-500/50 rounded-lg"></div>
          <span className="text-white text-sm">Ocupado</span>
        </div>
      </div>
      
      {/* Bus Layout */}
      <div className="max-w-md mx-auto">
        
        {/* Driver */}
        <div className="mb-6 flex justify-end pr-4">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
            <Steering className="text-cyan-400" size={20} />
            <span className="text-white text-sm font-semibold">Conductor</span>
          </div>
        </div>
        
        {/* Seats Grid */}
        <div className="space-y-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-3xl border-2 border-white/10">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowNumber = rowIndex + 1;
            
            return (
              <div key={rowNumber} className="flex items-center gap-2">
                
                {/* Row number */}
                <div className="w-8 text-center text-white/50 text-sm font-semibold">
                  {rowNumber}
                </div>
                
                {/* Left seats (A, B) */}
                <div className="flex gap-2">
                  {[0, 1].map(seatIndex => {
                    const seatLabel = getSeatLabel(rowNumber, seatIndex);
                    const isOccupied = isSeatOccupied(seatLabel);
                    const isSelected = isSeatSelected(seatLabel);
                    
                    return (
                      <button
                        key={seatLabel}
                        onClick={() => handleSeatClick(seatLabel)}
                        disabled={isOccupied}
                        className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${getSeatColor(seatLabel)}`}
                        title={seatLabel}
                      >
                        {isOccupied ? (
                          <X className="text-red-400 mx-auto" size={20} />
                        ) : (
                          <Armchair 
                            className={`mx-auto ${isSelected ? 'text-white' : 'text-gray-400'}`} 
                            size={20} 
                          />
                        )}
                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] ${
                          isSelected ? 'text-white font-bold' : 'text-gray-500'
                        }`}>
                          {seatLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Aisle */}
                <div className="w-8"></div>
                
                {/* Right seats (C, D) */}
                <div className="flex gap-2">
                  {[2, 3].map(seatIndex => {
                    const seatLabel = getSeatLabel(rowNumber, seatIndex);
                    const isOccupied = isSeatOccupied(seatLabel);
                    const isSelected = isSeatSelected(seatLabel);
                    
                    return (
                      <button
                        key={seatLabel}
                        onClick={() => handleSeatClick(seatLabel)}
                        disabled={isOccupied}
                        className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${getSeatColor(seatLabel)}`}
                        title={seatLabel}
                      >
                        {isOccupied ? (
                          <X className="text-red-400 mx-auto" size={20} />
                        ) : (
                          <Armchair 
                            className={`mx-auto ${isSelected ? 'text-white' : 'text-gray-400'}`} 
                            size={20} 
                          />
                        )}
                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] ${
                          isSelected ? 'text-white font-bold' : 'text-gray-500'
                        }`}>
                          {seatLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
              </div>
            );
          })}
        </div>
        
        {/* Selected seats info */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400 font-semibold mb-1">Asientos seleccionados:</p>
                <p className="text-white text-lg font-bold">{selectedSeats.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 text-sm">Total</p>
                <p className="text-white text-2xl font-bold">{selectedSeats.length}/{maxSeats}</p>
              </div>
            </div>
          </div>
        )}
        
      </div>
      
    </div>
  );
}
