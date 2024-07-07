import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import useRides from '../../hooks/useRides';
import { useEffect } from 'react';
import { useState } from 'react';

const rides_v2 = [
  { from: 'Quesada', to: 'Alajuela', seats: 2, car: 'Nissan Pathfinder 2015', fee: '$5' },
  { from: 'Quesada', to: 'Naranjo', seats: 1, car: 'Toyota Corolla 2020', fee: '$10' },
  { from: 'Aguas Zarcas', to: 'Naranjo', seats: 1, car: 'Ford Festiva 1990', fee: '--' },
];

const Rides = () => {
 
  const {
    rides,
    loading,
    error,
    fetchRidesByDriver,
    deleteRide
  } = useRides();
  const {user, fetchUserInfo } = useAuth();
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [rideToDelete, setRideToDelete] = useState(null); // State to hold ride being deleted
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRidesByDriver(user._id);
    }
  }, [user]);

  // Function to handle opening modal and set ride to delete
  const handleDeleteModal = (ride) => {
    setRideToDelete(ride);
    setShowModal(true);
  };

  // Function to handle deletion after confirmation
  const handleDelete = async (id) => {
    // Perform deletion logic here
    console.log('Deleting ride:', rideToDelete);
    deleteRide(rideToDelete._id);
    setShowSuccessMessage(true);

    setShowModal(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My rides</h2>
      <Button variant="primary" className="mb-3">
        <Link to="/new-ride" className="text-white" style={{ textDecoration: 'none' }}>New Ride</Link>
      </Button>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
            Ride Deleted
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Seats</th>
            <th>Car</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, index) => (
            <tr key={index}>
              <td><Link to="#">{ride.origin}</Link></td>
              <td>{ride.destination}</td>
              <td>{ride.availableSeats}</td>
              <td>{ride.driver.brand } {ride.driver.model}</td>
              <td>{ride.fee}</td>
              <td>
              <Link to={`/edit-ride/${ride._id}`} className="mr-2">Edit</Link> |{' '}
                <Link to="#" onClick={() => handleDeleteModal(ride)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this ride?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Rides;