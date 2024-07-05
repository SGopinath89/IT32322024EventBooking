import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Reservations() {
  const [reservedEvents, setReservedEvents] = useState([]);

  useEffect(() => {
    fetchReservedEvents();
  }, []);

  const fetchReservedEvents = async () => {
    try {
      const result = await axios.get('http://localhost:8080/reservations');
      setReservedEvents(result.data);
    } catch (error) {
      console.log('Fetch Reserved Events Error Occurred!', error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Reserved Events</h2>
      <Row>
        {reservedEvents.map((reservation) => (
          <Col key={reservation.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{reservation.event.name}</Card.Title>
                <Card.Text>Date: {reservation.event.date}</Card.Text>
                <Card.Text>Time: {reservation.event.time}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
