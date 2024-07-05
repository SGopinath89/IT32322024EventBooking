import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{ height: '80px' }}>
        <Container fluid>
          <Navbar.Brand>
            <img
              src={logo}
              alt="Logo"
              height="70"
              width="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="me-auto h4">
            <Nav.Link as={Link} to="/events">Events</Nav.Link>
            <Nav.Link as={Link} to="/reservations">Reservations</Nav.Link>
          </Nav>
          <Nav className="h5">
            <Nav.Link as={Link} to="/myaccount">MyAccount</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNav;
