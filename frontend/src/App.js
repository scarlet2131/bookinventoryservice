// // App.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BooksList from './components/BooksList';
// import AddBookForm from './components/AddBookForm';
// import FilterModal from './components/FilterModal';
// import FilterTags from './components/FilterTags';
// import { Container, Modal, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import ExportFactory from "./components/exportStrategies/ExportFactory";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './App.css';
//
// const REACT_APP_API_URL = "http://localhost:8080/api";
//
// const App = () => {
//     const [books, setBooks] = useState([]);
//     const [filters, setFilters] = useState({});
//     const [showAddBook, setShowAddBook] = useState(false);
//     const [genres, setGenres] = useState([]);
//     const [showFilterModal, setShowFilterModal] = useState(false);
//     const [searchText, setSearchText] = useState('');
//
//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10; // Number of items per page
//
//     // Fetch genres on initial load
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
//     // Fetch books based on filters
//     const fetchBooks = async (filterParams = {}) => {
//         const cleanedParams = Object.fromEntries(
//             Object.entries(filterParams).filter(([key, value]) => value !== '')
//         );
//         try {
//             const response = await axios.get(`${REACT_APP_API_URL}/books/filter`, { params: cleanedParams });
//             setBooks(response.data);
//         } catch (error) {
//             alert('Failed to fetch books');
//         }
//     };
//
//     const handleExport = async (format) => {
//         try {
//             const response = await axios.get(`${REACT_APP_API_URL}/books/filter`, {
//                 params: { ...filters },
//                 headers: { "Accept": "application/json" },
//             });
//             const exportStrategy = ExportFactory.getExportStrategy(format);
//             const exportedData = exportStrategy.generateExport(response.data);
//             const blob = new Blob([exportedData], { type: format === "csv" ? "text/csv" : "application/json" });
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", `books.${format}`);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (error) {
//             alert("Failed to export data.");
//         }
//     };
//
//     const applyFilters = (newFilters) => {
//         setFilters(newFilters);
//         fetchBooks(newFilters);
//         setShowFilterModal(false);
//     };
//
//     const getGenreName = (id) => {
//         const genre = genres.find((g) => g.id === parseInt(id));
//         return genre ? genre.name : "Unknown";
//     };
//
//     const removeFilter = (key) => {
//         const updatedFilters = { ...filters, [key]: '' };
//         setFilters(updatedFilters);
//         fetchBooks(updatedFilters);
//     };
//
//     const handleSearch = (e) => {
//         const updatedSearchText = e.target.value;
//         setSearchText(updatedSearchText);
//         const updatedFilters = { ...filters, title: updatedSearchText };
//         setFilters(updatedFilters);
//         fetchBooks(updatedFilters);
//     };
//
//     useEffect(() => {
//         fetchBooks();
//     }, []);
//
//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(books.length / itemsPerPage);
//
//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     };
//
//     return (
//         <div id="root">
//             <Header />
//             <div className="content">
//                 <Container className="mt-4">
//                     <Row className="justify-content-between align-items-center mb-4">
//                         <Col xs={12} md={6} className="d-flex align-items-center">
//                             <InputGroup>
//                                 <FormControl
//                                     type="text"
//                                     placeholder="Search by Title"
//                                     value={searchText}
//                                     onChange={handleSearch}
//                                 />
//                                 <InputGroup.Text>
//                                     <i className="fas fa-search"></i> {/* Search icon */}
//                                 </InputGroup.Text>
//                             </InputGroup>
//                             <Button variant="secondary" onClick={() => setShowFilterModal(true)} className="ml-2">
//                                 Filter
//                             </Button>
//                         </Col>
//
//                         <Col xs={12} md={3} className="text-right">
//                             <Button variant="info" onClick={() => setShowAddBook(true)} className="mr-2">
//                                 Add Book
//                             </Button>
//                         </Col>
//                     </Row>
//
//                     <FilterTags filters={filters} getGenreName={getGenreName} onRemove={removeFilter} />
//
//                     <BooksList books={currentBooks} onExport={handleExport} /> {/* Pass only current page books */}
//
//                     {/* Pagination Controls */}
//                     <Row className="justify-content-center mt-3">
//                         <Col xs="auto">
//                             <Button
//                                 variant="secondary"
//                                 disabled={currentPage === 1}
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                             >
//                                 Previous
//                             </Button>
//                         </Col>
//                         <Col xs="auto" className="text-center">
//                             <span>Page {currentPage} of {totalPages}</span>
//                         </Col>
//                         <Col xs="auto">
//                             <Button
//                                 variant="secondary"
//                                 disabled={currentPage === totalPages}
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                             >
//                                 Next
//                             </Button>
//                         </Col>
//                     </Row>
//                 </Container>
//
//                 <Modal show={showAddBook} onHide={() => setShowAddBook(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             <i className="fas fa-book" style={{ marginRight: '0.5rem' }}></i>
//                             Add a New Book
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <AddBookForm onBookAdded={() => fetchBooks(filters)} />
//                     </Modal.Body>
//                 </Modal>
//
//                 <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Filter Books</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <FilterModal initialFilters={filters} onApply={applyFilters} />
//                     </Modal.Body>
//                 </Modal>
//             </div>
//             <Footer />
//         </div>
//     );
// };
//
// export default App;


// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksList from './components/BooksList';
import AddBookForm from './components/AddBookForm';
import FilterModal from './components/FilterModal';
import FilterTags from './components/FilterTags';
import { Container, Modal, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ExportFactory from "./components/exportStrategies/ExportFactory";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const REACT_APP_API_URL = "http://localhost:8080/api";

const App = () => {
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({});
    const [showAddBook, setShowAddBook] = useState(false);
    const [genres, setGenres] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const fetchBooks = async (filterParams = {}) => {
        const cleanedParams = Object.fromEntries(
            Object.entries(filterParams).filter(([key, value]) => value !== '')
        );
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/books/filter`, { params: cleanedParams });
            setBooks(response.data);
        } catch (error) {
            alert('Failed to fetch books');
        }
    };

    const handleExport = async (format) => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/books/filter`, {
                params: { ...filters },
                headers: { "Accept": "application/json" },
            });
            const exportStrategy = ExportFactory.getExportStrategy(format);
            const exportedData = exportStrategy.generateExport(response.data);
            const blob = new Blob([exportedData], { type: format === "csv" ? "text/csv" : "application/json" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `books.${format}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert("Failed to export data.");
        }
    };

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        fetchBooks(newFilters);
        setShowFilterModal(false);
    };

    const getGenreName = (id) => {
        const genre = genres.find((g) => g.id === parseInt(id));
        return genre ? genre.name : "Unknown";
    };

    const removeFilter = (key) => {
        const updatedFilters = { ...filters, [key]: '' };
        setFilters(updatedFilters);
        fetchBooks(updatedFilters);
        if (key==='title'){
            setSearchText('');
        }


    };

    // const handleSearch = (e) => {
    //     const updatedSearchText = e.target.value;
    //     setSearchText(updatedSearchText);
    //     const updatedFilters = { ...filters, title: updatedSearchText };
    //     setFilters(updatedFilters);
    //     fetchBooks(updatedFilters);
    // };



    const handleSearch = (e) => {
        const updatedSearchText = e.target.value;
        setSearchText(updatedSearchText);
        const updatedFilters = { ...filters, title: updatedSearchText };
        setFilters(updatedFilters);
        setCurrentPage(1); // Reset to the first page on search
        fetchBooks(updatedFilters);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(books.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div id="root">
            <Header />
            <div className="content">
                <Container className="mt-4">
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col xs={12} md={6} className="d-flex align-items-center">
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="Search by Title"
                                    value={searchText}
                                    onChange={handleSearch}
                                />
                                <Button variant="secondary" onClick={() => setShowFilterModal(true)}>
                                    <i className="fas fa-filter"></i> Filter
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col xs={12} md={3} className="text-right">
                            <Button variant="info" onClick={() => setShowAddBook(true)} className="mr-2">
                                <i className="fas fa-plus"></i> Add Book
                            </Button>
                        </Col>
                    </Row>

                    <FilterTags filters={filters} getGenreName={getGenreName} onRemove={removeFilter} />
                    <BooksList books={currentBooks} onExport={handleExport} />

                    <Row className="justify-content-center mt-3">
                        <Col xs="auto">
                            <Button
                                variant="secondary"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col xs="auto" className="text-center">
                            <span>Page {currentPage} of {totalPages}</span>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="secondary"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Modal show={showAddBook} onHide={() => setShowAddBook(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i className="fas fa-book" style={{ marginRight: '0.5rem' }}></i>
                            Add a New Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddBookForm onBookAdded={() => fetchBooks(filters)} />
                    </Modal.Body>
                </Modal>

                <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Books</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FilterModal initialFilters={filters} onApply={applyFilters} />
                    </Modal.Body>
                </Modal>
            </div>
            <Footer />
        </div>
    );
};

export default App;
