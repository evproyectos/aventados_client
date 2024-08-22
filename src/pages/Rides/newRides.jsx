import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import TimePicker from 'react-bootstrap-time-picker';
import useAuth from '../../hooks/useAuth';
import useRides from '../../hooks/useRides';

const libraries = ['places'];

const NewRide = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        date: '',
        departureTime: '',
        availableSeats: '',
        fee: '',
        make: '',
        model: '',
        year: '',
        errors: {}
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const { createRide } = useRides();
    const { user, fetchUserInfo } = useAuth();

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                make: user.brand || '',
                model: user.model || '',
                year: user.year || '',
            });
        }
    }, [user]);

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
        if (!formData.make) errors.make = 'Make is required';
        if (!formData.model) errors.model = 'Model is required';
        if (!formData.year) errors.year = 'Year is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        const hours = Math.floor(formData.departureTime / 3600);
        const minutes = Math.floor((formData.departureTime % 3600) / 60);
        
        const isoDateTime = `${formData.date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;

        const final = {
            "availableSeats": formData.availableSeats,
            "origin": formData.origin,
            "destination": formData.destination,
            "departureTime": isoDateTime,
            "fee": formData.fee
        };

        if (Object.keys(errors).length === 0) {
            try {
                await createRide(final);
                setShowModal(true);
                setModalMessage('Ride created successfully!');
            } catch (error) {
                console.error('Error creating ride:', error);
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
                    <h2 className="text-center mb-4">New Ride</h2>
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
                                        name="make" 
                                        value={formData.make} 
                                        readOnly
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
                                        value={formData.model} 
                                        readOnly
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
                                        value={formData.year} 
                                        readOnly
                                        isInvalid={!!formData.errors.year}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formData.errors.year}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="link" className="mb-3">
                                <Link to="/rides">Cancel</Link>
                            </Button>
                            <Button variant="primary" type="submit">Create</Button>
                        </div>
                    </Form>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </LoadScript>
    );
};

export default NewRide;
