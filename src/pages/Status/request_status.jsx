import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import useRides from '../../hooks/useRides';
import useAuth from '../../hooks/useAuth';

const RequestStatus = () => {
    const {
        rides,
        updateBooking,
        bookings = [], // Ensure bookings is at least an empty array
        loading,
        error,
        fetchBookingsByDriver,
        fetchRidesByPassenger
    } = useRides();
    const { user, fetchUserInfo } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [actionType, setActionType] = useState('');

    useEffect(() => {
        fetchUserInfo();
        console.log(user);
    }, []);

    useEffect(() => {
        if (user) {
            fetchRidesByPassenger(user._id);
        }
    }, [user]);

    const onClick = () => {
        console.log(bookings);
    }

    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error.message}</p>;
    }

    const currentBookings = bookings?.filter(booking => booking.status === 'pending') || [];

    return (
        <div className="container mt-5">
            <h3 className="text-center">Requests</h3>
            {bookings.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Ride</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking?._id}>
                            <td>
                                <img 
                                src="https://via.placeholder.com/30" 
                                alt="User Icon" 
                                className="rounded-circle mr-2"
                                />
                                {booking?.passenger?.name} {booking?.passenger?.lastName}
                            </td>
                            <td>{booking?.ride?.origin} - {booking?.ride?.destination}</td>
                            <td>
                                {booking?.status}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No pending requests available</p>
            )}

           
        </div>
    );
};

export default RequestStatus;
