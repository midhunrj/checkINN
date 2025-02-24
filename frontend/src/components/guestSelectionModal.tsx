// import React from 'react';
// import Modal from './modal';
// import GuestCounter from './guestModal';


// export type GuestsType ={ rooms: number; adults: number; children: number }

// interface GuestSelectionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   guests: GuestsType;
//   setGuests: (guests: GuestsType) => void;
// }

// const GuestSelectionModal: React.FC<GuestSelectionModalProps> = ({ isOpen, onClose, guests, setGuests }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title="Select Guests">
//     <div className="space-y-4">
//       <GuestCounter
//         label="Rooms"
//         value={guests.rooms}
//         onIncrement={() => setGuests((prev:GuestsType) => ({ ...prev, rooms: prev.rooms + 1 }))}
//         onDecrement={() => setGuests((prev:GuestsType) => ({ ...prev, rooms: prev.rooms - 1 }))}
//         min={1}
//         max={5}
//       />
//       <GuestCounter
//         label="Adults"
//         value={guests.adults}
//         onIncrement={() => setGuests((prev:GuestsType) => ({ ...prev, adults: prev.adults + 1 }))}
//         onDecrement={() => setGuests(prev => ({ ...prev, adults: prev.adults - 1 }))}
//         min={1}
//       />
//       <GuestCounter
//         label="Children"
//         value={guests.children}
//         onIncrement={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
//         onDecrement={() => setGuests(prev => ({ ...prev, children: prev.children - 1 }))}
//       />
//       <button
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         onClick={onClose}
//       >
//         Confirm Selection
//       </button>
//     </div>
//   </Modal>
// );

// export default GuestSelectionModal;


import React, { useState, useEffect } from 'react';
import Modal from './modal';
import GuestCounter from './guestModal'; // Assuming the correct filename is GuestCounter.tsx

export type GuestsType = { rooms: number; adults: number; children: number };

interface GuestSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: GuestsType;
  setGuests: (guests: GuestsType) => void;
}

const GuestSelectionModal: React.FC<GuestSelectionModalProps> = ({ isOpen, onClose, guests, setGuests }) => {
  const [tempGuests, setTempGuests] = useState<GuestsType>(guests);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTempGuests(guests);
  }, [guests, isOpen]);

  const handleConfirm = () => {
    if (tempGuests.rooms === 0) {
      setError('Please select at least one room');
      return;
    }
    if (tempGuests.adults === 0) {
      setError('Please select at least one adult');
      return;
    }
    setGuests(tempGuests);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Your Traveling Party">
      <div className="space-y-6 p-2">
        <div className="space-y-4">
          <GuestCounter
            label="Rooms"
            value={tempGuests.rooms}
            onIncrement={() => setTempGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
            onDecrement={() => setTempGuests(prev => ({ ...prev, rooms: prev.rooms - 1 }))}
            min={1}
            max={5}
          />
          <GuestCounter
            label="Adults"
            value={tempGuests.adults}
            onIncrement={() => setTempGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
            onDecrement={() => setTempGuests(prev => ({ ...prev, adults: prev.adults - 1 }))}
            min={1}
            max={20}
          />
          <GuestCounter
            label="Children"
            value={tempGuests.children}
            onIncrement={() => setTempGuests(prev => ({ ...prev, children: prev.children + 1 }))}
            onDecrement={() => setTempGuests(prev => ({ ...prev, children: prev.children - 1 }))}
            min={0}
            max={10}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-lg animate-pulse">
            {error}
          </div>
        )}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GuestSelectionModal;