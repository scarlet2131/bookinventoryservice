// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';
//
// const REACT_APP_API_URL = "http://localhost:8080/api";
//
// const FilterModal = ({ onApply }) => {
//     const [filters, setFilters] = useState({
//         title: '', author: '', genreId: '', publicationDate: ''
//     });
//     const [genres, setGenres] = useState([]); // State to store genres for dropdown
//
//     // Fetch genres for the dropdown
//     useEffect(() => {
//         const fetchGenres = async () => {
//             try {
//                 const response = await axios.get(`${REACT_APP_API_URL}/genres`);
//                 setGenres(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch genres:", error);
//             }
//         };
//         fetchGenres();
//     }, []);
//
//     const handleChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value });
//     };
//
//     const handleApply = (e) => {
//         e.preventDefault();
//         onApply(filters); // Pass filters to parent component (App)
//     };
//
//     return (
//         <Form onSubmit={handleApply}>
//             <Form.Group>
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="title"
//                     value={filters.title}
//                     onChange={handleChange}
//                     placeholder="Filter by title"
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Author</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="author"
//                     value={filters.author}
//                     onChange={handleChange}
//                     placeholder="Filter by author"
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Genre</Form.Label>
//                 <Form.Control
//                     as="select"
//                     name="genreId"
//                     value={filters.genreId}
//                     onChange={handleChange}
//                 >
//                     <option value="">All Genres</option>
//                     {genres.map((genre) => (
//                         <option key={genre.id} value={genre.id}>
//                             {genre.name}
//                         </option>
//                     ))}
//                 </Form.Control>
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Publication Date</Form.Label>
//                 <Form.Control
//                     type="date"
//                     name="publicationDate"
//                     value={filters.publicationDate}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3">
//                 Apply Filters
//             </Button>
//         </Form>
//     );
// };
//
// export default FilterModal;


// FilterModal.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const REACT_APP_API_URL = "http://localhost:8080/api";

const FilterModal = ({ initialFilters, onApply }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        setFilters(initialFilters); // Reset to initial filters on modal open
    }, [initialFilters]);

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

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleApply = (e) => {
        e.preventDefault();
        onApply(filters);
    };

    return (
        <Form onSubmit={handleApply}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={filters.title || ''}
                    onChange={handleChange}
                    placeholder="Filter by title"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    name="author"
                    value={filters.author || ''}
                    onChange={handleChange}
                    placeholder="Filter by author"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control
                    as="select"
                    name="genreId"
                    value={filters.genreId || ''}
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
                    value={filters.publicationDate || ''}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Apply Filters</Button>
        </Form>
    );
};

export default FilterModal;
