import React, { useState } from 'react';
import { Navbar, Container, Button, Form, FormControl, Dropdown } from 'react-bootstrap';

const Header = ({ onAddBook, onExport, onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Container>
                <Navbar.Brand>Book Inventory Management</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
