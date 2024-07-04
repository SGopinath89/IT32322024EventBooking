import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/userstyle.css";
import bookingheader from "../assest/slide3.jpg";
import UserNavbar from './UserNavbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function UserBooking() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const rowsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    rowsRef.current.forEach(row => {
      if (row) {
        observer.observe(row);
      }
    });

    return () => {
      if (rowsRef.current) {
        rowsRef.current.forEach(row => observer.unobserve(row));
      }
    };
  }, [id]);

  const addToRefs = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/event/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const handleEvent = (id) => {
    navigate(`/reservation/${id}`);
  }

  return (
    <div className='booking'>
      <img src={bookingheader} className='booking-header' alt="Booking Header" />
      <UserNavbar />
      <h1 className='booking-heading'>{event.ename}</h1><br />
      <div className='booking-grayback ' >
        <i className="bi bi-calendar-week fs-1 px-5 orange-ico"></i>
        <div className='booking-eventdetails'>
          <label>Date</label>{event.date} <br />
          <label>Time</label>{Number(event.time).toFixed(2)}
        </div>
      </div>

      <div className='booking-grayback ' >
        <i className="bi bi-geo-alt-fill fs-1 px-5 orange-ico"></i>
        <div className='booking-eventdetails'>
          <label>Venue</label>{event.venue} <br />
          <label>Amount</label>LKR. {Number(event.price).toFixed(2)}
        </div>
      </div>

      <button className='booking-buyticket-btn' onClick={() => handleEvent(id)}>BUY TICKET <i className="bi bi-arrow-right-circle-fill fs-3" style={{ color: "#F2583E" }}></i></button>

      <div className='booking-about ' >
        <h5>ABOUT</h5>
        <p>{event.description}</p>
      </div>
    </div>
  );
}
