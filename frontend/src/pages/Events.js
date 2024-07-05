import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Events({ filters }) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const result = await axios.get('http://localhost:8080/events');
      setEvents(result.data);
    } catch (error) {
      console.log('Fetch Error Occurred!', error);
    }
  };

  const filterEvents = () => {
    let filteredEvents = [...events];

    if (filters.checkInDate) {
      filteredEvents = filteredEvents.filter(event => event.date >= filters.checkInDate);
    }

    if (filters.checkOutDate) {
      filteredEvents = filteredEvents.filter(event => event.date <= filters.checkOutDate);
    }

    if (filters.venue) {
      filteredEvents = filteredEvents.filter(event => event.venue === filters.venue);
    }

    return filteredEvents;
  };

  const handleReserveClick = (eventId) => {
    navigate(`/checkout/${eventId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Events</h2>
      <style>{`
        .card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }
      `}</style>
      <div className="row">
        {filterEvents().map((event, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card bg-muted rounded p-3">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Venue: {event.venue}</p>
                <p className="card-text">Date: {event.date}</p>
                <p className="card-text">Price: Rs.{Number(event.price).toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => handleReserveClick(event.id)}>Reserve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
