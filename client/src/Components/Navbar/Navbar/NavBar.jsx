import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Wiki-games</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <LinkContainer to='/home/games'>
                        <Nav.Link>Jeux</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/auth'>
                        <Nav.Link>Connexion</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;