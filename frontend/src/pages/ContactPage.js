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
        <div className='contact-info'>
          <h3>Customer Support:</h3>
          <p>Email: <a href="mailto:vavtickets@gmail.com">vavtickets@gmail.com</a></p>
          <p>Phone: <a href="tel:0112345678">0112345678</a></p>
        </div>
        <div className='feedback-info'>
          <h3>We value your feedback and suggestions:</h3>
          <p>
            Please feel free to share your thoughts with us to help improve our services. You can fill out our feedback form or email us at <a href="mailto:vavtickets@gmail.com">vavtickets@gmail.com</a>.
          </p>
        </div>
        
        <p>
          We are excited to have you as part of our community. Together, let's create unforgettable experiences and celebrate the joy of live events. Thank you for choosing VavTickets as your trusted ticket booking platform.
        </p>
      </div>
    </div>
  );
}
