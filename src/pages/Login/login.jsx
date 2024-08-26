import React, { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom'; 
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { auth, googleProvider } from "../../services/firebaseInit";
import { signInWithPopup } from 'firebase/auth';




const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { handleLogin, error, loading } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await result.user.getIdToken(); // Obtener el token JWT

            

            const response = await fetch('http://localhost:3001/user/verify-token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
              });

              if (!response.ok) {
                throw new Error('Error en la autenticación');
              }
          
              const data = await response.json();
              const customToken = data.userId; // Suponiendo que tu API devuelve un campo `token`
          
              // Aquí es donde almacenas el token en localStorage
              localStorage.setItem('userId', customToken);
              navigate('/verify-pin');

            
        } catch (err) {
          console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(credentials);
        navigate('/verify-pin');
    };


    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <Row>
                <Col md={12}>
                    <div className="text-center mb-4">
                        <h1>AVENTADOS</h1>
                    </div>
                    <div className="text-center mb-3">
                        <Button onClick={handleGoogleSignIn} variant="light" className="m-2">
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
