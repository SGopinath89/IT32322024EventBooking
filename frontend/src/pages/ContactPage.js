import React from 'react';
import UserNavbar from './UserNavbar';
import "../css/userstyle.css";
import bookingheader from "../assest/holy.jpeg";

export default function ContactPage() {
  return (
    <div className='contact'>
      <img src={bookingheader} className='booking-header' alt="Booking Header" />
      <UserNavbar />
      <h1 className='contact-header'>CONTACT US</h1>
      <div className='contact-content'>
        <h3>We’re here to help!</h3>
        <p>
          Whether you have a question about your booking, need assistance with your account, or want to provide feedback, our team is ready to assist you.
        </p>
        
        <p>
          We are excited to have you as part of our community. Together, let's create unforgettable experiences and celebrate the joy of live events. Thank you for choosing VavTickets as your trusted ticket booking platform.
        </p>
      </div>
    </div>
  );
}
