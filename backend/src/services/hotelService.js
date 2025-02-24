// import hotelRepository from "../repositories/hotelRepository"

// class HotelService{

//     async fetchHotelData(data)
//     {
//         const hotelData=await hotelRepository.getHotelData(data) 
//     }
// }

// export default new HotelService()

import HotelRepository from "../repositories/HotelRepository.js";

class HotelService {
  async fetchHotelData(data) {
    const hotelData = await HotelRepository.getHotelData(data);
    return hotelData;
  }

  async createBooking(data) {
    const bookingData = await HotelRepository.createBooking(data);
    return bookingData;
  }

  async updatePaymentStatus(bookingId, status) {
    const updatedBooking = await HotelRepository.updateBookingStatus(bookingId, status);
    return updatedBooking;
  }
}

export default new HotelService();