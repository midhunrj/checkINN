
import React, { useState } from 'react';
import DateSelectionModal from './dateModal';
import GuestSelectionModal, { GuestsType } from './guestSelectionModal';
import SearchCard from './searchCard';



type ActiveStep = 'location' | 'dates' | 'guests' | 'results';
interface Dates { checkIn: string; checkOut: string }
interface Guests { rooms: number; adults: number; children: number }

const HotelBookingSystem: React.FC = () => {
  const [activeStep, setActiveStep] = useState<ActiveStep>('location');
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showGuestModal, setShowGuestModal] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [dates, setDates] = useState<Dates>({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState<GuestsType>({ rooms: 1, adults: 2, children: 0 });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {activeStep !== 'results' ? (
        <SearchCard
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          location={location}
          setLocation={setLocation}
          dates={dates}
          setDates={setDates}
          guests={guests}
          setGuests={setGuests}
          setShowDateModal={setShowDateModal}
          setShowGuestModal={setShowGuestModal}
        />
      ) : (
        // <div className="max-w-5xl mx-auto space-y-6">
        //   <div className="flex justify-between items-center">
        //     <h2 className="text-2xl font-bold">Available Hotels</h2>
        //     <button
        //       onClick={() => setActiveStep('location')}
        //       className="text-blue-600 hover:text-blue-700"
        //     >
        //       Modify Search
        //     </button>
        //   </div>
        //   {/* Add HotelCard components here if you have them */}
        // </div>
        <></>
      )}
      <DateSelectionModal
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
        dates={dates}
        setDates={setDates}
      />
      <GuestSelectionModal
        isOpen={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        guests={guests}
        setGuests={setGuests}
      />
    </div>
  );
};

export default HotelBookingSystem;