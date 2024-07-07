import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import header from "../assest/slide1.jpg";
import UserNavbar from './UserNavbar';
import "../css/userstyle.css"; 
import PaymentCheckout from './PaymentCheckout';

export default function UserReservation() {
  const [rows, setRows] = useState(10); 
  const [columns, setColumns] = useState(9); 
  const [price, setPrice] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEvent, setButtonPopupEvent] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { id } = useParams();
  const uid = localStorage.getItem('id');
  
  const navigate = useNavigate();

  
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/event/${id}`);
        const event = await response.json();
        
        setRows(event.rows);
        setColumns(event.cols);
        setPrice(event.price);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch(`http://localhost:8080/booking/check/${id}`);
        const data = await response.json();
        setBookedSeats(data);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchEventDetails();
    fetchBookedSeats();
  }, [id]);

  
  const seats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => rowIndex * columns + columnIndex + 1)
  );

  
  const handleSeatClick = (seatNumber) => {
    if (!bookedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber);
      console.log(uid);
    }
  };

  const handlePayment = () => {
     setButtonPopup(true);
  }

  
  const handleBooking = async () => {
    if (selectedSeat ) {
      if (paymentSuccess){
        try {
          const booking = {
            user: { id: uid },
            event: { eid: id },
            seatno: selectedSeat
          };

          const response = await fetch('http://localhost:8080/booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
          });

          if (response.ok) {
            alert('Booking successful!');
            navigate('/'); 
          } else {
            alert('Booking failed.');
          }
        } catch (error) {
          console.error('Error during booking:', error);
        }
      }else{
        alert('Please Complete the payment Before Booking.');
      }
    } else {
      alert('Please select a seat.');
    }
  };
  const isLoggedIn = !!localStorage.getItem('username');

  if (!isLoggedIn) {
      
      return (
          <div style={styles.restrict}>
              <h2><b><i class="bi bi-exclamation-octagon"></i> Restriction</b></h2>
              <h3>Please log in to access this page - <a href='/login'>Click Here To Visit Login...</a> </h3>
          </div>
      );
  }
  return (
    <div className='reservation'>
      <img src={header} className='reservation-header' alt="Header" />
      <UserNavbar />

      <h1>Reserve Your Seat</h1>
      <div className='reservation-seats'>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className='reservation-row'>
            {row.map(seatNumber => (
              <div
                key={seatNumber}
                className={`reservation-seat ${bookedSeats.includes(seatNumber) ? 'booked' : ''} ${selectedSeat === seatNumber ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className='reservation-booking-btn' onClick={handlePayment} >Pay Now</button>
      <button className={`reservation-booking-btn ${paymentSuccess ? 'payment' : 'nonpayment'}`} onClick={handleBooking}>
        Book Seat No: {selectedSeat ? selectedSeat : ''}
      </button>
      

      <PaymentCheckout trigger={buttonPopup} setTrigger={setButtonPopup}  eid={id} price={price} setSuccess={setPaymentSuccess}/>
    </div>
  );
}

const styles={
  restrict:{
  padding: '20px 10px',
  width: '90%',
  marginLeft: '5%',
  marginTop: '15%',
  backgroundColor: '#fff',
  height:'20vh',
  }
}
