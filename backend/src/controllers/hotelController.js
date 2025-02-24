import Razorpay from 'razorpay';
import crypto from 'crypto';
import HotelService from "../services/HotelService.js";
import dotenv from 'dotenv'
dotenv.config()
const razorpay = new Razorpay({
  key_id: process.env.Razorpay_id_Key,
  key_secret: process.env.Razorsecret_Key
});
class HotelController {
  async getHotelLists(req, res) {
    try {

      console.log("skjkfjlf");
      
      const data = req.query; 
      console.log(data,"kjjnfkj");
      
      const hotelData = await HotelService.fetchHotelData({
        city: { $regex: data.city, $options: 'i' },
        // available_rooms: { $gte: parseInt(data.rooms) },
        
      });
      console.log(hotelData,"hotelData in controller");
      
      res.status(200).json(hotelData);
      console.log("response sent");
      
    } catch (error) {
      console.log(error, 'error in fetching data');
      res.status(500).json({ message: 'Error fetching the hotel data' });
    }
  }

  async createBooking(req, res) {
    try {
      const data = req.body;
      console.log(data,"in backend");
      
      const bookingData = await HotelService.createBooking(data);
      console.log(bookingData,"bookingData");
      
      res.status(201).json(bookingData);
    } catch (error) {
      console.log(error, 'error in creating booking');
      res.status(500).json({ message: 'Error creating booking' });
    }
  }


 
  async createRazorpayOrder(req, res) {
    try {
      const { amount, currency, bookingId } = req.body;
      const amountInPaise = Math.round(amount * 100);
      const options = {
        amount: amountInPaise,
        currency: currency || 'INR',
        receipt: `booking_${bookingId}`,
      };
      console.log(req.body,"jjkjkj");
      
      const order = await razorpay.orders.create(options);
      console.log(order,"order new jnkjn");
      
      res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ message: 'Error creating Razorpay order' });
    }
  }

  async verifyRazorpayPayment(req, res) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      console.log("res ",req.body,"in verifying" );
      
      const expectedSignature = crypto
        .createHmac('sha256', razorpay.key_secret)
        .update(body.toString())
        .digest('hex');
       console.log("kjkjkjkjhjk");
       
      if (expectedSignature === razorpay_signature) {
        res.status(200).json({ message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid payment signature' });
      }
    } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
      res.status(500).json({ message: 'Error verifying payment' });
    }
  }
  async updatePaymentStatus(req, res) {
    try {
      const { bookingId, status } = req.body;
      console.log("fkjdsnkjshf");
      
      const updatedBooking = await HotelService.updatePaymentStatus(bookingId, status);
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.log(error, 'error in updating payment status');
      res.status(500).json({ message: 'Error updating payment status' });
    }
  }
}

export default new  HotelController();