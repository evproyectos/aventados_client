import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import TimePicker from 'react-bootstrap-time-picker';
import useRides from '../../hooks/useRides';

const libraries = ['places'];

const EditRide = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        date: '',
        departureTime: '',
        availableSeats: '',
        driver: {
            brand: '',
            model: '',
            year: ''
        },
        errors: {}
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const { ride, fetchRideById, updateRide } = useRides();

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        fetchRideById(id, storedToken);
    }, [id]);

    useEffect(() => {
        if (ride) {
            const formattedDate = ride.departureTime ? new Date(ride.departureTime).toISOString().split('T')[0] : '';
            const formattedTime = ride.departureTime ? new Date(ride.departureTime).toISOString().split('T')[1].substring(0, 8) : '';

            setFormData({
                ...formData,
                origin: ride.origin,
                destination: ride.destination,
                fee: ride.fee,
                date: formattedDate,
                availableSeats: ride.availableSeats,
                departureTime: formattedTime,
                driver: {
                    brand: ride.driver.brand,
                    year: ride.driver.year,
                    model: ride.driver.model
                }
            });
        }
    }, [ride]);

    const handlePlaceSelect = (name) => {
        const place = name === 'origin' ? originRef.current.getPlace() : destinationRef.current.getPlace();
        if (place) {
            setFormData({
                ...formData,
                [name]: place.formatted_address,
                errors: {
                    ...formData.errors,
                    [name]: ''
                }
            });
        }
    };

    const handleTimeChange = (value) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);

        const isoDateTime = `${formData.date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;

        setFormData({
            ...formData,
            departureTime: value,
            errors: {
                ...formData.errors,
                departureTime: ''
            }
        });
    };

    const validateForm = () => {
        const errors = {};
        const today = new Date().toISOString().split('T')[0];
        if (!formData.origin) errors.origin = 'Origin is required';
        if (!formData.destination) errors.destination = 'Destination is required';
        if (!formData.date) {
            errors.date = 'Date is required';
        } else if (formData.date < today) {
            errors.date = 'Date cannot be in the past';
        }
        if (!formData.departureTime) errors.departureTime = 'Departure time is required';
        if (!formData.availableSeats) errors.availableSeats = 'Available seats are required';
        if (!formData.fee) errors.fee = 'Fee is required';
        if (!formData.driver.brand) errors.make = 'Make is required';
        if (!formData.driver.model) errors.model = 'Model is required';
        if (!formData.driver.year) errors.year = 'Year is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        const hours = Math.floor(formData.departureTime / 3600);
        const minutes = Math.floor((formData.departureTime % 3600) / 60);

        const isoDateTime = `${formData.date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;
        const dat = formData.date + "T" + formData.departureTime + "Z";
        
        const final = {
            availableSeats: formData.availableSeats,
            origin: formData.origin,
            destination: formData.destination,
            departureTime: dat,
            fee: formData.fee
        };

        if (Object.keys(errors).length === 0) {
            try {
                await updateRide(id, final);
                setShowModal(true);
                setModalMessage('Ride updated successfully!');
            } catch (error) {
                console.error('Error updating ride:', error);
            }
        } else {
            setFormData({ ...formData, errors });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/rides');
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDDAML7UQ9iJXobcmpVPwSZdRYZei0BYZc" libraries={libraries}>
            <Container className="d-flex justify-content-center mt-5">
                <div className="w-75">
                    <h2 className="text-center mb-4">Edit Ride</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="origin">
                                    <Form.Label>Origin</Form.Label>
                                    <Autocomplete
                                        onLoad={(autocomplete) => originRef.current = autocomplete}
                                        onPlaceChanged={() => handlePlaceSelect('origin')}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="origin"
                                            value={formData.origin}
                                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                            isInvalid={!!formData.errors.origin}
                                        />
                                    </Autocomplete>
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.origin}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="destination">
                                    <Form.Label>Destination</Form.Label>
                                    <Autocomplete
                                        onLoad={(autocomplete) => destinationRef.current = autocomplete}
                                        onPlaceChanged={() => handlePlaceSelect('destination')}
                                    >
                                        <Form.Control
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            isInvalid={!!formData.errors.destination}
                                        />
                                    </Autocomplete>
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.destination}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <div>
                                <Form.Control
                                    type='date'
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    isInvalid={!!formData.errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formData.errors.date}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="departureTime">
                                    <Form.Label>Departure Time</Form.Label>
                                    <TimePicker
                                        start="00:00"
                                        end="23:30"
                                        step={30}
                                        value={formData.departureTime}
                                        onChange={handleTimeChange}
                                        className={!!formData.errors.departureTime ? 'is-invalid' : ''}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.departureTime}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="availableSeats">
                                    <Form.Label>Seats</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="availableSeats"
                                        value={formData.availableSeats}
                                        onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                                        isInvalid={!!formData.errors.availableSeats}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.availableSeats}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="fee">
                                    <Form.Label>Fee</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fee"
                                        value={formData.fee}
                                        onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                                        isInvalid={!!formData.errors.fee}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.fee}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <h4 className="mt-4">Vehicle Details</h4>
                        <Row>
                            <Col>
                                <Form.Group controlId="make">
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="brand"
                                        value={formData.driver.brand}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            driver: { ...formData.driver, brand: e.target.value }
                                        })}
                                        isInvalid={!!formData.errors.make}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.make}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="model">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        value={formData.driver.model}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            driver: { ...formData.driver, model: e.target.value }
                                        })}
                                        isInvalid={!!formData.errors.model}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.model}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="year">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="year"
                                        value={formData.driver.year}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            driver: { ...formData.driver, year: e.target.value }
                                        })}
                                        isInvalid={!!formData.errors.year}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.year}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" className="mt-4">
                            Update Ride
                        </Button>
                        <Link to="/rides" className="btn btn-secondary mt-4 ml-2">Cancel</Link>
                    </Form>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={closeModal}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </LoadScript>
    );
};

export default EditRide;
