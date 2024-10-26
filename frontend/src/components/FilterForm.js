import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const REACT_APP_API_URL = "http://localhost:8080/api"; // Base URL constant

const FilterForm = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        title: '', author: '', genreId: '', publicationDate: ''
    });
    const [genres, setGenres] = useState([]); // State to store genres for dropdown
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    // Fetch genres for the dropdown
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/genres`);
                setGenres(response.data);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };
        fetchGenres();
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters); // Pass filters to parent component
        setShowModal(false); // Close the modal after applying filters
    };

    return (
        <>
            {/* Button to open filter modal */}
            <Button variant="secondary" onClick={() => setShowModal(true)} className="mt-3">
                Filter
            </Button>

            {/* Filter Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Books</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={filters.title}
                                onChange={handleChange}
                                placeholder="Enter title to filter"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={filters.author}
                                onChange={handleChange}
                                placeholder="Enter author to filter"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                as="select"
                                name="genreId"
                                value={filters.genreId}
                                onChange={handleChange}
                            >
                                <option value="">All Genres</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Publication Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="publicationDate"
                                value={filters.publicationDate}
                                onChange={handleChange}
                                placeholder="Select a publication date"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Apply Filters
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FilterForm;
