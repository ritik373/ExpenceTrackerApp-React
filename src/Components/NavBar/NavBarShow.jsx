import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarShow(props) {
    return (
    

        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Expence Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Contact US</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
            
   
    );
}

export default NavBarShow;