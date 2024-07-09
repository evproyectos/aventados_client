import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TimePicker from 'react-bootstrap-time-picker';
import useRides from '../../hooks/useRides';

const EditRide = () => {
    const { id } = useParams(); // Assuming you're using React Router to get the ride ID
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        date: '',
        departureTime: '',
        availableSeats: '',
        driver: {
            brand:'',
            model: '',
            year: ''},
        errors: {}
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const { ride, fetchRideById ,updateRide } = useRides();

    useEffect(() => {
            fetchRideById(id);
        
    }, []);
    
    useEffect(() => {
        if(ride){
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData({
                    ...formData,
                    date: [...formData.date, value]
                });
            } else {
                setFormData({
                    ...formData,
                    date: formData.date.filter(day => day !== value)
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
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
        
        // Constructing the ISO 8601 time format
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
        
        // Constructing the ISO 8601 time format
        const isoDateTime = `${formData.date}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`;
        const dat = formData.date + "T" + formData.departureTime + "Z";
        console.log(dat);
        const final = {
            
            availableSeats: formData.availableSeats,
            origin: formData.origin,
            destination: formData.destination,
            departureTime: dat,
            fee: formData.fee
        };

        if (Object.keys(errors).length === 0) {
            console.log(final);
            try {
                await updateRide(id,final);
                setShowModal(true);
                setModalMessage('Ride updated successfully!');
            } catch (error) {
                console.error('Error updating ride:', error);
            }
        } else {
            setFormData({ ...formData, errors });
        } 
       console.log(formData);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/rides');
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <div className="w-75">
                <h2 className="text-center mb-4">Edit Ride</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="origin">
                                <Form.Label>Origin</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="origin" 
                                    value={formData.origin} 
                                    onChange={handleChange} 
                                    isInvalid={!!formData.errors.origin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formData.errors.origin}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="destination">
                                <Form.Label>Destination</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="destination" 
                                    value={formData.destination} 
                                    onChange={handleChange} 
                                    isInvalid={!!formData.errors.destination}
                                />
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
                                onChange={handleChange}
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
                                    onChange={handleChange} 
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
                                    onChange={handleChange}
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
                                    value={formData.driver.brand} 
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
                                    value={formData.driver.model} 
                                    onChange={handleChange} 
                                    isInvalid={!!formData.errors.model}
                                    readOnly
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
                        <Button variant="primary" type="submit">Update</Button>
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
    );
};

export default EditRide;
