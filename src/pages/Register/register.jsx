import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {
    const { handleRegister, error, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        idNumber: '',
        phoneNumber: '',
        birthDate: '',
        role: 'client'
      });

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
          ...formData,
          [id]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the formData to your server
        console.log(formData);
        e.preventDefault();
        await handleRegister(formData);
        navigate('/');
      };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img src="logo.png" alt="Aventones Logo" style={{ width: '100px' }} />
            <h2>User Registration</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className='mb-3'>
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder=""
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="repeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder=""
                />
              </Form.Group>
            </Row>

            
            <Form.Group as={Col} className="mb-3" controlId="birthDate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                placeholder="/ /"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="idNumber">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                placeholder="ID Number"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </Form.Group>
              <Form.Group as={Col} controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Button type="submit" className="mb-2">
              Sign up
            </Button>
            <Row className='mb-3'>
              <p as={Col}>Already a user? <a href="/login">Login here</a></p>
              <p as={Col}>Register as driver? <a href="/register-driver">Click here</a></p>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
