// // ExportButton.js
// import React from 'react';
// import { Dropdown } from 'react-bootstrap';
//
// const ExportButton = ({ onExport }) => (
//     <Dropdown className="mt-3">
//         <Dropdown.Toggle variant="success">Export</Dropdown.Toggle>
//         <Dropdown.Menu>
//             <Dropdown.Item onClick={() => onExport('csv')}>CSV</Dropdown.Item>
//             <Dropdown.Item onClick={() => onExport('json')}>JSON</Dropdown.Item>
//         </Dropdown.Menu>
//     </Dropdown>
// );
//
// export default ExportButton;
// ExportButton.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaFileCsv, FaFileAlt } from 'react-icons/fa';

const ExportButton = ({ onExport }) => (
    <Dropdown className="mt-3">
        <Dropdown.Toggle variant="success">
            <i className="fas fa-file-export" style={{ marginRight: '0.5rem' }}></i> Export
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => onExport('csv')}>
                <FaFileCsv style={{ marginRight: '0.5rem' }} /> CSV
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onExport('json')}>
                <FaFileAlt style={{ marginRight: '0.5rem' }} /> JSON
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
);

export default ExportButton;
