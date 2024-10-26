import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';

const BooksList = ({ books, onExport }) => (
    <div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre ID</th>
                <th>Publication Date</th>
                <th>ISBN</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genreId}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.isbn}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        <div className="text-right mt-3">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-export">
                    Export
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onExport('csv')}>CSV</Dropdown.Item>
                    <Dropdown.Item onClick={() => onExport('json')}>JSON</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
);

export default BooksList;
