import React, { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { handleLogin, error, loading } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(credentials);
        navigate('/');
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <Row>
                <Col md={12}>
                    <div className="text-center mb-4">
                        <img src="logo.png" alt="Aventones" className="mb-3" /> {/* Replace with your logo */}
                        <h1>AVENTONES</h1>
                    </div>
                    <div className="text-center mb-3">
                        <Button variant="light" className="m-2">
                            <i className="fa-brands fa-google px-2"></i> Sign in with Google
                        </Button>
                    </div>
                    <div className="text-center mb-3">
                        <p>Or</p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="py-2" controlId="formEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="py-2" controlId="formPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 m-1" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                        {error && <div className="text-danger mt-2">{error}</div>}
                    </Form>
                    <div className="text-center mt-3">
                        <a href="/register">Not a user? Register Now</a>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
