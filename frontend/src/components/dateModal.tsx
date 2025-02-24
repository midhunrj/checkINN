// import React from 'react';
// import Modal from './modal';


// interface Dates { checkIn: string; checkOut: string }

// interface DateSelectionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   dates: Dates;
//   setDates: (dates: Dates) => void;
// }

// const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ isOpen, onClose, dates, setDates }) => (
//   <Modal isOpen={isOpen} onClose={onClose} title="Select Dates">
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">Check-in</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded-lg"
//           value={dates.checkIn}
//           onChange={(e) => setDates((prev:Dates) => ({ ...prev, checkIn: e.target.value }))}
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Check-out</label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded-lg"
//           value={dates.checkOut}
//           onChange={(e) => setDates((prev:Dates) => ({ ...prev, checkOut: e.target.value }))}
//         />
//       </div>
//       <button
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         onClick={onClose}
//       >
//         Confirm Dates
//       </button>
//     </div>
//   </Modal>
// );

// export default DateSelectionModal;



import React, { useEffect, useState } from 'react';
import Modal from './modal';

interface Dates { checkIn: string; checkOut: string }

interface DateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dates: Dates;
  setDates: (dates: Dates) => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ isOpen, onClose, dates, setDates }) => {
  const [tempDates, setTempDates] = useState<Dates>(dates);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTempDates(dates);
  }, [dates, isOpen]);

  const handleConfirm = () => {
    const checkInDate = new Date(tempDates.checkIn);
    const checkOutDate = new Date(tempDates.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!tempDates.checkIn || !tempDates.checkOut) {
      setError('Please select both check-in and check-out dates');
      return;
    }
    if (checkInDate < today) {
      setError('Check-in date cannot be in the past');
      return;
    }
    if (checkOutDate <= checkInDate) {
      setError('Check-out date must be after check-in date');
      return;
    }

    setDates(tempDates);
    setError('');
    onClose();
  };

  return (
    <Modal  isOpen={isOpen} onClose={onClose} title="Select Your Travel Dates">
      <div className="space-y-6 p-2">
        <div className="relative">
          <label className="block text-sm font-semibold text-indigo-600 mb-2">Check-in Date</label>
          <input
            type="date"
            className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            value={tempDates.checkIn}
            onChange={(e) => setTempDates(prev => ({ ...prev, checkIn: e.target.value }))}
            min={new Date().toISOString().split('T')[0]} // Prevents past dates
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-semibold text-purple-600 mb-2">Check-out Date</label>
          <input
            type="date"
            className="w-full p-3 border-2 border-purple-200 rounded-xl bg-purple-50 text-purple-800 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 transition-all duration-300"
            value={tempDates.checkOut}
            onChange={(e) => setTempDates(prev => ({ ...prev, checkOut: e.target.value }))}
            min={tempDates.checkIn || new Date().toISOString().split('T')[0]}
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
            Confirm Dates
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DateSelectionModal;