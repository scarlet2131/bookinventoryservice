import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

const REACT_APP_API_URL = "http://localhost:8080/api";

const AddBookForm = ({ onBookAdded }) => {
    const [formData, setFormData] = useState({
        title: '', author: '', genreId: '', publicationDate: '', isbn: ''
    });
    const [genres, setGenres] = useState([]); // State to store genres
    const [newGenre, setNewGenre] = useState(''); // State for the new genre input
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null); // For main form messages
    const [genreMessage, setGenreMessage] = useState(null); // For genre modal messages
    const [showGenreModal, setShowGenreModal] = useState(false); // State to control modal visibility

    // Fetch genres from the backend when the component loads
    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/genres`);
            setGenres(response.data);
        } catch (error) {
            alert("Failed to load genres. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.author) newErrors.author = "Author is required";
        if (!formData.genreId) newErrors.genreId = "Please select a genre";
        if (!formData.publicationDate) newErrors.publicationDate = "Publication date is required";

        const isbnPattern = /^[0-9]{10,13}$/; // Allows 10-13 digit ISBNs
        if (!formData.isbn.match(isbnPattern)) newErrors.isbn = "ISBN must be 10-13 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await axios.post(`${REACT_APP_API_URL}/books`, formData);
            setMessage({ type: 'success', text: 'Book added successfully!' });
            onBookAdded(); // Refresh book list in the parent component
            setFormData({ title: '', author: '', genreId: '', publicationDate: '', isbn: '' });
            setErrors({});
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setMessage({ type: 'danger', text: 'ISBN already exists. Please enter a unique ISBN.' });
            } else {
                setMessage({ type: 'danger', text: 'Failed to add book. Please check input fields.' });
            }
        }
    };

    const handleAddGenre = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!newGenre) { // Validate that the genre name is not empty
            setGenreMessage({ type: 'danger', text: 'Genre name is required.' });
            return;
        }

        try {
            const response = await axios.post(`${REACT_APP_API_URL}/genres`, { name: newGenre });
            setGenreMessage({ type: 'success', text: 'Genre added successfully!' });
            setGenres([...genres, response.data]); // Add new genre to the dropdown
            setNewGenre(''); // Clear the input field
        } catch (error) {
            if (error.response && error.response.status === 500) { // Assuming 409 Conflict for duplicate genre
                setGenreMessage({ type: 'danger', text: 'Genre with this name already exists.' });
            } else {
                setGenreMessage({ type: 'danger', text: 'Failed to add genre. Please try again.' });
            }
        }
    };

    return (
        <>
            {/* Main Book Form */}
            <Form onSubmit={handleSubmit}>
                {message && <Alert variant={message.type}>{message.text}</Alert>}

                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        isInvalid={!!errors.author}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.author}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        as="select"
                        name="genreId"
                        value={formData.genreId}
                        onChange={handleChange}
                        isInvalid={!!errors.genreId}
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.genreId}
                    </Form.Control.Feedback>
                    <div class="right-align">
                        <Button variant="link" onClick={() => setShowGenreModal(true)} className="p-0 mt-2">
                            Add a new genre
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Publication Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="publicationDate"
                        value={formData.publicationDate}
                        onChange={handleChange}
                        isInvalid={!!errors.publicationDate}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.publicationDate}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        isInvalid={!!errors.isbn}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.isbn}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Add Book</Button>
            </Form>

            {/* Modal for Adding a New Genre */}
            <Modal show={showGenreModal} onHide={() => setShowGenreModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {genreMessage && <Alert variant={genreMessage.type}>{genreMessage.text}</Alert>}
                    <Form.Group>
                        <Form.Label>Genre Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e.target.value)}
                            placeholder="Enter new genre name"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowGenreModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddGenre}>
                        Add Genre
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddBookForm;
