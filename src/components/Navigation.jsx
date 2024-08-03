// src/components/Navigation.js

import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

function Navigation() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar>
                    <Nav>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    );
}

export default Navigation;
