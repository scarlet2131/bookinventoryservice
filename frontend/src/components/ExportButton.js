import React from 'react';
import axios from 'axios';
import { Button, Dropdown } from 'react-bootstrap';

const ExportButton = ({ filters }) => {
    const handleExport = async (format) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/export`, {
                params: { ...filters, format },
                headers: { 'Accept': 'text/csv' }
            });
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `books.${format}`;
            link.click();
        } catch (error) {
            alert('Failed to export data');
        }
    };

    return (
        <Dropdown className="mt-3">
            <Dropdown.Toggle variant="success">Export</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleExport('csv')}>CSV</Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport('json')}>JSON</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ExportButton;
