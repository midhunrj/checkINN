import React from 'react';
import { MapPin, Star, Wifi, Coffee, Car } from 'lucide-react';
import { useNavigate } from 'react-router';

export interface Hotel {
  id?: string;
  _id?:string
  name: string;
  location: string;
  image: string;
  rating: number;
  amenities: string[];
  price: number;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    const navigate = useNavigate(); 

  const handleBooking = (hotel:Hotel) => {
    navigate("/bookingpage", {
      state: {
        hotelName: hotel.name,
        nights: 2, 
        rooms: 1,
        adults: 2,
        children: 0,
        basePrice: hotel.price,
        taxRate: 0.18, 
        hotelId:hotel._id
      },
    });
  };
  return(
  <div className="w-full mb-6 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
    <div className="flex flex-col md:flex-row">
      
      <div className="md:w-1/3 relative group">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-indigo-800 group-hover:text-indigo-600 transition-colors duration-200">
                {hotel.name}
              </h3>
              <p className="text-indigo-600 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4 text-indigo-500" /> {hotel.location}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full shadow-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-bold text-indigo-700">{hotel.rating}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="my-4 flex flex-wrap gap-4">
            {hotel.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full shadow-sm hover:bg-indigo-100 transition-colors duration-200"
              >
                {amenity === 'WiFi' && <Wifi className="h-4 w-4 text-indigo-500" />}
                {amenity === 'Pool' && <Coffee className="h-4 w-4 text-indigo-500" />} 
                {amenity === 'Parking' && <Car className="h-4 w-4 text-indigo-500" />}
                <span className="text-sm font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

      
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-purple-600">${hotel.price}</span>
            <span className="text-indigo-600 text-sm">/night</span>
          </div>
          <button onClick={()=>handleBooking(hotel)}className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default HotelCard;
