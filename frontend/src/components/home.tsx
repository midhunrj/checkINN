// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
// import { Calendar, MapPin, Users, Star, Coffee, Wifi, Car, Search, X, Plus, Minus } from 'lucide-react';

// // Interfaces
// interface Dates {
//   checkIn: string;
//   checkOut: string;
// }

// interface Guests {
//   rooms: number;
//   adults: number;
//   children: number;
// }

// interface Hotel {
//   id: number;
//   name: string;
//   location: string;
//   image: string;
//   rating: number;
//   price: number;
//   amenities: string[];
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
// }

// interface GuestCounterProps {
//   label: string;
//   value: number;
//   onIncrement: () => void;
//   onDecrement: () => void;
//   min?: number;
//   max?: number;
// }

// interface HotelCardProps {
//   hotel: Hotel;
// }

// const HotelBookingSystem: React.FC = () => {
//   type ActiveStep = 'location' | 'dates' | 'guests' | 'results';
  
//   const [activeStep, setActiveStep] = useState<ActiveStep>('location');
//   const [showDateModal, setShowDateModal] = useState<boolean>(false);
//   const [showGuestModal, setShowGuestModal] = useState<boolean>(false);
//   const [location, setLocation] = useState<string>('');
//   const [dates, setDates] = useState<Dates>({ checkIn: '', checkOut: '' });
//   const [guests, setGuests] = useState<Guests>({
//     rooms: 1,
//     adults: 2,
//     children: 0
//   });

//   // Sample hotel data
//   const hotels: Hotel[] = [
//     {
//       id: 1,
//       name: "Luxury Palace Hotel",
//       location: "Downtown, City Center",
//       image: "/api/placeholder/600/400",
//       rating: 4.8,
//       price: 299,
//       amenities: ["WiFi", "Pool", "Spa", "Parking"],
//     },
//     {
//       id: 2,
//       name: "Seaside Resort",
//       location: "Beachfront, Coastal Area",
//       image: "/api/placeholder/600/400",
//       rating: 4.5,
//       price: 199,
//       amenities: ["WiFi", "Beach Access", "Restaurant", "Gym"],
//     },
//   ];

//   const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold">{title}</h3>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           {children}
//         </div>
//       </div>
//     );
//   };

//   const GuestCounter: React.FC<GuestCounterProps> = ({ 
//     label, 
//     value, 
//     onIncrement, 
//     onDecrement, 
//     min = 0, 
//     max = 10 
//   }) => (
//     <div className="flex items-center justify-between py-2">
//       <span>{label}</span>
//       <div className="flex items-center gap-4">
//         <button 
//           onClick={onDecrement}
//           disabled={value <= min}
//           className={`p-1 rounded-full ${value <= min ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'}`}
//         >
//           <Minus className="h-5 w-5" />
//         </button>
//         <span className="w-8 text-center">{value}</span>
//         <button 
//           onClick={onIncrement}
//           disabled={value >= max}
//           className={`p-1 rounded-full ${value >= max ? 'text-gray-300' : 'text-blue-600 hover:bg-blue-50'}`}
//         >
//           <Plus className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );

//   const SearchCard: React.FC = () => (
//     <Card className="w-full max-w-xl border-gray-200 mx-auto  bg-white shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Find Your Perfect Stay</CardTitle>
//         <img className='w-fit h-full rounded-xl shadow-lg my-4 ' src='../../public/checkinn1.jpg'alt='background image'/>
//       </CardHeader>
//       <CardContent className="space-y-4">
    
//       {activeStep=="location" &&(
//         <div className={`space-y-2 ${activeStep !== 'location' && 'opacity-50'}`}>
//           <label className="block text-sm font-medium">Where are you going?</label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Enter destination or hotel name"
//               className="pl-10 w-full p-2 border-gray-300 border  shadow-lg rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={location}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                 setLocation(e.target.value);
                
//               }}
//             //   disabled={activeStep !== 'location'}
//             />
//           </div>
//           <div className='flex justify-center '><button onClick={()=>setActiveStep("dates")} className='w-30 h-fit  hover:bg-blue-700  cursor-pointer text-xl my-8 rounded-xl  bg-blue-600 px-4 py-2 text-white'> Next</button></div>
//         </div>

//             )}

//             {activeStep=="dates" &&(
//         <div className={`space-y-2 ${activeStep === 'location' ? 'opacity-50' : ''}`}>
//           <label className="block text-sm font-medium">When are you staying?</label>
//           <button
//             className="relative w-full text-left"
//             onClick={() => location && setShowDateModal(true)}
//             disabled={!location}
//           >
//             <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Select dates"
//               className="pl-10 w-full p-2 border rounded-lg bg-white"
//               value={dates.checkIn && dates.checkOut ? `${dates.checkIn} - ${dates.checkOut}` : ''}
//               readOnly
//             />
//           </button>
//           <div className='flex justify-center '><button onClick={()=>setActiveStep("dates")} className='w-30 h-fit  hover:bg-blue-700  cursor-pointer text-xl my-8 rounded-xl  bg-blue-600 px-4 py-2 text-white'> Next</button></div>
//         </div>
//             )}

//         {/* Guest Selection */}
// {activeStep=="guests"&&(
//     <>
//             <div className={`space-y-2 ${!dates.checkIn || !dates.checkOut ? 'opacity-50' : ''}`}>
//           <label className="block text-sm font-medium">Who's staying?</label>
//           <button
//             className="relative w-full text-left"
//             onClick={() => dates.checkIn && dates.checkOut && setShowGuestModal(true)}
//             disabled={!dates.checkIn || !dates.checkOut}
//           >
//             <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Add guests"
//               className="pl-10 w-full p-2 border rounded-lg bg-white"
//               value={guests.rooms > 0 ? `${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}, ${guests.adults} Adult${guests.adults > 1 ? 's' : ''}, ${guests.children} Child${guests.children > 1 ? 'ren' : ''}` : ''}
//               readOnly
//             />
//           </button>
//         </div>

//         <button 
//           className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors ${(!location || !dates.checkIn || !dates.checkOut || guests.rooms === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={!location || !dates.checkIn || !dates.checkOut || guests.rooms === 0}
//           onClick={() => setActiveStep('results')}
//         >
//           Search Hotels
//         </button>
//         </>
// )}
//       </CardContent>
//     </Card>
//   );

//   const DateSelectionModal: React.FC = () => (
//     <Modal
//       isOpen={showDateModal}
//       onClose={() => setShowDateModal(false)}
//       title="Select Dates"
//     >
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Check-in</label>
//           <input
//             type="date"
//             className="w-full p-2 border rounded-lg"
//             value={dates.checkIn}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDates(prev => ({ ...prev, checkIn: e.target.value }))}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Check-out</label>
//           <input
//             type="date"
//             className="w-full p-2 border rounded-lg"
//             value={dates.checkOut}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDates(prev => ({ ...prev, checkOut: e.target.value }))}
//           />
//         </div>
//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           onClick={() => {
//             setShowDateModal(false);
//             if (dates.checkIn && dates.checkOut) setActiveStep('guests');
//           }}
//         >
//           Confirm Dates
//         </button>
//       </div>
//     </Modal>
//   );

//   const GuestSelectionModal: React.FC = () => (
//     <Modal
//       isOpen={showGuestModal}
//       onClose={() => setShowGuestModal(false)}
//       title="Select Rooms & Guests"
//     >
//       <div className="space-y-4">
//         <GuestCounter
//           label="Rooms"
//           value={guests.rooms}
//           onIncrement={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
//           onDecrement={() => setGuests(prev => ({ ...prev, rooms: prev.rooms - 1 }))}
//           min={1}
//           max={5}
//         />
//         <GuestCounter
//           label="Adults"
//           value={guests.adults}
//           onIncrement={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
//           onDecrement={() => setGuests(prev => ({ ...prev, adults: prev.adults - 1 }))}
//           min={1}
//         />
//         <GuestCounter
//           label="Children"
//           value={guests.children}
//           onIncrement={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
//           onDecrement={() => setGuests(prev => ({ ...prev, children: prev.children - 1 }))}
//         />
//         <button
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           onClick={() => setShowGuestModal(false)}
//         >
//           Confirm Selection
//         </button>
//       </div>
//     </Modal>
//   );

//   const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => (
//     <Card className="w-full mb-6 overflow-hidden hover:shadow-xl transition-shadow">
//       <div className="flex flex-col md:flex-row">
//         <div className="md:w-1/3">
//           <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
//         </div>
//         <div className="md:w-2/3 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-xl font-bold">{hotel.name}</h3>
//               <p className="text-gray-600 flex items-center gap-1">
//                 <MapPin className="h-4 w-4" /> {hotel.location}
//               </p>
//             </div>
//             <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded">
//               <Star className="h-4 w-4 text-yellow-500" />
//               <span className="font-bold">{hotel.rating}</span>
//             </div>
//           </div>

//           <div className="my-4 flex gap-4">
//             {hotel.amenities.map((amenity, index) => (
//               <div key={index} className="flex items-center gap-1 text-gray-600">
//                 {amenity === "WiFi" && <Wifi className="h-4 w-4" />}
//                 {amenity === "Pool" && <Coffee className="h-4 w-4" />}
//                 {amenity === "Parking" && <Car className="h-4 w-4" />}
//                 <span className="text-sm">{amenity}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-center mt-4">
//             <div>
//               <span className="text-2xl font-bold">${hotel.price}</span>
//               <span className="text-gray-600">/night</span>
//             </div>
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen  bg-gray-200 p-6">
//       {activeStep !== 'results' ? (
//         <SearchCard />
//       ) : (
//         <div className="max-w-5xl mx-auto space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold">Available Hotels</h2>
//             <button 
//               onClick={() => setActiveStep('location')}
//               className="text-blue-600 hover:text-blue-700"
//             >
//               Modify Search
//             </button>
//           </div>
//           {hotels.map(hotel => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>
//       )}
//       <DateSelectionModal />
//       <GuestSelectionModal />
//     </div>
//   );
// };

// export default HotelBookingSystem;

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