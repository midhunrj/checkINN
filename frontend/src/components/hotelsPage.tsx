import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HotelCard from "./hotelCard";

const HotelsPage: React.FC = () => {
  const navigate = useNavigate();
  const locationData = useLocation(); 


  const {
    hotels,  
    location,
    dates,
    guests,
  } = locationData.state || {};




  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-800">Available Hotels</h2>
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
        >
          Modify Search
        </button>
      </div>

      {hotels.map((hotel:any) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelsPage;
