import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from "../../services/firebaseInit";
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

const Registration = () => {
    const navigate = useNavigate();

    const { handleRegister, error, loading } = useAuth();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        uid: '1',
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        idNumber: '',
        phoneNumber: '',
        birthDate: '',
        role: 'client'
    });

    const [disabledFields, setDisabledFields] = useState({
        name: false,
        lastName: false,
        email: false
    });

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          navigate('/login');
      }
    }, [navigate]);

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            

            console.log(user);

            // Actualizar el formulario con los datos obtenidos de Google
            setFormData({
                ...formData,
                name: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
                email: user.email || '',
                uid: user.uid || '',
            });

            // Deshabilitar los campos llenados con Google
            setDisabledFields({
                name: !!user.displayName,
                lastName: !!user.displayName,
                email: !!user.email
            });

            console.log()

        } catch (err) {
            console.log(err);
            setFormErrors({ general: err.message });
        }
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

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {


        

            await handleRegister(formData);

            

            setShowSuccessMessage(true);
            navigate('/login');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <img src="logo.png" alt="Aventones Logo" style={{ width: '100px' }} />
                        <h2>User Registration</h2>
                    </div>
                    {showSuccessMessage && (
                        <div className="alert alert-success" role="alert">
                            Registration successful!
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
                                    disabled={disabledFields.name}
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
                                    disabled={disabledFields.lastName}
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
                                disabled={disabledFields.email}
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
                        <div className="text-center mb-3">
                        <Button type="submit" className="mb-2">
                            Sign up
                        </Button>
                        </div>
                        <div className="text-center mb-3">
                        <Button onClick={handleGoogleSignUp} variant="light" className="m-2">
                            <i className="fa-brands fa-google px-2"></i> Sign up with Google
                        </Button>
                    </div>
                        <Row className='mb-3'>
                            <p as={Col}>Already a user? <a href="/login">Login here</a></p>
                            <p as={Col}>Register as driver? <a href="/registerdriver">Click here</a></p>
                        </Row>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
