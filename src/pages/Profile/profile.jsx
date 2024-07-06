import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const {user, fetchUserInfo, handleUpdateUser, error, loading } = useAuth();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        fetchUserInfo();
      }, []);

    
      useEffect(() => {
        if (user) {
            const formattedDate = user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '';
            if(user === 'client') {
                setFormData({
                    ...formData,
                    name: user.name || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    password: '',
                    repeatPassword: '',
                    idNumber: user.idNumber || '',
                    phoneNumber: user.phoneNumber || '',
                    birthDate: formattedDate,
                    role: user.role || ''
                });
            }else {
                setFormData({
                    ...formData,
                    name: user.name || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    password: '',
                    repeatPassword: '',
                    idNumber: user.idNumber || '',
                    phoneNumber: user.phoneNumber || '',
                    birthDate: formattedDate,
                    role: user.role || '',
                    plate: user.plate||'',
                    brand: user.brand || '',
                    model: user.model || '',
                    year: user.year || ''
                });
            }
            
        }
    }, [user]);
    

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        idNumber: '',
        phoneNumber: '',
        birthDate: '',
        role: '',
        plate: '',
        brand: '',
        model: '',
        year: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = "First Name is required";
        if (!formData.lastName) errors.lastName = "Last Name is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.password) errors.password = "Password is required";
        if (formData.password !== formData.repeatPassword) {
            errors.repeatPassword = "Passwords do not match";
        }
        if (!formData.idNumber) errors.idNumber = "ID Number is required";
        if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";
        if (!formData.birthDate) errors.birthDate = "Birth Date is required";
        if (!formData.plate) errors.plate = "Car Plate is required";
        if (!formData.brand) errors.brand = "Car brand is required";
        if (!formData.model) errors.model = "Car model is required";
        if (!formData.year) errors.year = "Car year is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            await handleUpdateUser(formData);
            setShowSuccessMessage(true);
        } 
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <img src="logo.png" alt="Aventones Logo" style={{ width: '100px' }} />
                        <h2>Profile</h2>
                    </div>
                    {showSuccessMessage && (
                        <div className="alert alert-success" role="alert">
                            Update successful!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId="name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder=""
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="repeatPassword">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder=""
                                    value={formData.repeatPassword}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.repeatPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.repeatPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group as={Col} className="mb-3" controlId="birthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder="/ /"
                                value={formData.birthDate}
                                onChange={handleChange}
                                isInvalid={!!formErrors.birthDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.birthDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="idNumber">
                                <Form.Label>ID Number</Form.Label>
                                <Form.Control
                                    placeholder="ID Number"
                                    value={formData.idNumber}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.idNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.idNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.phoneNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {formData.role === 'driver' && (
                            <div>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="plate">
                                        <Form.Label>Plate</Form.Label>
                                        <Form.Control
                                            placeholder="Plate"
                                            value={formData.plate}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.plate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.plate}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="brand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            value={formData.brand}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.brand}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.brand}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="model">
                                        <Form.Label>Model</Form.Label>
                                        <Form.Control
                                            placeholder="Model"
                                            value={formData.model}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.model}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.model}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="year">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control
                                            value={formData.year}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.year}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.year}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </div>
                        )}



                        <Button onSubmit={handleSubmit} type="submit" className="mb-2">
                            Update User
                        </Button>
                        <Row className='mb-3'>
                            <p as={Col}>Already a user? <a href="/login">Login here</a></p>
                            <p as={Col}>Register as driver? <a href="/registerdriver">Click here</a></p>
                        </Row>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
