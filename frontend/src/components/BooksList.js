// BooksList.js
import React from 'react';
import { Table } from 'react-bootstrap';
import ExportButton from './ExportButton';

const BooksList = ({ books, onExport }) => (
    <div>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Date</th>
                <th>ISBN</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genreName}</td>
                    <td>{book.publicationDate}</td>
                    <td>{book.isbn}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        <div className="text-right mt-3">
            <ExportButton onExport={onExport} /> {/* Using ExportButton */}
        </div>
    </div>
);

export default BooksList;
