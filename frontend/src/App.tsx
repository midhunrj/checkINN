import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HotelBookingSystem from "./components/home";
import { Toaster } from "sonner";
import HotelsPage from "./components/hotelsPage";
import BookingSummary from "./components/bookingsummary";

function App() {
  

  return (
    <>
    <Toaster/>
    <Router>
      <Routes>
        
        <Route path="/" element={<HotelBookingSystem/>}/>
        <Route path="/hotels" element={<HotelsPage/>}/>
        <Route path="/bookingpage" element={<BookingSummary/>}/>
      </Routes>
      </Router>
         </>
  )
}

export default App
