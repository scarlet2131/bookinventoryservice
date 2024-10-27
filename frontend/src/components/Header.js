// Header.js
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { FaBook } from 'react-icons/fa';  // Import the book icon

import '../App.css';

const Header = () => {
    return (
        <header className="header">
            <Navbar expand="lg" className="custom-navbar">
                <Container className="header-container">

                    {/* Logo on the Left Side */}
                    <Navbar.Brand href="https://www.secondbind.com" target="_blank" className="logo-link">
                        <img
                            src={logo}
                            alt="Second Bind Logo"
                            className="company-logo"
                        />
                    </Navbar.Brand>

                    {/* Centered Title */}
                    <h1 className="header-title">                        <FaBook style={{ marginRight: '0.5rem' }} />  {/* Book icon */}
                        Book Inventory Management</h1>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
