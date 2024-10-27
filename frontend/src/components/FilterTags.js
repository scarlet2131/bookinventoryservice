import React from 'react';
import '../App.css';

const FilterTags = ({ filters, getGenreName, onRemove }) => (
    <div className="filter-tags-container">
        {Object.entries(filters)
            .filter(([, value]) => value) // Only display non-empty filters
            .map(([key, value]) => (
                <div className="filter-tag" key={key}>
                    {key === 'genreId'
                        ? `Genre: ${getGenreName(value)}`
                        : `${key}: ${value}`
                    }
                    <button className="close-button" onClick={() => onRemove(key)}>×</button>
                </div>
            ))}
    </div>
);

export default FilterTags;
