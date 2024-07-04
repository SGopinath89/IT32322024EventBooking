import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import header from "../assest/slide1.jpg";
import UserNavbar from './UserNavbar';
import "../css/userstyle.css"; // Assuming you have your styles here

export default function UserReservation() {
  const [rows, setRows] = useState(10); // Default number of rows
  const [columns, setColumns] = useState(9); // Default number of columns
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { id } = useParams();
  const uid = localStorage.getItem('id');
  
  const navigate = useNavigate();

  // Define the booked seats
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Fetch event details to get rows and columns
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/event/${id}`);
        const event = await response.json();
        setRows(event.rows);
        setColumns(event.cols);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    // Fetch booked seats from the server
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

  // Create a two-dimensional array for the seats
  const seats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => rowIndex * columns + columnIndex + 1)
  );

  // Handle seat click
  const handleSeatClick = (seatNumber) => {
    if (!bookedSeats.includes(seatNumber)) {
      setSelectedSeat(seatNumber);
      console.log(uid);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (selectedSeat) {
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
          navigate('/'); // Adjust the navigation as needed
        } else {
          alert('Booking failed.');
        }
      } catch (error) {
        console.error('Error during booking:', error);
      }
    } else {
      alert('Please select a seat.');
    }
  };

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
      <button className='reservation-booking-btn' onClick={handleBooking}>
        Book Seat No: {selectedSeat ? selectedSeat : ''}
      </button>
    </div>
  );
}
