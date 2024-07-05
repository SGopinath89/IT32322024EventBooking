import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const paypalRef = useRef();

  const fetchEvent = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:8080/events/${eventId}`);
      setEvent(result.data);
    } catch (error) {
      console.log('Fetch Event Error Occurred!', error);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleReservation = useCallback(async (order) => {
    try {
      await axios.post(`http://localhost:8080/events/${eventId}/reserve`, {
        userEmail: 'user@example.com', // replace with actual user email
        // Add other reservation details if needed
      });
      console.log('Reservation successful');
      // Redirect to Reservations page or show success message
    } catch (error) {
      console.log('Reservation Error Occurred!', error);
    }
  }, [eventId]);

  useEffect(() => {
    if (event) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: event.name,
                amount: {
                  currency_code: 'USD',
                  value: Number(event.price).toFixed(2), // Assuming price is in USD for demo purposes
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Order', order);
          handleReservation(order); // Handle successful payment here
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
          // Handle error here
        },
      }).render(paypalRef.current);
    }
  }, [event, handleReservation]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>
      <div className="card bg-muted rounded p-3">
        <div className="card-body">
          <h5 className="card-title">{event.name}</h5>
          <p className="card-text">Venue: {event.venue}</p>
          <p className="card-text">Date: {event.date}</p>
          <p className="card-text">Price: Rs.{Number(event.price).toFixed(2)}</p>
          <div ref={paypalRef}></div>
        </div>
      </div>
    </div>
  );
}
