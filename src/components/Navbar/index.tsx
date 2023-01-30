
import "./style.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {

  return (
    <Navbar bg="light" expand="lg" className="navContainer">
      <Container fluid className="navItens">
        <Navbar.Brand href="/" className="itemLogo">TRACTIAN</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/users" className="item">USERS</Nav.Link>
            <Nav.Link href="/assets" className="item">ASSETS</Nav.Link>
            <Nav.Link href="/units" className="item">UNITS</Nav.Link>
            <Nav.Link href="/companies" className="item">COMPANIES</Nav.Link>
            <Nav.Link href="/workorders" className="item">WORKORDERS</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default NavBar;