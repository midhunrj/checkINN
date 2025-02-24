// import { HotelModel } from "../models/hotel"

import { HotelModel } from '../models/hotel.js';
 import {bookingModel} from '../models/bookingDetails.js'
// class HotelRepository{
//     async getHotelData(data)
//     {
//         const hotelData=await HotelModel.find(data)
//         return hotelData
//     }
// }

// export default new HotelRepository()





class HotelRepository {
  async getHotelData(data) {
    const hotelData = await HotelModel.find({city:data.city});
    console.log("hotelData",hotelData.slice(0,4));
    
    return hotelData.slice(0,4);
  }

  async createBooking(data) {
    const booking = new bookingModel(data);
    await booking.save();
    return booking;
  }

  async updateBookingStatus(bookingId, status) {
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { paymentStatus: status },
      { new: true }
    );
    return booking;
  }
}

export default new HotelRepository();