# Hotel Booking System

![Hotel Booking System](frontend/public/checkinn1.jpg)

A mini-project web application for booking hotels , featuring a user-friendly search interface, hotel listings, and a secure payment system. Initially integrated with PayPal, the project has switched to Razorpay due to persistent issues with PayPal's Sandbox mode prompting for live account login/signup instead of seamless test transactions.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Payment Integration](#payment-integration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Search Form**: Search hotels by location, check-in/check-out dates, and guest details (rooms, adults, children).
- **Hotel Listings**: Displays a list of hotels with images, details, amenities, ratings, and prices.
- **Booking Summary**: Shows booking details with price breakdown (base price, taxes, total amount) and guest information form.
- **Payment**: Secure payment processing via Razorpay (Test mode).
- **Backend**: RESTful API with MongoDB for storing hotel and booking data.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Lucide React (icons), Axios, React Router, Sonner (toasts)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Razorpay SDK
- **Payment Gateway**: Razorpay (switched from PayPal due to Sandbox issues)
- **Tools**: Nodemon, Git
- **Note**: I utilized TypeScript on the frontend for enhanced type safety and development efficiency, and switched to Razorpay for payments because PayPal's Sandbox mode was unreliable, frequently prompting for live account login/signup instead of seamless test transactions.

## Prerequisites
- **Node.js**: v20.9.0 or higher
- **MongoDB**: Running locally or via a cloud service (e.g., MongoDB Atlas)
- **Razorpay Account**: Test API Keys (Key ID and Secret) from [Razorpay Dashboard](https://dashboard.razorpay.com/)
- **Git**: For cloning and version control


#setup-instructions


here below are the env for frontend and backend

#backend

MONGODB_URL=mongodb+srv://midhunrj18852:yaU6HlvM2soxlQh2@checkinn.9ijx5.mongodb.net/?retryWrites=true&w=majority&appName=CheckINN
PAYPAL_CLIENT_ID=AYw3H5nfUM9pbXl2hBCxPL7hXtknLr0iaTHgkaX2EVNU22h_W_-nBRAPvEpbBJGauB9618EaRMZcmbDx
PAYPAL_CLIENT_SECRET=EGrzZu_nJ9OaJ9TatGmPA2KnrcIm6qAZa1iAk6ROjjEkDBbkckQE4V-BZpSTC8ibZTw4K_ZONZXP5iR5
CLIENT_URL= 'http://localhost:5173'

Razorpay_id_Key="rzp_test_3oY2qxkce538eY"
Razorsecret_Key="7DeliWImbPufhg7KdSXW0cI6"

mongopass=yaU6HlvM2soxlQh2




#frontend


 VITE_USER_URL="http://localhost:7886"
 VITE_CLIENTID=AYw3H5nfUM9pbXl2hBCxPL7hXtknLr0iaTHgkaX2EVNU22h_W_-nBRAPvEpbBJGauB9618EaRMZcmbDx
 VITE_RAZORPAYID="rzp_test_3oY2qxkce538eY"





