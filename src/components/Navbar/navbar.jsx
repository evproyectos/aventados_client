import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavB = () => {
  const { handleLogout, user, fetchUserInfo } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const logoutHandler = () => {
    handleLogout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?destination=${searchTerm}`);
    }
  };

  return (
    <Navbar bg='light' expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            {user?.role === 'driver' && (
              <>
                <Nav.Link href="/rides">Rides</Nav.Link>
                <Nav.Link href="/bookings">Bookings</Nav.Link>
              </>
            )}
            {user?.role === 'client' && <Nav.Link href="/status">Request Status</Nav.Link>}
          </Nav>

          {user?.role === 'client' && (
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>

          )}
          
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <i className="fas fa-user"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logoutHandler} href="/login">Logout</Dropdown.Item>
              <Dropdown.Item href="/profile">Settings</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavB;