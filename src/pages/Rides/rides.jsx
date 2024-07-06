import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';

const rides = [
  { from: 'Quesada', to: 'Alajuela', seats: 2, car: 'Nissan Pathfinder 2015', fee: '$5' },
  { from: 'Quesada', to: 'Naranjo', seats: 1, car: 'Toyota Corolla 2020', fee: '$10' },
  { from: 'Aguas Zarcas', to: 'Naranjo', seats: 1, car: 'Ford Festiva 1990', fee: '--' },
];

const Rides = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My rides</h2>
      <Button variant="primary" className="mb-3">
        <Link to="/new-ride" className="text-white" style={{ textDecoration: 'none' }}>New Ride</Link>
      </Button>
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
              <td><Link to="#">{ride.from}</Link></td>
              <td>{ride.to}</td>
              <td>{ride.seats}</td>
              <td>{ride.car}</td>
              <td>{ride.fee}</td>
              <td>
                <Link to="#" className="mr-2">Edit</Link> | <Link to="#">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Rides;
