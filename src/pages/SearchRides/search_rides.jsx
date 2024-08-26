import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import useRides from '../../hooks/useRides';

const SearchRides = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('destination');
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const { bookRide } = useRides();

  useEffect(() => {
    const fetchRides = async () => {
      const query = `
        query Rides {
          rides(destination: "${destination}") {
            id
            origin
            destination
            departureTime
            availableSeats
            fee
          }
        }
      `;
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      // Filter rides with more than 0 available seats
      const filteredRides = data.data.rides.filter(ride => ride.availableSeats > 0);

      setRides(filteredRides);
      setLoading(false);
    };

    fetchRides();
  }, [destination]);

  const handleRequestRideClick = (ride) => {
    setSelectedRide(ride);
    setShowModal(true);
  };

  const handleConfirmRequest = () => {
    bookRide(selectedRide.id);
    setShowModal(false);
  };

  const handleCancelRequest = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      {rides.length > 0 ? (
        rides.map((ride) => (
          <Card key={ride.id} className="mb-3">
            <Card.Body>
              <Card.Title>{ride.origin} to {ride.destination}</Card.Title>
              <Card.Text>
                Departure: {new Date(ride.departureTime).toLocaleString()}<br />
                Available Seats: {ride.availableSeats}<br />
                Fee: ${ride.fee}
              </Card.Text>
              <Button variant="primary" onClick={() => handleRequestRideClick(ride)}>
                Request Ride
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No rides found for "{destination}"</p>
      )}

      <Modal show={showModal} onHide={handleCancelRequest}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Ride Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to request this ride from {selectedRide?.origin} to {selectedRide?.destination} on {selectedRide && new Date(selectedRide.departureTime).toLocaleString()}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelRequest}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmRequest}>
            Confirm Request
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SearchRides;
