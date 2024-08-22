import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import useRides from '../../hooks/useRides';
import useAuth from '../../hooks/useAuth';

const Bookings = () => {
    const {
        rides,
        updateBooking,
        bookings = [], // Ensure bookings is at least an empty array
        loading,
        error,
        fetchBookingsByDriver,
    } = useRides();
    const { user, fetchUserInfo } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [actionType, setActionType] = useState('');

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (user) {
            fetchBookingsByDriver(user._id);
        }
    }, [user]);

    const handleAccept = (bookingId) => {
        setSelectedBookingId(bookingId);
        setActionType('accept');
        setShowModal(true);
    };

    const handleReject = (bookingId) => {
        setSelectedBookingId(bookingId);
        setActionType('reject');
        setShowModal(true);
    };

    const confirmAction = async () => {
        if (actionType === 'accept') {
            await updateBooking(selectedBookingId, { action: 'accept' });
        } else if (actionType === 'reject') {
            await updateBooking(selectedBookingId, { action: 'reject' });
        }
        setShowModal(false);
        if (user) {
            fetchBookingsByDriver(user._id); // Refetch bookings after an action
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading bookings: {error.message}</p>;
    }

    const pendingBookings = bookings?.filter(booking => booking.status === 'pending') || [];

    return (
        <div className="container mt-5">
            <h3 className="text-center">Bookings</h3>
            {pendingBookings.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Ride</th>
                            <th>Accept / Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingBookings.map((booking) => (
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
                                <a 
                                    href="#" 
                                    className="text-primary mr-3" 
                                    onClick={() => handleAccept(booking?._id)}
                                >
                                    Accept  |  
                                </a>
                                <a 
                                    href="#" 
                                    className="text-primary" 
                                    onClick={() => handleReject(booking?._id)}
                                >
                                    |  Reject
                                </a>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-center">No pending bookings available</p>
            )}

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {actionType === 'accept' ? 'Acceptance' : 'Rejection'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {actionType} this booking?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmAction}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Bookings;
