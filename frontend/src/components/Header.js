// Header.js

// Importing necessary libraries and assets
import React from 'react';
import { Container, Navbar } from 'react-bootstrap'; // Bootstrap components for layout
import logo from '../assets/logo.svg'; // Importing the company logo
import { FaBook } from 'react-icons/fa';  // Importing a book icon for decoration

import '../App.css'; // Custom CSS for styling

// Header component
const Header = () => {
    return (
        <header className="header">
            {/* Navbar component from Bootstrap for the main header structure */}
            <Navbar expand="lg" className="custom-navbar">
                <Container className="header-container">

                    {/* Logo on the left side with a link to the main website */}
                    <Navbar.Brand href="https://www.secondbind.com" target="_blank" className="logo-link">
                        <img
                            src={logo} // Displaying the logo image
                            alt="Second Bind Logo" // Alternative text for accessibility
                            className="company-logo" // CSS class for logo styling
                        />
                    </Navbar.Brand>

                    {/* Centered title with a book icon */}
                    <h1 className="header-title">
                        <FaBook style={{ marginRight: '0.5rem' }} />  {/* Book icon with a small margin */}
                        Book Inventory Management
                    </h1>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header; // Exporting the Header component for use in other files
