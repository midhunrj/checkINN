
import React, { useState } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { baseURL } from './config/config'; 
import axios from 'axios';

type ActiveStep = 'location' | 'dates' | 'guests' | 'results';
interface Dates { checkIn: string; checkOut: string }
interface Guests { rooms: number; adults: number; children: number }

const stepImages: Record<ActiveStep, string> = {
  location: 'checkinn1.jpg',
  dates: 'checkinn2.jpeg',
  guests: 'checkinn3.jpg',
  results: 'checkinn4.jpeg',
};

interface SearchCardProps {
  activeStep: ActiveStep;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStep>> // Adjusted to allow function type
  location: string;
  setLocation: (value: string) => void;
  dates: Dates;
  setDates: (dates: Dates) => void;
  guests: Guests;
  setGuests: (guests: Guests) => void;
  setShowDateModal: (value: boolean) => void;
  setShowGuestModal: (value: boolean) => void;
}

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYXNoaW5qb3kiLCJhIjoiY2x6aWE4YnNkMDY0ejJxcjBlZmpid2VoYyJ9.Etsb6UwNacChll6vPVQ_1g";

const SearchCard: React.FC<SearchCardProps> = ({
  activeStep,
  setActiveStep,
  location,
  setLocation,
  dates,
  setDates,
  guests,
  setGuests,
  setShowDateModal,
  setShowGuestModal,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const fetchLocationSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&types=place`
      );
      const data = await response.json();
      const places = data.features.map((feature: any) => feature.place_name);
      setSuggestions(places);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocationSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleNextStep = (nextStep: ActiveStep) => {
    if (activeStep === 'location' && !location) {
      toast.error('Please enter a location first');
      return;
    }
    if (activeStep === 'dates' && (!dates.checkIn || !dates.checkOut)) {
      toast.error('Please select both check-in and check-out dates');
      return;
    }
    if (activeStep === 'guests' && guests.rooms === 0) {
      toast.error('Please select at least one room');
      return;
    }
    setActiveStep(nextStep);
  };

  const handleSearch = async () => {
    if (!location || !dates.checkIn || !dates.checkOut || guests.rooms === 0) {
      toast.error('Please complete all search criteria');
      console.log("skjfjk");
      
      return;
    }
console.log("hhh");

    try {
      const response = await axios.get(`${baseURL}/search`, {
        params: {
          city:location.split(',')[0],
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
          rooms: guests.rooms,
          adults: guests.adults,
          children: guests.children,
        },
      });
      console.log("kjkjjk");
      
console.log(response,"response data")
      const hotelData = response.data;

      if (hotelData.length === 0) {
        toast.info('No hotels found for your criteria');
        setActiveStep("location")
        return;
      }

      // Navigate to results page with hotel data
      navigate('/hotels', {
        state: {
          hotels:hotelData,
          location,
          dates,
          guests,
        },
      });
      setActiveStep('results');
    } catch (error) {
      toast.error('Error fetching hotels');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white min-h-auto shadow-xl rounded-xl overflow-hidden">
      <div className="relative h-48">
        <img
          src={`../../public/${stepImages[activeStep]}`}
          alt={`${activeStep} background`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">Find Your Perfect Stay</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {activeStep === 'location' && (
          <div className="space-y-4 animate-fade-in">
            <label className="block text-lg font-semibold text-indigo-600">Where are you going?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
              <input
                type="text"
                placeholder="Enter destination or hotel name"
                className="pl-12 w-full p-3 border-2 border-indigo-200 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 font-medium shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                value={location}
                onChange={handleLocationChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
              {suggestions.length > 0 && isFocused && (
                <ul className="absolute z-10 w-full scroll-auto h-auto mb-4 mt-1 bg-white border border-indigo-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 text-indigo-700 hover:bg-indigo-100 cursor-pointer transition-colors duration-200"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleNextStep('dates')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 text-xl font-semibold rounded-xl shadow-lg my-8 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeStep === 'dates' && (
          <div className="space-y-4 animate-fade-in">
            <label className="block text-lg font-semibold text-indigo-600">When are you staying?</label>
            <button
              className="relative w-full text-left group"
              onClick={() => setShowDateModal(true)}
            >
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
              <input
                type="text"
                placeholder="Select your travel dates"
                className="pl-12 w-full p-3 border-2 border-indigo-200 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 font-medium shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                value={dates.checkIn && dates.checkOut ? `${dates.checkIn} - ${dates.checkOut}` : ''}
                readOnly
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 group-hover:text-indigo-700 text-sm font-medium">
                Pick Dates
              </span>
            </button>
            <div className="flex justify-center">
              <button
                onClick={() => handleNextStep('guests')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 text-xl font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeStep === 'guests' && (
          <div className="space-y-4 animate-fade-in">
            <label className="block text-lg font-semibold text-indigo-600">Who's staying?</label>
            <button
              className="relative w-full text-left group"
              onClick={() => setShowGuestModal(true)}
            >
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
              <input
                type="text"
                placeholder="Add your traveling party"
                className="pl-12 w-full p-3 border-2 border-indigo-200 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 font-medium shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                value={guests.rooms > 0 ? `${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}, ${guests.adults} Adult${guests.adults > 1 ? 's' : ''}, ${guests.children} Child${guests.children > 1 ? 'ren' : ''}` : ''}
                readOnly
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 group-hover:text-indigo-700 text-sm font-medium">
                Select Guests
              </span>
            </button>
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 text-xl font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Search Hotels
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;

