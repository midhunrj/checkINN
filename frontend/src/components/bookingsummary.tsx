// import React, { useState } from 'react';
// import { useLocation } from 'react-router';
// import { toast } from 'sonner';
// import { Hotel } from './hotelCard';
// import axios from 'axios'
// import { baseURL } from './config/config';


// interface BookingSummaryProps {
//   hotelName: string;
//   nights: number;
//   rooms: number;
//   adults: number;
//   children: number;
//   basePrice: number;
//   taxRate: number; // e.g., 0.18 for 18%
//   onSubmit: (bookingData: BookingData) => void; // Callback for form submission
// }

// interface BookingData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string;
// }

// const BookingSummary: React.FC = () => {
//   const [formData, setFormData] = useState<BookingData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });
//   const location=useLocation()
//   const {
//     hotelName,
//     nights,
//     rooms,
//     adults,
//     children,
//     basePrice,
//     taxRate}=location.state||{}
//   const taxAmount = basePrice * taxRate;
//   const totalAmount = basePrice + taxAmount;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();
//     // Basic form validation
//     if (!formData.name || !formData.email || !formData.phone || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
//       toast.error('Please fill in all required fields');
//       return;
//     }
//     if (!/^\d{10}$/.test(formData.phone)) {
//       toast.error('Please enter a valid 10-digit phone number');
//       return;
//     }
//     if (!/^\d{16}$/.test(formData.cardNumber)) {
//       toast.error('Please enter a valid 16-digit card number');
//       return;
//     }
//     if (!/^\d{3}$/.test(formData.cvv)) {
//       toast.error('Please enter a valid 3-digit CVV');
//       return;
//     }
//     if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
//       toast.error('Please enter expiry date in MM/YY format');
//       return;
//     }


//     toast.success('Booking confirmed! Processing payment...');
    
//     const response=await axios.post(`${baseURL}/bookings`,formData,{ withCredentials: true })

//     setFormData({ name: '', email: '', phone: '', address: '', cardNumber: '', expiryDate: '', cvv: '' });
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 animate-fade-in">
//       <h2 className="text-2xl font-bold text-indigo-800 mb-6">Booking Summary</h2>
//       <div className="space-y-8">
        
//         <div className="border-b border-indigo-200 pb-4">
//           <h3 className="font-semibold text-lg text-indigo-600 mb-2">Hotel Details</h3>
//           <p className="text-indigo-800 font-medium">{hotelName}</p>
//           <p className="text-indigo-600">
//             {nights} night{nights > 1 ? 's' : ''}, {rooms} room{rooms > 1 ? 's' : ''}, {adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}
//           </p>
//         </div>

//         {/* Price Details */}
//         <div className="border-b border-indigo-200 pb-4">
//           <h3 className="font-semibold text-lg text-indigo-600 mb-2">Price Details</h3>
//           <div className="space-y-2 text-indigo-700">
//             <div className="flex justify-between">
//               <span>Base Price</span>
//               <span>${basePrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Taxes ({(taxRate * 100).toFixed(0)}%)</span>
//               <span>${taxAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg text-purple-600">
//               <span>Total Amount</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Guest Information */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg text-indigo-600">Guest Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Billing Address"
//               value={formData.address}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 md:col-span-2"
//             />
//           </div>
//         </div>


//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg text-indigo-600">Payment Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               name="cardNumber"
//               placeholder="Card Number"
//               value={formData.cardNumber}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 md:col-span-2"
//             />
//             <input
//               type="text"
//               name="expiryDate"
//               placeholder="MM/YY"
//               value={formData.expiryDate}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
//             />
//             <input
//               type="text"
//               name="cvv"
//               placeholder="CVV"
//               value={formData.cvv}
//               onChange={handleInputChange}
//               className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
//             />
//           </div>
//         </div>


//         <button
//           onClick={handleSubmit}
//           className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSummary;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { baseURL, paypal_ClientId, razorID } from './config/config'; // Ensure this is correctly set (e.g., 'http://localhost:5000/api')
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  // cardNumber: string;
  // expiryDate: string;
  // cvv: string;
  hotelDetailsId?: string; // Add hotelDetailsId
}

const BookingSummary: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    // cardNumber: '',
    // expiryDate: '',
    // cvv: '',
  });
  const [bookingId, setBookingId] = useState<string | null>(null); // Track booking ID after submission
  const location = useLocation();
  const navigate = useNavigate();

  const {
    hotelName,
    nights,
    rooms,
    adults,
    children,
    basePrice,
    taxRate,
    hotelId, // Assuming hotelId is passed from HotelCard via location.state
  } = location.state || {};

  const taxAmount = basePrice * taxRate;
  const totalAmount = basePrice + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone ) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    try {
      const bookingData = {
        ...formData,
        hotelDetailsId: hotelId, // Include hotel ID from location.state
      };
      const response = await axios.post(`${baseURL}/bookings`, bookingData, { withCredentials: true });
      setBookingId(response.data._id); // Store booking ID
      handleRazorpayPayment(response.data._id);
      console.log(paypal_ClientId,"kjsnfkjdnfjks");
      
      toast.success('Booking created! Please complete payment with PayPal.');
    } catch (error) {
      toast.error('Error creating booking');
      console.error(error);
    }
  };
  const handleRazorpayPayment = async (bookingId: string) => {
    try {
      // Create Razorpay order on the backend
      const orderResponse = await axios.post(`${baseURL}/create-razorpay-order`, {
        amount: totalAmount, // Razorpay expects amount in paise (INR)
        currency: "INR",
        bookingId,
      }, { withCredentials: true });

      const { orderId, amount, currency } = orderResponse.data;


      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: razorID, 
          amount: amount, 
          currency: currency,
          name: "Hotel Booking System",
          description: `Booking for ${hotelName} - Booking ID: ${bookingId}`,
          order_id: orderId, 
          handler: async function (response: any) {
            console.log("Payment Success:", response);
            
            await axios.post(`${baseURL}/verify-razorpay-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            }, { withCredentials: true });
            
            await handlePaymentSuccess();
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          toast.error('Payment failed');
          console.error("Payment Failed:", response.error);
        });
        rzp.open();
      };
      script.onerror = () => {
        toast.error('Failed to load Razorpay SDK');
      };
      document.body.appendChild(script);
    } catch (error) {
      toast.error('Error initiating Razorpay payment');
      console.error(error);
    }
  };
  const handlePaymentSuccess = async () => {
    if (!bookingId) return;
    try {
console.log("kjnkjnkjnkj handle payment success");

      const response=await axios.put(`${baseURL}/payments`, { bookingId, status: 'Completed' }, { withCredentials: true });
      console.log(response,"jbjshkjsd");
      
      toast.success('Payment successful! Booking confirmed.');
      setFormData({ name: '', email: '', phone: '', address: '' });
      setBookingId(null);

      navigate('/'); 
    } catch (error) {
      toast.error('Error updating payment status');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Booking Summary</h2>
      <div className="space-y-8">
      
        <div className="border-b border-indigo-200 pb-4">
          <h3 className="font-semibold text-lg text-indigo-600 mb-2">Hotel Details</h3>
          <p className="text-indigo-800 font-medium">{hotelName || 'N/A'}</p>
          <p className="text-indigo-600">
            {nights} night{nights > 1 ? 's' : ''}, {rooms} room{rooms > 1 ? 's' : ''}, {adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}
          </p>
        </div>

        
        <div className="border-b border-indigo-200 pb-4">
          <h3 className="font-semibold text-lg text-indigo-600 mb-2">Price Details</h3>
          <div className="space-y-2 text-indigo-700">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>${basePrice?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes ({(taxRate * 100)?.toFixed(0) || 0}%)</span>
              <span>${taxAmount?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-purple-600">
              <span>Total Amount</span>
              <span>${totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-indigo-600">Guest Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
            <input
              type="tel"
              name="phone"
              placeholder="phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
            <input
              type="text"
              name="address"
              placeholder="Billing Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-indigo-200 rounded-xl bg-indigo-50 text-indigo-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 md:col-span-2"
            />
          </div>
        </div>


        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
        >
          Proceed to Pay
        </button>


        {bookingId && (
          // <PayPalScriptProvider options={{ clientId: paypal_ClientId, currency: "USD" }}>
          //   <PayPalButtons
          //    fundingSource={undefined}
          //     createOrder={(data, actions) => {
          //       console.log("Creating order:", totalAmount.toFixed(2), bookingId, hotelName);
          //       return actions.order.create({
          //           intent: "CAPTURE",
          //         purchase_units: [{
          //           amount: {
          //             value: totalAmount.toFixed(2),
          //             currency_code: 'USD',
          //           },
          //           description: `Booking for ${hotelName} - Booking ID: ${bookingId}`,
          //         }],
          //       });
          //     }}
          //     onApprove={async (data, actions) => {
          //       console.log("Payment Approved:", data);
          //       try {
          //         const orderDetails = await actions.order?.capture();
          //         console.log("Order Details:", orderDetails);
          //         await handlePaymentSuccess();
          //       } catch (error) {
          //         console.error("Error Capturing Order:", error);
          //         toast.error("Error capturing order");
          //       }
          //     }}
          //     onError={(err) => {
          //       toast.error('Payment failed');
          //       console.error(err);
          //     }}
          //   />
          // </PayPalScriptProvider>
          <></>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;