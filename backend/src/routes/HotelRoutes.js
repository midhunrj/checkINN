import { Router } from "express";
import hotelController from "../controllers/hotelController.js";

const HotelRouter=Router()

HotelRouter.get('/search', hotelController.getHotelLists);
HotelRouter.post('/bookings', hotelController.createBooking);
HotelRouter.post('/create-razorpay-order', hotelController.createRazorpayOrder);
HotelRouter.post('/verify-razorpay-payment', hotelController.verifyRazorpayPayment);
HotelRouter.put('/payments', hotelController.updatePaymentStatus);


export default HotelRouter