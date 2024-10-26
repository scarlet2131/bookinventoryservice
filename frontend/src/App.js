import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksList from './components/BooksList';
import AddBookForm from './components/AddBookForm';
import FilterModal from './components/FilterModal';
import ExportButton from './components/ExportButton';
import { Container, Navbar, Modal, Row, Col, Button, FormControl } from 'react-bootstrap';
import './App.css'; // Custom CSS for styling adjustments

const REACT_APP_API_URL = "http://localhost:8080/api";

const App = () => {
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({});
    const [showAddBook, setShowAddBook] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false); // New state for Filter modal
    const [searchText, setSearchText] = useState('');

    // Fetch books based on filters or search criteria
    const fetchBooks = async (filterParams = {}) => {
        // Filter out empty string parameters
        const cleanedParams = Object.fromEntries(
            Object.entries(filterParams).filter(([key, value]) => value !== '')
        );

        try {
            console.log("fetchBooks called with:", cleanedParams); // Debugging line
            const response = await axios.get(`${REACT_APP_API_URL}/books/filter`, { params: cleanedParams });
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error.response || error.message);
            alert('Failed to fetch books');
        }
    };




    // Open and close Add Book Modal
    const handleShowAddBook = () => setShowAddBook(true);
    const handleCloseAddBook = () => setShowAddBook(false);

    // Open and close Filter Modal
    const handleShowFilterModal = () => setShowFilterModal(true);
    const handleCloseFilterModal = () => setShowFilterModal(false);

    // Refresh book list when a new book is added
    const handleBookAdded = () => {
        fetchBooks(filters);
        setShowAddBook(false); // Close modal after adding
    };

    // Handle search input
    const handleSearch = (e) => {
        const updatedSearchText = e.target.value;
        setSearchText(updatedSearchText);

        const updatedFilters = { ...filters, title: updatedSearchText }; // Only update title in filters
        setFilters(updatedFilters); // Update the filters state with the new search text

        fetchBooks(updatedFilters); // Fetch books based on the updated filters immediately
    };


    // Apply filters from modal
    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        fetchBooks(newFilters);
        setShowFilterModal(false); // Close filter modal after applying
    };

    // Fetch all books on initial load
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
                <Container>
                    <Navbar.Brand className="mx-auto">Book Inventory Management</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row className="justify-content-between align-items-center mb-4">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                        <FormControl
                            type="text"
                            placeholder="Search by Title"
                            className="mr-2"
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Button variant="secondary" onClick={handleShowFilterModal}>Filter</Button>
                    </Col>
                    <Col xs={12} md={3} className="text-right">
                        <Button variant="info" onClick={handleShowAddBook} className="mr-2">Add Book</Button>
                        {/* Export button with filters passed as props */}
                        {/*<ExportButton filters={filters} />*/}
                    </Col>
                </Row>
                <BooksList books={books} />
            </Container>

            {/* Add Book Modal */}
            <Modal show={showAddBook} onHide={handleCloseAddBook}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBookForm onBookAdded={handleBookAdded} />
                </Modal.Body>
            </Modal>

            {/* Filter Modal */}
            <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Books</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilterModal onApply={applyFilters} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default App;
