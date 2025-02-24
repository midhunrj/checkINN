import mongoose, { Schema } from "mongoose";


const BookingDetailsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    hotelDetailsId: { type: Schema.Types.ObjectId, ref: 'HotelDetails' } 
  });

 export const bookingModel= mongoose.model('BookingDetails', BookingDetailsSchema);