import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuestCounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

const GuestCounter: React.FC<GuestCounterProps> = ({ 
  label, 
  value, 
  onIncrement, 
  onDecrement, 
  min = 0, 
  max = 10 
}) => (
  <div className="flex items-center justify-between py-2">
    <span>{label}</span>
    <div className="flex items-center gap-4">
      <button 
        onClick={onDecrement}
        disabled={value <= min}
        className={`p-1 rounded-full ${value <= min ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'}`}
      >
        <Minus className="h-5 w-5" />
      </button>
      <span className="w-8 text-center">{value}</span>
      <button 
        onClick={onIncrement}
        disabled={value >= max}
        className={`p-1 rounded-full ${value >= max ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'}`}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default GuestCounter;